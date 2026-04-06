import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import CleanCSS from "clean-css";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const src = path.join(ROOT, "src", "css", "app.css");
const out = path.join(ROOT, "public", "assets", "css", "app.min.css");

fs.mkdirSync(path.dirname(out), { recursive: true });
const input = fs.readFileSync(src, "utf8");
const min = new CleanCSS({ level: 2 }).minify(input);
if (min.errors?.length) console.error(min.errors);
fs.writeFileSync(out, min.styles);
console.log("Wrote", out, min.stats.originalSize, "->", min.stats.minifiedSize);
