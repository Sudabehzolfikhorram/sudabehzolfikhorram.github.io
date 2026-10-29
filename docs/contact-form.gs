/**
 * Contact form backend for the portfolio, run as a Google Apps Script web app.
 * Emails every message sent from the site's "Write me a message" popover.
 *
 * Setup (once, signed in to the Gmail account that should receive messages):
 *  1. Open https://script.google.com and create a New project.
 *  2. Replace the editor's contents with this file and press Save.
 *  3. Deploy → New deployment → type "Web app".
 *     Execute as: Me. Who has access: Anyone. → Deploy, then Authorize access.
 *  4. Copy the Web app URL (ends in /exec) into `contactEndpoint`
 *     in src/lib/content.ts.
 */

var TO = "sudabeh.a.zolfikhorram@gmail.com";
var MIN_LENGTH = 10;
var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var message = String(data.message || "").trim().slice(0, 5000);
    var contact = String(data.contact || "").trim().slice(0, 200);
    if (message.length < MIN_LENGTH || !contact) {
      return reply({ ok: false, error: "invalid" });
    }

    var body =
      "New message from your portfolio\n\n" +
      message +
      "\n\n— Reach them at: " + contact +
      "\nSent from: " + String(data.page || "").slice(0, 300);
    var options = { name: "Portfolio contact" };
    // An email contact becomes the reply-to, so hitting Reply answers the visitor.
    if (EMAIL.test(contact)) {
      options.replyTo = contact;
    }
    MailApp.sendEmail(TO, "Portfolio message from " + contact, body, options);
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: "server" });
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
