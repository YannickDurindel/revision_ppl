// Assemble une page unique (dist/carnet-ppl.html) : CSS, données et script intégrés.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const part = (name) => html.split(`<!--${name}-->`)[1].split(`<!--/${name}-->`)[0].trim();
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => readFileSync(m[1], "utf8"));
const inline = (js) => js.replace(/<\/script/gi, "<\\/script");

const out = [
  part("HEAD"),
  `<style>\n${readFileSync("style.css", "utf8")}</style>`,
  part("BODY"),
  ...scripts.map((js) => `<script>\n${inline(js)}\n</script>`),
].join("\n");

mkdirSync("dist", { recursive: true });
writeFileSync("dist/carnet-ppl.html", out);
console.log(`dist/carnet-ppl.html ${(out.length / 1024).toFixed(0)} Ko`);
