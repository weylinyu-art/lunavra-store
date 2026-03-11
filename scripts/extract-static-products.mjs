#!/usr/bin/env node
/**
 * One-time: extract current products from lib/data/products.ts to products.static.json
 * Run: npx tsx scripts/extract-static-products.mjs
 */
import { writeFileSync } from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

async function main() {
  const modPath = pathToFileURL(join(ROOT, "lib/data/products.ts")).href;
  const { products } = await import(modPath);
  const out = join(ROOT, "lib/data/products.static.json");
  writeFileSync(out, JSON.stringify(products, null, 2));
  console.log("Wrote", products.length, "products to lib/data/products.static.json");
}

main();
