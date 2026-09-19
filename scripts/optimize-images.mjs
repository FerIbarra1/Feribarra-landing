// Downloads the certificate images and re-encodes them at the size the page
// asks for. Run manually when a certificate changes; the optimized output is
// committed, so CI and deploy never need sharp or the network.
//
//   node scripts/optimize-images.mjs
//
// Sources are fetched into a temp dir, never into public/ — anything under
// public/ is copied verbatim into dist/ and would ship 3.5 MB of dead weight.

import { mkdtemp, writeFile, rm, stat, mkdir } from "node:fs/promises"
import { join } from "node:path"
import { tmpdir } from "node:os"
import sharp from "sharp"

// imgur id → the name the dictionaries reference. Keep in sync with the
// `image:` fields in src/i18n/{es,en}.ts.
const SOURCES = [
  "1TU18ZR", "3OZvkWV", "94HoX2o", "DgrWi3k", "Ey2UJyU", "G0ct8M7",
  "KZfZAxN", "OadreRP", "WzpvI6C", "dF9hMUJ", "eYqQVQG", "j6bKiCz",
  "kHXedJz", "nssarnF", "uOyBwvP", "vbdUQvc", "xKye8go", "ylYZO0S",
]

const OUT = "public/certifications"
const WIDTH = 1200
const QUALITY_WEBP = 76

const tmp = await mkdtemp(join(tmpdir(), "certs-"))
await mkdir(OUT, { recursive: true })

let before = 0
let after = 0

try {
  for (const id of SOURCES) {
    const res = await fetch(`https://i.imgur.com/${id}.jpeg`)
    if (!res.ok) throw new Error(`${id}: HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    before += buf.length

    const src = join(tmp, `${id}.jpeg`)
    await writeFile(src, buf)

    const webp = join(OUT, `${id}-${WIDTH}.webp`)

    await sharp(src)
      .resize({ width: WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY_WEBP })
      .toFile(webp)

    const outSize = (await stat(webp)).size
    after += outSize
    console.log(`${id}  ${(buf.length / 1024).toFixed(0)}K → ${(outSize / 1024).toFixed(0)}K`)
  }

  console.log(`\n${SOURCES.length} certificates: ${(before / 1024 / 1024).toFixed(1)} MB → ${(after / 1024 / 1024).toFixed(1)} MB (webp)`)
} finally {
  await rm(tmp, { recursive: true, force: true })
}
