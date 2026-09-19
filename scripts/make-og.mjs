// Renders public/og.png (1200×630) — the Open Graph card. Run manually when the
// headline changes; the output is committed.
//
//   node scripts/make-og.mjs

import { writeFile } from "node:fs/promises"
import sharp from "sharp"

const W = 1200
const H = 630

// Matches the light-mode tokens in globals.css so the card reads as the site.
const INK = "#16181d"
const PAPER = "#fbfcfd"
const MUTED = "#5f6570"
const SIGNAL = "#0f6f7f"

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>

  <text x="88" y="150" font-family="Helvetica, Arial, sans-serif" font-size="20"
        font-weight="600" letter-spacing="3.5" fill="${SIGNAL}">SENIOR BACKEND ENGINEER · REMOTE</text>

  <text x="88" y="268" font-family="Helvetica, Arial, sans-serif" font-size="82"
        font-weight="700" letter-spacing="-2.5" fill="${INK}">Fernando Ibarra</text>

  <text x="88" y="336" font-family="Helvetica, Arial, sans-serif" font-size="34"
        font-weight="400" fill="${MUTED}">Senior Backend / Full Stack Developer</text>

  <line x1="88" y1="404" x2="1112" y2="404" stroke="#d8dbe0" stroke-width="1"/>

  <text x="88" y="464" font-family="Helvetica, Arial, sans-serif" font-size="25"
        font-weight="400" fill="${INK}">NestJS microservices · message-driven payment engines</text>
  <text x="88" y="504" font-family="Helvetica, Arial, sans-serif" font-size="25"
        font-weight="400" fill="${INK}">multi-tenant architectures on SQL Server</text>

  <text x="88" y="576" font-family="Courier, monospace" font-size="20"
        fill="${MUTED}">NestJS · RabbitMQ · Redis · Prisma · React</text>
</svg>`

const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer()
await writeFile("public/og.png", png)
console.log(`public/og.png — ${W}×${H}, ${(png.length / 1024).toFixed(0)}K`)
