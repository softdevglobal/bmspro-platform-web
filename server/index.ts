import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const PORT = Number(process.env.API_PORT || process.env.PORT || 3001);
const ZEPTOMAIL_URL =
  process.env.ZEPTOMAIL_URL || "https://api.zeptomail.com.au/v1.1/email";
const ZEPTOMAIL_TOKEN = process.env.ZEPTOMAIL_TOKEN || "";
const FROM_ADDRESS = process.env.ZEPTOMAIL_FROM_ADDRESS || "info@bmspros.com.au";
const FROM_NAME = process.env.ZEPTOMAIL_FROM_NAME || "BMS Pro";
const CONTACT_TO = process.env.CONTACT_TO_EMAIL || "info@bmspros.com.au";

type ContactBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  product?: string;
  message?: string;
  subject?: string;
};

function authorizationHeader(token: string) {
  const trimmed = token.trim();
  if (!trimmed) return "";
  return trimmed.toLowerCase().startsWith("zoho-enczapikey ")
    ? trimmed
    : `Zoho-enczapikey ${trimmed}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function json(res: http.ServerResponse, status: number, body: unknown) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

function readJsonBody(req: http.IncomingMessage): Promise<ContactBody> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolve(raw ? (JSON.parse(raw) as ContactBody) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

async function sendZeptoMail(options: {
  toEmail: string;
  toName?: string;
  replyToEmail?: string;
  replyToName?: string;
  subject: string;
  htmlbody: string;
}) {
  if (!ZEPTOMAIL_TOKEN.trim()) {
    const err = new Error(
      "Email is not configured yet. Add ZEPTOMAIL_TOKEN to your .env file."
    ) as Error & { statusCode?: number };
    err.statusCode = 503;
    throw err;
  }

  const payload: Record<string, unknown> = {
    from: { address: FROM_ADDRESS, name: FROM_NAME },
    to: [
      {
        email_address: {
          address: options.toEmail,
          name: options.toName || options.toEmail,
        },
      },
    ],
    subject: options.subject,
    htmlbody: options.htmlbody,
  };

  if (options.replyToEmail) {
    payload.reply_to = [
      {
        address: options.replyToEmail,
        name: options.replyToName || options.replyToEmail,
      },
    ];
  }

  const response = await fetch(ZEPTOMAIL_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: authorizationHeader(ZEPTOMAIL_TOKEN),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ZeptoMail error ${response.status}: ${errorText}`);
  }

  return response.json().catch(() => ({}));
}

function contentTypeFor(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".js":
      return "text/javascript; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".svg":
      return "image/svg+xml";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".ico":
      return "image/x-icon";
    case ".woff":
      return "font/woff";
    case ".woff2":
      return "font/woff2";
    default:
      return "application/octet-stream";
  }
}

function serveStatic(req: http.IncomingMessage, res: http.ServerResponse) {
  if (!fs.existsSync(distDir)) {
    json(res, 404, { error: "Frontend build not found. Run npm run build." });
    return;
  }

  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(distDir, safePath);

  if (!filePath.startsWith(distDir)) {
    json(res, 403, { error: "Forbidden" });
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(distDir, "index.html");
  }

  const data = fs.readFileSync(filePath);
  res.writeHead(200, { "Content-Type": contentTypeFor(filePath) });
  res.end(data);
}

async function handleContact(req: http.IncomingMessage, res: http.ServerResponse) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  if (req.method !== "POST") {
    json(res, 405, { error: "Method not allowed" });
    return;
  }

  try {
    const body = await readJsonBody(req);
    const firstName = (body.firstName || "").trim();
    const lastName = (body.lastName || "").trim();
    const email = (body.email || "").trim();
    const company = (body.company || "").trim();
    const product = (body.product || "").trim();
    const message = (body.message || "").trim();
    const subject =
      (body.subject || "").trim() || "Contact from BMS Pro website";

    if (!firstName || !lastName || !email || !company) {
      json(res, 400, { error: "Missing required fields" });
      return;
    }

    const fullName = `${firstName} ${lastName}`;
    const adminHtml = `
      <h2>New website enquiry</h2>
      <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(fullName)}</td></tr>
        <tr><td><strong>Email</strong></td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td><strong>Company</strong></td><td>${escapeHtml(company)}</td></tr>
        ${product ? `<tr><td><strong>Product</strong></td><td>${escapeHtml(product)}</td></tr>` : ""}
        <tr><td><strong>Message</strong></td><td>${escapeHtml(message || "(No message)")}</td></tr>
      </table>
    `;

    await sendZeptoMail({
      toEmail: CONTACT_TO,
      toName: "BMS Pro",
      replyToEmail: email,
      replyToName: fullName,
      subject,
      htmlbody: adminHtml,
    });

    try {
      await sendZeptoMail({
        toEmail: email,
        toName: fullName,
        replyToEmail: CONTACT_TO,
        replyToName: "BMS Pro",
        subject: "We received your message — BMS Pro",
        htmlbody: `
          <p>Hi ${escapeHtml(firstName)},</p>
          <p>Thanks for contacting BMS Pro. We’ve received your message and will get back within 24 hours.</p>
          <p>If you need anything sooner, reply to this email or write to
            <a href="mailto:${escapeHtml(CONTACT_TO)}">${escapeHtml(CONTACT_TO)}</a>.
          </p>
          <p>— ${escapeHtml(FROM_NAME)}</p>
        `,
      });
    } catch (confirmError) {
      console.warn("Confirmation email failed:", confirmError);
    }

    json(res, 200, { success: true, message: "Emails sent successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    const statusCode =
      error instanceof Error && "statusCode" in error && typeof error.statusCode === "number"
        ? error.statusCode
        : 500;
    json(res, statusCode, {
      error: error instanceof Error ? error.message : "Failed to send email",
    });
  }
}

const server = http.createServer(async (req, res) => {
  const url = req.url || "/";

  if (url.startsWith("/api/contact")) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    await handleContact(req, res);
    return;
  }

  if (url.startsWith("/api/")) {
    json(res, 404, { error: "Not found" });
    return;
  }

  // In production (`npm start`), serve the Vite build.
  if (process.env.NODE_ENV === "production") {
    serveStatic(req, res);
    return;
  }

  json(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
  if (!ZEPTOMAIL_TOKEN) {
    console.warn("Warning: ZEPTOMAIL_TOKEN is empty — contact form will fail until set.");
  }
});
