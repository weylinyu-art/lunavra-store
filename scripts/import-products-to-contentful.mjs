#!/usr/bin/env node
/**
 * 批量导入商品到 Contentful
 * 从 lib/data/products.static.json 读取，创建 Product 条目
 *
 * 需配置环境变量:
 *   CONTENTFUL_SPACE_ID
 *   CONTENTFUL_MANAGEMENT_ACCESS_TOKEN  （Management API 令牌，非 Delivery API）
 *
 * 获取 Management Token: https://app.contentful.com/account/profile/cm-api-tokens
 *
 * 运行: node scripts/import-products-to-contentful.mjs
 */
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import contentful from "contentful-management";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOCALE = "en-US";

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function getExt(url) {
  try {
    const path = new URL(url).pathname;
    const ext = path.split(".").pop()?.toLowerCase();
    return ext && ["jpg", "jpeg", "png", "gif", "webp"].includes(ext) ? ext : "jpg";
  } catch {
    return "jpg";
  }
}

function getContentType(url) {
  const ext = getExt(url);
  const map = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp" };
  return map[ext] || "image/jpeg";
}

async function ensureAsset(environment, url, cache) {
  if (cache.has(url)) return cache.get(url);
  const ext = getExt(url);
  const filename = `img-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const assetId = `asset-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const asset = await environment.createAssetWithId(assetId, {
    fields: {
      title: { [LOCALE]: filename },
      file: {
        [LOCALE]: {
          contentType: getContentType(url),
          fileName: filename,
          upload: url,
        },
      },
    },
  });
  await asset.processForAllLocales();
  let processed = asset;
  let attempts = 0;
  while (processed.fields?.file?.[LOCALE]?.url === undefined && attempts < 30) {
    await delay(1000);
    processed = await processed.getAsset();
    attempts++;
  }
  await processed.publish();
  cache.set(url, processed.sys.id);
  return processed.sys.id;
}

async function main() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const token = process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN;
  if (!spaceId || !token) {
    console.error("缺少环境变量: CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_ACCESS_TOKEN");
    console.error("获取 Management Token: https://app.contentful.com/account/profile/cm-api-tokens");
    process.exit(1);
  }

  const dataPath = join(__dirname, "..", "lib", "data", "products.static.json");
  const products = JSON.parse(readFileSync(dataPath, "utf-8"));
  console.log(`准备导入 ${products.length} 个商品...`);

  const client = contentful.createClient({ accessToken: token });
  const space = await client.getSpace(spaceId);
  const env = await space.getEnvironment("master");
  const assetCache = new Map();

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    try {
      let imageId = null;
      const imageUrls = [p.image, ...(p.images || [])].filter(Boolean);
      const uniqueUrls = [...new Set(imageUrls)];

      if (uniqueUrls.length > 0) {
        imageId = await ensureAsset(env, uniqueUrls[0], assetCache);
        await delay(300);
      }

      const imageIds = [];
      for (const u of uniqueUrls) {
        const id = await ensureAsset(env, u, assetCache);
        imageIds.push({ sys: { type: "Link", linkType: "Asset", id } });
        await delay(200);
      }

      const entry = await env.createEntry("product", {
        fields: {
          name: { [LOCALE]: p.name || "" },
          nameAr: { [LOCALE]: p.nameAr || "" },
          price: { [LOCALE]: p.price ?? 0 },
          category: { [LOCALE]: p.category || "lingerie-sets" },
          description: { [LOCALE]: p.description || "" },
          descriptionAr: { [LOCALE]: p.descriptionAr || "" },
          sizes: { [LOCALE]: Array.isArray(p.sizes) ? p.sizes : [] },
          tags: { [LOCALE]: Array.isArray(p.tags) ? p.tags : [] },
          featured: { [LOCALE]: Boolean(p.featured) },
          material: { [LOCALE]: p.material || "" },
          materialAr: { [LOCALE]: p.materialAr || "" },
          care: { [LOCALE]: p.care || "" },
          careAr: { [LOCALE]: p.careAr || "" },
        },
      });

      if (imageId) {
        entry.fields.image = { [LOCALE]: { sys: { type: "Link", linkType: "Asset", id: imageId } } };
      }
      if (imageIds.length > 0) {
        entry.fields.images = { [LOCALE]: imageIds };
      }

      await entry.update();
      await entry.publish();
      console.log(`[${i + 1}/${products.length}] ✓ ${p.name}`);
    } catch (err) {
      console.error(`[${i + 1}/${products.length}] ✗ ${p.name}:`, err.message);
    }
    await delay(400);
  }

  console.log("\n导入完成。请在 Contentful 后台检查商品是否正常。");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
