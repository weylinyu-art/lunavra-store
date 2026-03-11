# NileChic 商品管理 — Contentful 集成指南

本指南说明如何用 Contentful 作为 Headless CMS 管理商品，并与现有 Next.js 静态站点集成。

---

## 一、Contentful 账号与空间

### 1. 注册与创建空间

1. 打开 [contentful.com](https://www.contentful.com)，注册/登录
2. 点击 **Create space**
3. 选择 **Empty space**，命名如 `nilechic-store`
4. 完成创建

### 2. 获取 API 密钥

1. 进入 **Settings** → **API keys**
2. 点击 **Add API key**
3. 命名如 `NileChic Delivery`
4. 记录：
   - **Space ID**（如 `abc123xyz`）
   - **Content Delivery API - access token**（用于前端/构建时拉取内容）

生产环境建议再创建一个 **Preview API token** 用于草稿预览（可选）。

---

## 二、Content Model 设计

### 1. 创建 Content Type：Product

在 **Content model** → **Add content type** → 名称 `Product`

### 2. 字段配置

| 字段 ID | 类型 | 必填 | 说明 |
|---------|------|------|------|
| `name` | Short text | ✓ | 英文名称 |
| `nameAr` | Short text | ✓ | 阿拉伯语名称 |
| `price` | Number (Integer) | ✓ | 价格（美元） |
| `category` | Short text（或 Dropdown） | ✓ | 分类：lingerie-sets, bras, panties, sleepwear, bridal |
| `image` | Media (1 file) | ✓ | 主图 |
| `images` | Media (multiple) |  | 详情图（多图） |
| `description` | Long text | ✓ | 英文描述 |
| `descriptionAr` | Long text | ✓ | 阿拉伯语描述 |
| `sizes` | Short text, List | ✓ | 尺码列表，如 XS,S,M,L,XL |
| `tags` | Short text, List |  | 标签：best-seller, romantic-gift, new, popular |
| `featured` | Boolean |  | 是否精选，默认 false |
| `material` | Short text |  | 材质（英文） |
| `materialAr` | Short text |  | 材质（阿语） |
| `care` | Short text |  | 护理说明（英文） |
| `careAr` | Short text |  | 护理说明（阿语） |

**category 若用 Dropdown**：选项为 `lingerie-sets`, `bras`, `panties`, `sleepwear`, `bridal`  
**tags 若用 Dropdown**：选项为 `best-seller`, `romantic-gift`, `new`, `popular`，支持多选

### 3. 图片字段说明

- **image**：单张，用作主图与列表缩略图  
- **images**：多张，用于详情页轮播；若不填，可只用 `image`

---

## 三、迁移现有商品到 Contentful

### 方式 A：批量导入脚本（推荐，几十个商品）

1. 在 Contentful 创建 **Management API Token**：  
   https://app.contentful.com/account/profile/cm-api-tokens  
2. 在 `.env.local` 中添加：  
   `CONTENTFUL_MANAGEMENT_ACCESS_TOKEN=你的Management_Token`
3. 确保已创建好 Product 内容模型（见第二章）
4. 运行：  
   ```bash
   npm run import-contentful
   ```
5. 脚本会从 `lib/data/products.static.json` 读取 36 个商品，逐个创建到 Contentful（含图片 URL 转 Asset）

### 方式 A2：使用 Contentful CLI 导入（Token 权限报错时）

若 `npm run import-contentful` 报错 `OrganizationAccessGrantRequired` 或 `AccessTokenInvalid`，可用 CLI 的浏览器登录方式：

1. 安装依赖后，在项目目录执行：
   ```bash
   npm install
   npx contentful-cli login
   ```
2. 浏览器会打开，用**能访问 NileChic 空间的账号**登录 Contentful
3. 登录成功后，选择你的 Space：
   ```bash
   npx contentful-cli space use jhp2ptwed4b8
   ```
   （将 `jhp2ptwed4b8` 换成你的 Space ID）
4. 执行导入：
   ```bash
   npm run contentful-import-cli
   ```
5. 脚本会生成 `contentful-import.json` 并导入 36 个商品及图片

### 方式 B：手动逐条创建

1. 在 Contentful 中创建若干 **Entry**（类型为 Product）
2. 按商品数据逐条录入
3. 每条 Entry 创建后点击 **Publish**

---

## 四、项目集成

### 1. 安装 Contentful SDK

```bash
npm install contentful
```

### 2. 环境变量

在项目根目录创建 `.env.local`（不要提交到 Git）：

```
CONTENTFUL_SPACE_ID=你的Space_ID
CONTENTFUL_ACCESS_TOKEN=你的Delivery_API_Token
```

在 Cloudflare Pages 构建配置中，于 **Settings** → **Environment variables** 添加相同变量。

### 3. 创建拉取逻辑

已准备 `lib/contentful/client.ts` 和 `lib/contentful/products.ts`，用于：

- 连接 Contentful
- 拉取所有 Product 条目
- 转换为现有 `Product` 类型

### 4. 数据源切换

`lib/data/products.ts` 将支持两种模式：

- **有 Contentful 配置时**：构建时从 Contentful 拉取
- **无配置时**：继续使用本地静态数据（开发/ fallback）

---

## 五、构建与部署流程

1. **本地开发**：可暂时不用 Contentful，沿用静态数据
2. **正式构建**：在 Cloudflare 中配置环境变量后，每次构建会从 Contentful 拉取最新商品
3. **更新商品**：在 Contentful 后台编辑并 Publish，然后触发重新部署（见下）

---

## 六、内容更新后自动重新部署

### 方式 A：Contentful Webhook → Cloudflare

1. 在 Contentful：**Settings** → **Webhooks** → **Add Webhook**
2. 名称：`Deploy on Publish`
3. URL：Cloudflare Pages 的 **Build hook URL**
   - 在 Cloudflare：**lunavra-store** → **Settings** → **Builds & deployments** → **Build hooks** → **Add build hook**
   - 生成 URL 如 `https://api.cloudflare.com/client/v4/pages/webhook/xxx`
4. 触发：选择 **Content type** 为 Product，**Event** 为 `Entry publish`

发布 Product 后，Webhook 会触发 Cloudflare 重新构建并部署。

### 方式 B：手动触发

在 Cloudflare Dashboard → **Deployments** → **Retry deployment** 或重新 push 到 GitHub。

---

## 七、文件变更清单

| 文件 | 说明 |
|------|------|
| `lib/contentful/client.ts` | Contentful 客户端 |
| `lib/contentful/products.ts` | 拉取并转换 Product 数据（SDK 方式，可选） |
| `lib/data/products.ts` | 从 `products.generated.json` 或 `products.static.json` 加载 |
| `scripts/sync-contentful.mjs` | 构建前同步脚本：Contentful → products.generated.json |
| `scripts/extract-static-products.mjs` | 一次性提取静态数据到 products.static.json |
| `lib/data/products.static.json` | 静态商品备份（已生成） |
| `lib/data/products.generated.json` | 构建时生成（gitignore） |
| `.env.local` | 本地环境变量（不提交） |
| `.env.example` | 示例配置（可提交） |

---

## 八、常见问题

**Q：构建时 Contentful 请求失败？**  
检查 `CONTENTFUL_SPACE_ID` 和 `CONTENTFUL_ACCESS_TOKEN` 是否正确，以及网络是否可达。

**Q：想先测试再上线？**  
可先在本地设置 `.env.local`，运行 `npm run build` 验证拉取是否正常。

**Q：图片用 Contentful 还是外部链接？**  
两种都支持。Contentful Media 会返回 `https://images.ctfassets.net/...` 格式的 URL。
