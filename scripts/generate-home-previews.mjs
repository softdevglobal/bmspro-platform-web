import sharp from "sharp";
import fs from "fs";

function dashboardSvg({ title, accent, rows, badge }) {
  const rowH = 52;
  const startY = 118;
  const rowXml = rows
    .map((r, i) => {
      const y = startY + i * rowH;
      return `
      <rect x="24" y="${y}" width="752" height="${rowH - 8}" rx="10" fill="#fff" stroke="#E5E7EB"/>
      <circle cx="52" cy="${y + 22}" r="10" fill="${accent}" opacity="0.15"/>
      <circle cx="52" cy="${y + 22}" r="5" fill="${accent}"/>
      <text x="74" y="${y + 18}" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#111827">${r.name}</text>
      <text x="74" y="${y + 36}" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#6B7280">${r.meta}</text>
      <rect x="620" y="${y + 12}" width="136" height="24" rx="12" fill="${r.pillBg}"/>
      <text x="688" y="${y + 28}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="${r.pillFg}">${r.status}</text>
    `;
    })
    .join("");

  return `<svg width="800" height="520" viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#F8FAFC"/>
        <stop offset="100%" stop-color="#EEF2F7"/>
      </linearGradient>
    </defs>
    <rect width="800" height="520" rx="18" fill="url(#bg)"/>
    <rect x="0" y="0" width="800" height="52" fill="#111827"/>
    <circle cx="22" cy="26" r="5" fill="#EF4444"/>
    <circle cx="40" cy="26" r="5" fill="#F59E0B"/>
    <circle cx="58" cy="26" r="5" fill="#22C55E"/>
    <text x="400" y="32" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#D1D5DB">bmspros.com.au - ${title}</text>
    <rect x="24" y="72" width="752" height="36" rx="10" fill="#fff" stroke="#E5E7EB"/>
    <text x="40" y="95" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" fill="#111827">${title}</text>
    <rect x="640" y="80" width="120" height="20" rx="10" fill="${accent}"/>
    <text x="700" y="94" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#fff">${badge}</text>
    ${rowXml}
    <rect x="24" y="440" width="240" height="56" rx="12" fill="#fff" stroke="#E5E7EB"/>
    <text x="40" y="464" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#6B7280">Today</text>
    <text x="40" y="484" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#111827">12 bookings</text>
    <rect x="280" y="440" width="240" height="56" rx="12" fill="#fff" stroke="#E5E7EB"/>
    <text x="296" y="464" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#6B7280">Staff on</text>
    <text x="296" y="484" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#111827">5 assigned</text>
    <rect x="536" y="440" width="240" height="56" rx="12" fill="#fff" stroke="#E5E7EB"/>
    <text x="552" y="464" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#6B7280">Updates sent</text>
    <text x="552" y="484" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#111827">9 reminders</text>
  </svg>`;
}

const configs = [
  {
    out: "public/home/preview-workshop.webp",
    title: "Workshop calendar",
    accent: "#1F2937",
    badge: "Workshop",
    rows: [
      {
        name: "Logbook service - Toyota Camry",
        meta: "Bay 2 · 8:00 AM · Confirmed",
        status: "In bay",
        pillBg: "#ECFDF5",
        pillFg: "#047857",
      },
      {
        name: "Brake inspection - Mazda 3",
        meta: "Bay 1 · 9:30 AM · Awaiting drop-off",
        status: "Booked",
        pillBg: "#EFF6FF",
        pillFg: "#1D4ED8",
      },
      {
        name: "Wheel alignment - Ford Ranger",
        meta: "Bay 3 · 11:00 AM · Reminder sent",
        status: "Ready",
        pillBg: "#F3F4F6",
        pillFg: "#374151",
      },
      {
        name: "Service update - Holden Commodore",
        meta: "Customer notified · Ready for pickup",
        status: "Complete",
        pillBg: "#ECFDF5",
        pillFg: "#047857",
      },
      {
        name: "Online booking request - Hyundai i30",
        meta: "Preferred Thu afternoon · Needs review",
        status: "Request",
        pillBg: "#FEF3C7",
        pillFg: "#B45309",
      },
    ],
  },
  {
    out: "public/home/preview-trade.webp",
    title: "Trade jobs and quotes",
    accent: "#2563EB",
    badge: "Trade",
    rows: [
      {
        name: "Hot water repair - 14 Ocean St",
        meta: "Quote approved · Assigned to Sam",
        status: "Scheduled",
        pillBg: "#EFF6FF",
        pillFg: "#1D4ED8",
      },
      {
        name: "Blocked drain - Riverside Unit 3",
        meta: "Enquiry → quote → job linked",
        status: "In progress",
        pillBg: "#ECFDF5",
        pillFg: "#047857",
      },
      {
        name: "Electrical inspection - Warehouse B",
        meta: "Photos + notes attached on site",
        status: "Field update",
        pillBg: "#F3F4F6",
        pillFg: "#374151",
      },
      {
        name: "Invoice - Kitchen fit-out follow-up",
        meta: "Payment link sent to customer",
        status: "Invoiced",
        pillBg: "#ECFDF5",
        pillFg: "#047857",
      },
      {
        name: "New enquiry - Roof leak report",
        meta: "Lead captured · Quote draft started",
        status: "Lead",
        pillBg: "#FEF3C7",
        pillFg: "#B45309",
      },
    ],
  },
  {
    out: "public/home/preview-salon.webp",
    title: "Salon appointments",
    accent: "#DB2777",
    badge: "Salon",
    rows: [
      {
        name: "Cut and blow dry - Emma Wilson",
        meta: "With Jess · Fri 2:00 PM · Confirmed",
        status: "Confirmed",
        pillBg: "#FDF2F8",
        pillFg: "#BE185D",
      },
      {
        name: "Colour and toner - Mia Chen",
        meta: "Service list · 2h 15m · Reminder queued",
        status: "Booked",
        pillBg: "#EFF6FF",
        pillFg: "#1D4ED8",
      },
      {
        name: "Balayage - Olivia Park",
        meta: "Staff calendar · Chair 3 open after",
        status: "Assigned",
        pillBg: "#F3F4F6",
        pillFg: "#374151",
      },
      {
        name: "Online appointment request - Ava",
        meta: "Awaiting salon confirmation",
        status: "Request",
        pillBg: "#FEF3C7",
        pillFg: "#B45309",
      },
      {
        name: "Client record - Sophie Nguyen",
        meta: "History, notes and preferred stylist",
        status: "Customer",
        pillBg: "#ECFDF5",
        pillFg: "#047857",
      },
    ],
  },
];

fs.mkdirSync("public/home", { recursive: true });

for (const c of configs) {
  const svg = dashboardSvg(c);
  await sharp(Buffer.from(svg)).webp({ quality: 78 }).toFile(c.out);
  console.log(c.out, Math.round(fs.statSync(c.out).size / 1024) + "KB");
}

for (const [src, out] of [
  ["public/products/black/sms-phone.jpg", "public/home/preview-workshop-phone.webp"],
  ["public/products/blue/sms-phone.jpg", "public/home/preview-trade-phone.webp"],
  ["public/products/pink/sms-phone.jpg", "public/home/preview-salon-phone.webp"],
]) {
  await sharp(src).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 72 }).toFile(out);
  console.log(out, Math.round(fs.statSync(out).size / 1024) + "KB");
}
