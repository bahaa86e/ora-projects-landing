import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const IMAGES = path.join(ROOT, "images");
const ASSETS = path.join(ROOT, "assets");
const OUT = path.join(ROOT, "public", "assets", "images");
const MEDIA_OUT = path.join(ROOT, "tools", "data", "project-media.json");

const PROJECT_ORDER = ["zed-west", "zed-east", "solana-west", "solana-east", "silversands"];

/** Location segment for SEO filenames: project + location + type */
const LOCATION_SLUG = {
  "zed-west": "sheikh-zayed",
  "zed-east": "new-cairo",
  "solana-west": "new-zayed",
  "solana-east": "new-cairo",
  silversands: "north-coast",
  "pyramids-hills": "giza",
  founder: "egypt",
  misc: "egypt",
};

const RASTER_EXT = /\.(png|jpe?g|webp)$/i;

function extractSlug(filename) {
  const base = path.basename(filename, path.extname(filename));
  const m = base.match(
    /_images_(.+)-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  );
  if (m) return m[1].toLowerCase();
  const m2 = base.match(/_images_(.+)$/i);
  if (m2) return m2[1].toLowerCase();
  return base.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function detectProject(slug) {
  const s = slug.toLowerCase();
  if (s.startsWith("zed-west") || s.startsWith("zedwest")) return "zed-west";
  if (s.startsWith("zed-east") || s.startsWith("zedeast")) return "zed-east";
  if (s.includes("luxury-villa-zed-east")) return "zed-east";
  if (s.startsWith("solana-west") || s.startsWith("solanawest")) return "solana-west";
  if (s.includes("luxury-villa-solana-west")) return "solana-west";
  if (s.startsWith("solana-east") || s.startsWith("solanaeast")) return "solana-east";
  if (s.includes("luxury-villa-solana-east")) return "solana-east";
  if (s.startsWith("silversands") || s.includes("luxury-villa-silversands")) return "silversands";
  if (s.startsWith("pyramids-hills")) return "pyramids-hills";
  if (s.includes("ora-developers-egypt-founder")) return "founder";
  return "misc";
}

const ALT_PREFIX = {
  "zed-west": "ZED West Sheikh Zayed",
  "zed-east": "ZED East New Cairo",
  "solana-west": "Solana West New Zayed",
  "solana-east": "Solana East New Cairo",
  silversands: "Silversands North Coast Egypt",
  "pyramids-hills": "Pyramids Hills Giza Egypt",
  misc: "ORA Developers Egypt",
  founder: "ORA Developers Egypt leadership",
};

function trimAlt(s) {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= 120) return t;
  return t.slice(0, 117).trimEnd() + "...";
}

function stripProjectPrefix(slug, project) {
  let t = slug.toLowerCase();
  const variants = [
    project,
    project.replace(/-/g, ""),
    project === "zed-west" ? "zedwest" : null,
    project === "zed-east" ? "zedeast" : null,
    project === "solana-west" ? "solanawest" : null,
    project === "solana-east" ? "solanaeast" : null,
  ].filter(Boolean);
  for (const v of variants) {
    t = t.replace(new RegExp(`^${v}-?`, "i"), "");
  }
  t = t
    .replace(/^luxury-villa-zed-east-?/i, "villa-")
    .replace(/^luxury-villa-solana-west-?/i, "villa-")
    .replace(/^luxury-villa-solana-east-?/i, "villa-")
    .replace(/^luxury-villa-silversands-?/i, "villa-");
  return t.replace(/^-+|-+$/g, "").replace(/-+/g, "-");
}

function typeSegmentForSeo(project, slug) {
  let typ = stripProjectPrefix(slug, project);
  if (!typ) typ = "community";
  typ = typ.replace(/[^a-z0-9-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  if (typ.length > 72) typ = typ.slice(0, 72).replace(/-[^-]*$/, "");
  return typ || "photo";
}

const seoNameCount = new Map();

function buildSeoWebpFilename(project, slug) {
  const loc = LOCATION_SLUG[project] || "egypt";
  const typeSeg = typeSegmentForSeo(project, slug);
  let base = `${project}-${loc}-${typeSeg}`;
  const n = (seoNameCount.get(base) || 0) + 1;
  seoNameCount.set(base, n);
  const suffix = n > 1 ? `-${n}` : "";
  return `${base}${suffix}.webp`;
}

function slugToPhrase(slug, project) {
  const p = project || detectProject(slug);
  return stripProjectPrefix(slug, p)
    .replace(/-/g, " ")
    .replace(/^villa\s*-?\s*/i, "villa ")
    .trim();
}

function titleCasePhrase(s) {
  const raw = (s || "").split(/\s+/).filter(Boolean);
  return raw
    .map((w) => {
      const lw = w.toLowerCase();
      if (lw === "ora") return "ORA";
      if (lw === "egypt") return "Egypt";
      if (/^\d/.test(w)) return w;
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(" ");
}

function propertyKeywordsFromSlug(slug) {
  const s = (slug || "").toLowerCase();
  if (/villa|townhouse|twin|bungalow|chalet|beach|lagoon/.test(s)) return "villas for sale";
  if (/apartment|tower|skyline|low-?rise|residential-building/.test(s)) return "apartments for sale";
  if (/pool|clubhouse|park|garden|green|walk|lifestyle|amenit/.test(s)) return "amenities Egypt";
  if (/map|site|master|plan|layout|location|aerial/.test(s)) return "masterplan Egypt price";
  return "community for sale Egypt";
}

function makeAlt(project, slug) {
  const prefix = ALT_PREFIX[project] || ALT_PREFIX.misc;
  const phrase = titleCasePhrase(slugToPhrase(slug, project) || slug.replace(/-/g, " "));
  const kw = propertyKeywordsFromSlug(slug);
  return trimAlt(`${prefix} ${kw} — ${phrase} — price payment plan`);
}

function heroScore(slug) {
  let n = 0;
  if (
    /master-plan|masterplan|site-layout|compound-map|aerial|modern-towers|project-map|area-view-map|mixed-use-development|residential-community-aerial/.test(
      slug
    )
  )
    n += 18;
  if (/city-view|lagoon-view|beachfront-crystal|layout-luxury-coastal|compound-buildings|residential-buildings/.test(slug))
    n += 12;
  if (/apartment|towers|skyline|hero|panoramic/.test(slug)) n += 8;
  if (/living-room|villa-interior|interior/.test(slug)) n -= 8;
  return n;
}

function amenityScore(slug) {
  let n = 0;
  if (
    /park|pool|lagoon|clubhouse|beach-lifestyle|garden|landscape|family-park|green|walking|outdoor-lifestyle|internal-garden|activities|relaxation|pool-area|beachfront-facilities/.test(
      slug
    )
  )
    n += 14;
  if (/layout|master-plan|map|site-layout|compoundmap/.test(slug)) n += 5;
  if (/townhouse|villa|apartments|standalone|twin-house/.test(slug)) n += 4;
  return n;
}

function splitMedia(entries, projectKey) {
  const byFile = new Map();
  for (const e of entries) {
    if (!byFile.has(e.webp)) byFile.set(e.webp, e);
  }
  const unique = [...byFile.values()];
  if (unique.length === 0) return { hero: [], amenities: [], gallery: [] };

  const heroSorted = [...unique].sort((a, b) => heroScore(b.slug) - heroScore(a.slug));
  const heroCount = Math.min(3, unique.length);
  const hero = heroSorted.slice(0, heroCount);

  const heroSet = new Set(hero.map((h) => h.webp));
  const rest = unique.filter((e) => !heroSet.has(e.webp));
  const amenSorted = [...rest].sort((a, b) => amenityScore(b.slug) - amenityScore(a.slug));
  const amenCount = Math.min(5, rest.length);
  const amenities = amenSorted.slice(0, amenCount);
  const amenSet = new Set(amenities.map((a) => a.webp));
  const gallery = rest.filter((e) => !amenSet.has(e.webp));

  return {
    hero: hero.map((e) => ({ file: e.webp, alt: makeAlt(projectKey, e.slug) })),
    amenities: amenities.map((e) => ({ file: e.webp, alt: makeAlt(projectKey, e.slug) })),
    gallery: gallery.map((e) => ({ file: e.webp, alt: makeAlt(projectKey, e.slug) })),
  };
}

/** Prefer /images; merge /assets for files not already seen (same basename). */
function collectInputFiles() {
  const out = [];
  const seen = new Set();
  for (const dir of [IMAGES, ASSETS]) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => RASTER_EXT.test(f));
    for (const f of files) {
      const key = f.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ dir, file: f });
    }
  }
  return out;
}

async function rasterToWebp(srcPath, destPath) {
  const ext = path.extname(srcPath).toLowerCase();
  if (ext === ".webp") {
    await sharp(srcPath).webp({ quality: 82, effort: 4 }).toFile(destPath);
    return;
  }
  await sharp(srcPath).webp({ quality: 82, effort: 4 }).toFile(destPath);
}

async function main() {
  seoNameCount.clear();

  const inputs = collectInputFiles();
  if (inputs.length === 0) {
    console.warn("No images in /images or /assets — skip ingest (add PNG/JPEG/WebP to /images)");
    process.exit(0);
  }

  fs.mkdirSync(OUT, { recursive: true });

  const records = [];

  for (const { dir, file: f } of inputs) {
    const slug = extractSlug(f);
    const project = detectProject(slug);
    const webp = buildSeoWebpFilename(project, slug);

    await rasterToWebp(path.join(dir, f), path.join(OUT, webp));

    records.push({ slug, webp, project, source: path.join(dir, f) });
    console.log("webp:", webp, "←", project, "(" + f + ")");
  }

  const byProject = new Map();
  for (const p of PROJECT_ORDER) byProject.set(p, []);
  byProject.set("pyramids-hills", []);
  byProject.set("founder", []);
  byProject.set("misc", []);

  for (const r of records) {
    const key = PROJECT_ORDER.includes(r.project) ? r.project : r.project;
    if (!byProject.has(key)) byProject.set(key, []);
    byProject.get(key).push(r);
  }

  const output = { site: {} };

  for (const p of PROJECT_ORDER) {
    const entries = byProject.get(p) || [];
    output[p] = splitMedia(entries, p);
  }

  const silvers = output.silversands?.hero?.[0];
  const zedW = output["zed-west"]?.hero?.[0];
  const homePick = silvers || zedW || output["zed-east"]?.hero?.[0];
  if (homePick) {
    output.site.homeHero = {
      file: homePick.file,
      alt: trimAlt(
        "ORA Developers Egypt flagship communities — luxury homes, payment plans, ZED, Solana, Silversands."
      ),
    };
  }

  output._meta = {
    generated: new Date().toISOString(),
    sourceCount: inputs.length,
    sources: ["images/", "assets/"],
    extras: {
      "pyramids-hills": (byProject.get("pyramids-hills") || []).map((e) => e.webp),
      founder: (byProject.get("founder") || []).map((e) => e.webp),
      misc: (byProject.get("misc") || []).map((e) => e.webp),
    },
  };

  fs.mkdirSync(path.dirname(MEDIA_OUT), { recursive: true });
  fs.writeFileSync(MEDIA_OUT, JSON.stringify(output, null, 2), "utf8");
  console.log("Wrote", MEDIA_OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
