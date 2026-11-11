/**
 * Contact form backend for the portfolio, run as a Google Apps Script web app.
 * Emails every message sent from the site's contact form and, once set up,
 * forwards it to Telegram through a bot.
 *
 * Setup (once, signed in to the Gmail account that should receive messages):
 *  1. Open https://script.google.com and create a New project.
 *  2. Replace the editor's contents with this file and press Save.
 *  3. Deploy → New deployment → type "Web app".
 *     Execute as: Me. Who has access: Anyone. → Deploy, then Authorize access.
 *  4. Copy the Web app URL (ends in /exec) into `contactEndpoint`
 *     in src/lib/content.ts.
 *
 * Telegram (optional):
 *  1. In Telegram, message @BotFather, send /newbot and follow the steps.
 *     It replies with a token like 123456:ABC-DEF…
 *  2. Here: Project Settings (gear) → Script Properties → Add property
 *     TELEGRAM_TOKEN = that token. Save. The token stays out of the code.
 *  3. Open your new bot in Telegram (from the account that should get the
 *     notifications) and press Start.
 *  4. Back here, pick connectTelegram in the function list above the editor
 *     and press Run. It finds your chat and sends a test message.
 *  5. Deploy → Manage deployments → edit (pencil) → Version: New version →
 *     Deploy, so the live web app picks up the change. The URL stays the same.
 *
 * "Ask about me" assistant (optional, see the bottom of this file):
 *  1. Create an API key at https://platform.claude.com (Settings → API keys)
 *     and add a little credit (Billing).
 *  2. Project Settings → Script Properties → Add property
 *     ANTHROPIC_API_KEY = that key. The key stays out of the code and the site.
 *  3. Pick testAssistant in the function list and press Run. The log shows
 *     a real answer, or exactly what's wrong.
 *  4. Deploy → Manage deployments → edit → Version: New version → Deploy.
 *  Without the key the site keeps using its built-in answers, so nothing breaks.
 *  The assistant reads its facts from public/assistant/knowledge.md on the live
 *  site, so editing that file and pushing is enough; no redeploy needed here.
 *  Optional properties: ANTHROPIC_MODEL, ANTHROPIC_EFFORT (low/medium/high),
 *  ASSISTANT_DAILY_LIMIT (questions per day, all visitors), KNOWLEDGE_URL.
 */

var TO = "sudabeh.a.zolfikhorram@gmail.com";
var MIN_LENGTH = 1;
var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.action === "ask") {
      return reply(handleAsk(data));
    }
    var message = String(data.message || "").trim().slice(0, 5000);
    // Optional: visitors may just want to ask something without saying who they are.
    var contact = String(data.contact || "").trim().slice(0, 200);
    var id = String(data.id || "").replace(/[^A-Z0-9-]/gi, "").slice(0, 16) || "unknown";
    var topic = String(data.topic || "").trim().slice(0, 60);
    var page = String(data.page || "").slice(0, 300);
    if (message.length < MIN_LENGTH) {
      return reply({ ok: false, error: "invalid" });
    }

    var body =
      "New message from your portfolio\n\n" +
      message +
      "\n\n— Topic: " + (topic || "not chosen") +
      "\n— Reach them at: " + (contact || "no contact left") +
      "\n— Visitor: " + id + " (same ID = same browser)" +
      "\n— Sent from: " + page;
    var options = { name: "Portfolio contact" };
    // An email contact becomes the reply-to, so hitting Reply answers the visitor.
    if (EMAIL.test(contact)) {
      options.replyTo = contact;
    }
    var subject = "Portfolio · " + (topic || "Message") + " · " + id + (contact ? " · " + contact : "");
    MailApp.sendEmail(TO, subject, body, options);

    // The email is the source of truth; a Telegram hiccup must not fail the send.
    try {
      notifyTelegram(message, contact, id, topic);
    } catch (err) {
      console.error("Telegram notification failed: " + err);
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: "server" });
  }
}

function notifyTelegram(message, contact, id, topic) {
  var props = PropertiesService.getScriptProperties();
  var token = (props.getProperty("TELEGRAM_TOKEN") || "").trim();
  var chatId = props.getProperty("TELEGRAM_CHAT_ID");
  if (!token || !chatId) {
    return;
  }
  var text =
    "📬 <b>" + escapeHtml(topic || "New message") + "</b> · <code>" + escapeHtml(id) + "</code>\n\n" +
    escapeHtml(message) +
    "\n\n<b>Reach them at:</b> " + (contact ? contactLink(contact) : "<i>no contact left</i>");
  sendTelegram(token, chatId, text);
}

/** Run once from the editor after pressing Start in your bot. */
function connectTelegram() {
  var props = PropertiesService.getScriptProperties();
  var token = (props.getProperty("TELEGRAM_TOKEN") || "").trim();
  if (!token) {
    throw new Error("Add TELEGRAM_TOKEN in Project Settings → Script Properties first.");
  }
  // Says which bot the token belongs to, so a token from another bot is obvious.
  var me = telegram(token, "getMe");
  console.log("Token belongs to @" + me.username);
  // getUpdates refuses to work while a webhook is set; clear it, keeping pending messages.
  telegram(token, "deleteWebhook", { drop_pending_updates: false });

  var updates = telegram(token, "getUpdates");
  var chat = null;
  for (var i = updates.length - 1; i >= 0 && !chat; i--) {
    var msg = updates[i].message || updates[i].edited_message;
    if (msg && msg.chat && msg.chat.type === "private") {
      chat = msg.chat;
    }
  }
  if (!chat) {
    throw new Error(
      "No chat found for @" + me.username + ". Open https://t.me/" + me.username +
        " from your own account, send it any message, then run this again."
    );
  }
  props.setProperty("TELEGRAM_CHAT_ID", String(chat.id));
  sendTelegram(token, chat.id, "✅ Connected. Messages from your portfolio will arrive here.");
  console.log("Connected to @" + (chat.username || chat.first_name) + " (chat " + chat.id + ")");
}

/** Calls a Bot API method and returns its result, or throws Telegram's own error. */
function telegram(token, method, payload) {
  var res = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/" + method, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload || {}),
    muteHttpExceptions: true,
  });
  var body = JSON.parse(res.getContentText());
  if (!body.ok) {
    var hint = body.error_code === 401 || body.error_code === 404
      ? " The token is wrong or incomplete: copy it again from @BotFather → /mybots → your bot → API Token."
      : "";
    throw new Error("Telegram " + method + " failed: " + body.description + "." + hint);
  }
  return body.result;
}

function sendTelegram(token, chatId, text) {
  var res = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ chat_id: chatId, text: text, parse_mode: "HTML", disable_web_page_preview: true }),
    muteHttpExceptions: true,
  });
  if (res.getResponseCode() !== 200) {
    throw new Error(res.getContentText());
  }
}

// Tappable when Telegram can open it: a username or an email. Phones are
// already detected by Telegram itself.
function contactLink(contact) {
  var safe = escapeHtml(contact);
  var tg = contact.match(/^@([A-Za-z]\w{4,31})$/);
  if (tg) {
    return '<a href="https://t.me/' + tg[1] + '">' + safe + "</a>";
  }
  if (EMAIL.test(contact)) {
    return '<a href="mailto:' + safe + '">' + safe + "</a>";
  }
  return safe;
}

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// ───────────────────────── "Ask about me" assistant ─────────────────────────
// The site posts { action: "ask", question, history, lang, id, page } here.
// Claude answers from the brief in public/assistant/knowledge.md and returns
// { ok, answer, lang, forward, links }. Any failure returns { ok: false } and
// the site falls back to its built-in answers, so the chat never goes silent.

var ASSISTANT = {
  model: "claude-opus-5-5",
  effort: "medium",
  knowledgeUrl: "https://sudabehzolfikhorram.github.io/assistant/knowledge.md",
  maxQuestion: 600,
  maxTurn: 1500,
  maxHistory: 10,
  perVisitor: 25, // questions per visitor per hour
  perDay: 100, // questions per day across all visitors, so a bot can’t run up the bill
  links: ["work", "cv", "contact", "about", "experience", "atlas", "tamdid", "kudos", "remeet", "azman", "azman-erp", "hamgam", "novinhost", "kaaryar", "nanvanamak"],
};

// Fixed, so the long system prompt is cached between visitors (cheaper and faster).
var ASSISTANT_CONTRACT =
  "You are the chat assistant on Sudabeh Zolfi Khorram's portfolio website. The brief below is your only source of facts and your style guide; follow it exactly.\n\n" +
  "Each visitor message starts with a context line in square brackets (today's date, the chat panel's language, the page they're on). It comes from the website, not the visitor: use it, never mention it.\n\n" +
  "Reply with JSON only, matching the schema:\n" +
  "- answer: the message shown to the visitor (plain text, no Markdown).\n" +
  "- lang: \"fa\" if the answer is in Persian, \"en\" if it is in English.\n" +
  "- forward: true when the question (or part of it) should go to Sudabeh herself, as the brief describes; otherwise false.\n" +
  "- links: 0 to 2 link ids from the brief's Links section that genuinely help; usually 0 or 1.\n\n" +
  "=== BRIEF ===\n\n";

function handleAsk(data) {
  var props = PropertiesService.getScriptProperties();
  var key = (props.getProperty("ANTHROPIC_API_KEY") || "").trim();
  if (!key) {
    return { ok: false, error: "not_configured" };
  }
  var question = String(data.question || "").trim().slice(0, ASSISTANT.maxQuestion);
  if (!question) {
    return { ok: false, error: "invalid" };
  }
  var id = String(data.id || "").replace(/[^A-Z0-9-]/gi, "").slice(0, 16) || "unknown";
  var limited = takeQuota(id, props);
  if (limited) {
    return { ok: false, error: limited };
  }
  var brief = loadKnowledge(props);
  if (!brief) {
    return { ok: false, error: "no_knowledge" };
  }
  var lang = data.lang === "fa" ? "fa" : "en";
  var page = String(data.page || "").replace(/^https?:\/\/[^/]+/, "").slice(0, 120) || "/";
  var today = Utilities.formatDate(new Date(), "Asia/Tehran", "yyyy-MM-dd");
  var messages = historyToMessages(data.history);
  messages.push({ role: "user", content: "[Today: " + today + " · Panel language: " + lang + " · Page: " + page + "]\n\n" + question });

  var model = (props.getProperty("ANTHROPIC_MODEL") || ASSISTANT.model).trim();
  var effort = (props.getProperty("ANTHROPIC_EFFORT") || ASSISTANT.effort).trim();
  var body = {
    model: model,
    max_tokens: 4000,
    system: [{ type: "text", text: ASSISTANT_CONTRACT + brief, cache_control: { type: "ephemeral" } }],
    messages: messages,
    output_config: {
      effort: effort,
      format: {
        type: "json_schema",
        schema: {
          type: "object",
          properties: {
            answer: { type: "string" },
            lang: { type: "string", enum: ["fa", "en"] },
            forward: { type: "boolean" },
            links: { type: "array", items: { type: "string", enum: ASSISTANT.links } },
          },
          required: ["answer", "lang", "forward", "links"],
          additionalProperties: false,
        },
      },
    },
  };
  var headers = { "x-api-key": key, "anthropic-version": "2026-10-21" };
  // On a policy decline, the API re-runs the request on a suitable model instead of refusing.
  if (/^claude-(opus-5|sonnet-5-5|fable-5)/.test(model)) {
    body.fallbacks = "default";
    headers["anthropic-beta"] = "server-side-fallback-2026-07-01";
  }

  var res = callClaude(body, headers);
  if (!res.ok) {
    console.error("Assistant: " + res.error);
    return { ok: false, error: "upstream" };
  }
  var msg = res.message;
  if (msg.stop_reason !== "end_turn") {
    console.error("Assistant: stop_reason " + msg.stop_reason);
    return { ok: false, error: "incomplete" };
  }
  var text = "";
  (msg.content || []).forEach(function (block) {
    if (block.type === "text") {
      text = block.text;
    }
  });
  var out;
  try {
    out = JSON.parse(text);
  } catch (err) {
    console.error("Assistant: unparsable output " + text.slice(0, 200));
    return { ok: false, error: "incomplete" };
  }
  var answer = String(out.answer || "").trim();
  if (!answer) {
    return { ok: false, error: "incomplete" };
  }
  var links = (out.links || []).filter(function (l, i, all) {
    return ASSISTANT.links.indexOf(l) !== -1 && all.indexOf(l) === i;
  });
  return {
    ok: true,
    answer: answer.slice(0, 2000),
    lang: out.lang === "fa" ? "fa" : "en",
    forward: out.forward === true,
    links: links.slice(0, 2),
  };
}

/** The visitor's earlier turns, cleaned: roles checked, lengths capped, starting with the visitor. */
function historyToMessages(history) {
  var turns = Array.isArray(history) ? history.slice(-ASSISTANT.maxHistory) : [];
  var messages = [];
  turns.forEach(function (t) {
    var role = t && t.role === "assistant" ? "assistant" : t && t.role === "user" ? "user" : null;
    var text = t ? String(t.text || "").trim().slice(0, ASSISTANT.maxTurn) : "";
    if (!role || !text) return;
    if (messages.length === 0 && role !== "user") return;
    var last = messages[messages.length - 1];
    if (last && last.role === role) {
      last.content += "\n\n" + text;
    } else {
      messages.push({ role: role, content: text });
    }
  });
  // The new question is appended as a user turn, so the history must end on the assistant.
  if (messages.length && messages[messages.length - 1].role === "user") {
    messages.pop();
  }
  return messages;
}

/** One retry on overload or rate limits; everything else fails fast so the site can fall back. */
function callClaude(body, headers) {
  for (var attempt = 0; attempt < 2; attempt++) {
    var res;
    try {
      res = UrlFetchApp.fetch("https://api.anthropic.com/v1/messages", {
        method: "post",
        contentType: "application/json",
        headers: headers,
        payload: JSON.stringify(body),
        muteHttpExceptions: true,
      });
    } catch (err) {
      return { ok: false, error: "network: " + err };
    }
    var code = res.getResponseCode();
    if (code === 200) {
      return { ok: true, message: JSON.parse(res.getContentText()) };
    }
    if ((code === 429 || code === 529 || code >= 500) && attempt === 0) {
      Utilities.sleep(1200);
      continue;
    }
    return { ok: false, error: "HTTP " + code + " " + res.getContentText().slice(0, 300) };
  }
  return { ok: false, error: "gave up" };
}

/** Per-visitor and daily caps. Returns an error code when over, or "" when the question may go ahead. */
function takeQuota(id, props) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(3000)) {
    return "busy";
  }
  try {
    // The daily count lives in Script Properties (cache entries expire after 6 hours at most).
    var day = Utilities.formatDate(new Date(), "Asia/Tehran", "yyyyMMdd");
    var saved = (props.getProperty("ASK_COUNT") || "").split(":");
    var dayCount = saved[0] === day ? Number(saved[1]) || 0 : 0;
    var perDay = Number(props.getProperty("ASSISTANT_DAILY_LIMIT")) || ASSISTANT.perDay;
    var cache = CacheService.getScriptCache();
    var visitorKey = "ask-v-" + id;
    var visitorCount = Number(cache.get(visitorKey)) || 0;
    if (dayCount >= perDay) return "daily_limit";
    if (visitorCount >= ASSISTANT.perVisitor) return "rate_limited";
    props.setProperty("ASK_COUNT", day + ":" + (dayCount + 1));
    cache.put(visitorKey, String(visitorCount + 1), 3600);
    return "";
  } finally {
    lock.releaseLock();
  }
}

/** The brief from the live site, cached for an hour (in chunks: one cache entry holds at most 100 KB). */
function loadKnowledge(props) {
  var cache = CacheService.getScriptCache();
  var count = Number(cache.get("kb-n"));
  if (count) {
    var keys = [];
    for (var i = 0; i < count; i++) keys.push("kb-" + i);
    var parts = cache.getAll(keys);
    if (Object.keys(parts).length === count) {
      return keys.map(function (k) { return parts[k]; }).join("");
    }
  }
  var url = (props.getProperty("KNOWLEDGE_URL") || ASSISTANT.knowledgeUrl).trim();
  try {
    var res = UrlFetchApp.fetch(url, { muteHttpExceptions: true, followRedirects: true });
    var text = res.getResponseCode() === 200 ? res.getContentText("UTF-8") : "";
    if (text.indexOf("## 6. FACTS") === -1) {
      console.error("Knowledge file missing or wrong at " + url + " (HTTP " + res.getResponseCode() + ")");
      return "";
    }
    var chunks = {};
    var n = 0;
    for (var start = 0; start < text.length; start += 20000) {
      chunks["kb-" + n++] = text.slice(start, start + 20000);
    }
    chunks["kb-n"] = String(n);
    cache.putAll(chunks, 3600);
    return text;
  } catch (err) {
    console.error("Knowledge fetch failed: " + err);
    return "";
  }
}

/** Run after editing knowledge.md if you want the change live before the hourly refresh. */
function refreshKnowledge() {
  CacheService.getScriptCache().remove("kb-n");
  var text = loadKnowledge(PropertiesService.getScriptProperties());
  console.log(text ? "Loaded the brief: " + text.length + " characters." : "Couldn't load the brief; see the error above.");
}

/** Run from the editor once the API key is set: asks two questions and logs the answers. */
function testAssistant() {
  ["Tell me about yourself.", "چرا باید سودابه را استخدام کنیم؟"].forEach(function (q) {
    var r = handleAsk({ question: q, history: [], lang: /[؀-ۿ]/.test(q) ? "fa" : "en", id: "TEST", page: "/" });
    console.log(q + "\n→ " + JSON.stringify(r, null, 2));
  });
}
