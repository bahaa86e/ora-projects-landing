import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "images");
const OUT = path.join(ROOT, "public", "assets", "images");

if (!fs.existsSync(SRC)) {
  console.warn("No /images folder — skip WebP generation");
  process.exit(0);
}

fs.mkdirSync(OUT, { recursive: true });

const files = fs.readdirSync(SRC).filter((f) => /\.png$/i.test(f));
for (const f of files) {
  const base = f.replace(/\.png$/i, "");
  const webpName = `${base}.webp`;
  await sharp(path.join(SRC, f)).webp({ quality: 82, effort: 4 }).toFile(path.join(OUT, webpName));
  console.log("webp:", webpName);
}

/* SEO aliases: duplicate WebP bytes under project-specific names (same visual, unique URLs/filenames) */
const pool = fs.readdirSync(OUT).filter((f) => f.endsWith(".webp"));
if (pool.length === 0) process.exit(0);

function copyAs(fromBase, targets) {
  const src = path.join(OUT, `${fromBase}.webp`);
  if (!fs.existsSync(src)) return;
  const buf = fs.readFileSync(src);
  for (const t of targets) {
    fs.writeFileSync(path.join(OUT, t), buf);
  }
}

copyAs("zed-west-towers", [
  "zed-west-sheikh-zayed-towers-sunset-ora-egypt.webp",
  "zed-west-luxury-towers-payment-plan-egypt.webp",
  "zed-west-skyline-residences-sheikh-zayed.webp",
]);
copyAs("zed-west-lagoon", [
  "zed-west-lagoon-amenities-sheikh-zayed-ora.webp",
  "zed-west-waterfront-lifestyle-egypt.webp",
]);
copyAs("zed-west-green", ["zed-west-park-landscape-compound-egypt.webp", "zed-west-green-spaces-ora-developers.webp"]);
copyAs("zed-west-garden", ["zed-west-internal-garden-residents-egypt.webp"]);
copyAs("zed-west-lifestyle", ["zed-west-community-outdoor-living-sheikh-zayed.webp"]);
copyAs("zed-west-site-plan", ["zed-west-masterplan-site-layout-egypt.webp"]);

copyAs("zed-east-city-view", [
  "zed-east-new-cairo-compound-city-view-ora.webp",
  "zed-east-prices-apartments-new-cairo-egypt.webp",
]);
copyAs("zed-east-park", ["zed-east-central-park-lifestyle-new-cairo.webp", "zed-east-green-park-families-egypt.webp"]);
copyAs("zed-east-villas", ["zed-east-luxury-villas-for-sale-new-cairo.webp"]);
copyAs("zed-east-townhouse", ["zed-east-townhouse-modern-architecture-egypt.webp"]);
copyAs("zed-east-twin-house", ["zed-east-twin-villas-new-cairo-ora.webp"]);
copyAs("zed-east-balcony", ["zed-east-apartment-balcony-view-ora-egypt.webp"]);
copyAs("zed-east-walking", ["zed-east-walking-trails-compound-new-cairo.webp"]);
copyAs("zed-east-skyline", ["zed-east-skyline-towers-new-cairo-egypt.webp"]);
copyAs("zed-east-site-plan", ["zed-east-masterplan-layout-new-cairo.webp"]);

copyAs("solana-west-compound", [
  "solana-west-new-zayed-compound-ora-egypt.webp",
  "solana-west-villas-payment-plan-egypt.webp",
]);
copyAs("solana-west-apartments", ["solana-west-apartments-new-zayed-ora.webp"]);
copyAs("solana-west-lowrise", ["solana-west-low-rise-residences-egypt.webp"]);
copyAs("solana-west-villa", ["solana-west-luxury-villa-architecture-zayed.webp"]);
copyAs("solana-west-bungalow", ["solana-west-bungalow-villa-garden-egypt.webp"]);

copyAs("hero-home", [
  "solana-east-new-cairo-compound-hero-ora.webp",
  "solana-east-residences-park-view-egypt.webp",
  "solana-east-townhouses-new-cairo-ora.webp",
  "solana-east-apartments-investment-egypt.webp",
]);
copyAs("zed-east-park", ["solana-east-landscaped-park-new-cairo-ora.webp", "solana-east-family-amenities-egypt.webp"]);
copyAs("zed-east-villas", ["solana-east-villas-for-sale-new-cairo.webp"]);
copyAs("zed-east-site-plan", ["solana-east-masterplan-new-cairo-egypt.webp"]);
copyAs("pyramids-hills-terrace", [
  "solana-east-terrace-lifestyle-new-cairo.webp",
  "solana-east-luxury-outdoor-living-egypt.webp",
]);

copyAs("silversands-lagoon", [
  "silversands-north-coast-crystal-lagoon-ora-egypt.webp",
  "silversands-beachfront-villas-north-coast.webp",
  "silversands-sea-view-resort-egypt.webp",
]);
copyAs("silversands-lagoon", ["silversands-pool-lifestyle-north-coast-ora.webp"]);

copyAs("hero-home", [
  "ora-developers-egypt-luxury-homepage-hero.webp",
  "north-coast-investment-silversands-egypt.webp",
]);

console.log("Image aliases written to", OUT);
