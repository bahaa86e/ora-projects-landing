import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { minify } from "terser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const src = path.join(ROOT, "src", "js", "app.js");
const out = path.join(ROOT, "public", "assets", "js", "app.min.js");

fs.mkdirSync(path.dirname(out), { recursive: true });
const code = fs.readFileSync(src, "utf8");
const r = await minify(code, { compress: true, mangle: true, format: { comments: false } });
fs.writeFileSync(out, r.code || "");
console.log("Wrote", out);
