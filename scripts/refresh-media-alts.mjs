/**
 * Regenerate image alt text in tools/data/project-media.json from filenames.
 * Keeps `file` keys unchanged. Run after `npm run images` if needed.
 * Each alt: project name, Egypt location, property type, natural keyword; max 120 chars.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, "..", "tools", "data", "project-media.json");

const MAX = 120;

const PROJ = {
  "zed-west": { name: "ZED West", where: "Sheikh Zayed, Egypt" },
  "zed-east": { name: "ZED East", where: "New Cairo, Egypt" },
  "solana-west": { name: "Solana West", where: "New Zayed, Egypt" },
  "solana-east": { name: "Solana East", where: "New Cairo, Egypt" },
  silversands: { name: "Silversands", where: "North Coast, Egypt" },
};

function clip(s) {
  s = s.replace(/\s+/g, " ").trim();
  if (s.length <= MAX) return s;
  return s.slice(0, MAX - 1).trimEnd() + "…";
}

function classify(file) {
  const f = file.toLowerCase().replace(/\.webp$/i, "");

  const isPlan =
    f.includes("site-plan") ||
    f.includes("site-layout") ||
    f.includes("master-plan") ||
    f.includes("compound-map") ||
    f.includes("compoundmap") ||
    f.includes("area-view-map") ||
    f.includes("project-location") ||
    f.includes("project-map") ||
    f.includes("layout-luxury") ||
    (f.includes("map") && (f.includes("compound") || f.includes("new-cairo") || f.includes("new-zayed")));

  if (isPlan) {
    return {
      property: "mixed-use community layout",
      tail: "helpful when comparing prices and payment plans",
    };
  }

  if (f.includes("townhouse") || f.includes("twin-house") || f.includes("row-house") || f.includes("row-houses")) {
    return { property: "townhouses", tail: "for sale in this ORA community" };
  }

  if (f.includes("bungalow")) {
    return { property: "bungalow villas", tail: "for sale with private outdoor space" };
  }

  if (f.includes("villa") || f.includes("private-villa") || f.includes("standalone")) {
    return { property: "villas", tail: "for sale with contemporary architecture" };
  }

  if (
    f.includes("apartment") ||
    f.includes("tower") ||
    f.includes("towers") ||
    f.includes("skyline") ||
    f.includes("balcony") ||
    f.includes("residential-building") ||
    f.includes("residential-buildings") ||
    f.includes("low-rise") ||
    f.includes("lowrise") ||
    f.includes("compound-buildings") ||
    f.includes("urban-design") ||
    f.includes("building-design")
  ) {
    return { property: "apartments", tail: "for sale in a gated compound" };
  }

  if (f.includes("pool") || f.includes("clubhouse") || f.includes("plaza") || f.includes("commercial")) {
    return { property: "amenities and shared facilities", tail: "supporting villas and apartments for sale" };
  }

  if (
    f.includes("park") ||
    f.includes("garden") ||
    f.includes("green") ||
    f.includes("walking") ||
    f.includes("landscape") ||
    f.includes("lagoon") ||
    f.includes("family-park") ||
    f.includes("outdoor-lifestyle") ||
    f.includes("internal-garden") ||
    f.includes("open-green")
  ) {
    return { property: "parks and landscaped outdoor spaces", tail: "near homes for sale in the compound" };
  }

  if (
    f.includes("living-room") ||
    f.includes("luxury-living") ||
    f.includes("lifestyle") ||
    f.includes("terrace-view") ||
    f.includes("relaxation") ||
    f.includes("interior")
  ) {
    return { property: "interior and lifestyle views", tail: "for villa and apartment buyers in Egypt" };
  }

  if (f.includes("beach") || f.includes("sea-view") || f.includes("coastal")) {
    return { property: "beachfront villas and chalets", tail: "for sale on Egypt’s North Coast" };
  }

  return { property: "residential community", tail: "with villas and apartments for sale" };
}

function altForProjectKey(key, file) {
  const p = PROJ[key];
  if (!p) return null;
  const { property, tail } = classify(file);
  return clip(`${p.name}, ${p.where}: ${property} — ${tail}.`);
}

function altHomeHero(file) {
  const f = file.toLowerCase();
  if (f.includes("silversands") || f.includes("north-coast") || f.includes("lagoon")) {
    return clip(
      "Silversands, North Coast, Egypt: crystal lagoon, beach villas and chalets for sale — ZED and Solana pricing guides."
    );
  }
  return clip(
    "ORA flagship projects in Egypt: ZED, Solana and Silversands apartments and villas for sale — price and payment overview."
  );
}

function walk(node, projectKey) {
  if (Array.isArray(node)) {
    for (const item of node) {
      if (item && typeof item === "object" && item.file) {
        const alt = projectKey ? altForProjectKey(projectKey, item.file) : null;
        if (alt) item.alt = alt;
      } else walk(item, projectKey);
    }
  } else if (node && typeof node === "object") {
    for (const k of Object.keys(node)) {
      if (k === "_meta") continue;
      const nextKey = PROJ[k] ? k : projectKey;
      walk(node[k], nextKey);
    }
  }
}

const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
if (data.site?.homeHero?.file) {
  data.site.homeHero.alt = altHomeHero(data.site.homeHero.file);
}
walk(data, null);
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log("Updated alts in", jsonPath);
