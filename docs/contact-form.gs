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
 */

var TO = "sudabeh.a.zolfikhorram@gmail.com";
var MIN_LENGTH = 10;
var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var message = String(data.message || "").trim().slice(0, 5000);
    var contact = String(data.contact || "").trim().slice(0, 200);
    var page = String(data.page || "").slice(0, 300);
    if (message.length < MIN_LENGTH || !contact) {
      return reply({ ok: false, error: "invalid" });
    }

    var body =
      "New message from your portfolio\n\n" +
      message +
      "\n\n— Reach them at: " + contact +
      "\nSent from: " + page;
    var options = { name: "Portfolio contact" };
    // An email contact becomes the reply-to, so hitting Reply answers the visitor.
    if (EMAIL.test(contact)) {
      options.replyTo = contact;
    }
    MailApp.sendEmail(TO, "Portfolio message from " + contact, body, options);

    // The email is the source of truth; a Telegram hiccup must not fail the send.
    try {
      notifyTelegram(message, contact);
    } catch (err) {
      console.error("Telegram notification failed: " + err);
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: "server" });
  }
}

function notifyTelegram(message, contact) {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty("TELEGRAM_TOKEN");
  var chatId = props.getProperty("TELEGRAM_CHAT_ID");
  if (!token || !chatId) {
    return;
  }
  var text =
    "📬 <b>New message from your portfolio</b>\n\n" +
    escapeHtml(message) +
    "\n\n<b>Reach them at:</b> " + contactLink(contact);
  sendTelegram(token, chatId, text);
}

/** Run once from the editor after pressing Start in your bot. */
function connectTelegram() {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty("TELEGRAM_TOKEN");
  if (!token) {
    throw new Error("Add TELEGRAM_TOKEN in Project Settings → Script Properties first.");
  }
  var res = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/getUpdates", { muteHttpExceptions: true });
  var updates = JSON.parse(res.getContentText()).result || [];
  var chat = null;
  for (var i = updates.length - 1; i >= 0 && !chat; i--) {
    var msg = updates[i].message || updates[i].edited_message;
    if (msg && msg.chat && msg.chat.type === "private") {
      chat = msg.chat;
    }
  }
  if (!chat) {
    throw new Error("No chat found. Open your bot in Telegram, press Start (or send it any message), then run this again.");
  }
  props.setProperty("TELEGRAM_CHAT_ID", String(chat.id));
  sendTelegram(token, chat.id, "✅ Connected. Messages from your portfolio will arrive here.");
  console.log("Connected to @" + (chat.username || chat.first_name) + " (chat " + chat.id + ")");
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
