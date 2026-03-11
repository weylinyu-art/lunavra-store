# LUNAVRA Store - 部署指南

通过 GitHub + Cloudflare Pages 部署网站。

## 1. 推送到 GitHub

```bash
cd lunavra-store
git init
git add .
git commit -m "Initial commit: LUNAVRA store"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lunavra-store.git
git push -u origin main
```

将 `YOUR_USERNAME` 替换为你的 GitHub 用户名。

## 2. 连接 Cloudflare Pages

1. 登录 [Cloudflare 控制台](https://dash.cloudflare.com)
2. 左侧菜单选择 **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. 选择 **GitHub**，授权并选择仓库 `lunavra-store`
4. 配置构建设置：

| 设置项 | 值 |
|--------|-----|
| **Framework preset** | Next.js (Static HTML Export) |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Root directory** | 留空 |
| **Environment variables** | 无需添加 |

5. 点击 **Save and Deploy**

## 3. 自定义域名（可选）

- 在 Cloudflare Pages 项目中进入 **Custom domains**
- 添加 `nilechic.com`
- 将域名的 DNS 解析指向 Cloudflare

## 4. 自动部署

连接 GitHub 后，每次 `main` 分支有新提交时，Cloudflare 会自动重新构建和部署。拉取请求会生成预览部署。

## 技术说明

- 项目使用 `output: "export"` 进行静态 HTML 导出
- 构建产物在 `out` 目录
- `public/_redirects` 用于处理 `/` → `/en` 等重定向
- 无需服务器端环境变量，静态站点可直接部署
