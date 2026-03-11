# 🎬 Chicago Cinema Showtimes

一個顯示芝加哥所有電影院今日及未來放映場次的網頁工具。

## 檔案結構

```
chicago-showtimes/
├── api/
│   └── showtimes.js     ← Vercel serverless function（後端）
├── public/
│   └── index.html       ← 網頁介面（前端）
├── vercel.json          ← Vercel 設定
└── README.md
```

---

## 部署步驟（一次性設定，約 10 分鐘）

### 第一步：把這個資料夾上傳到 GitHub

1. 登入 [github.com](https://github.com)
2. 右上角點 **+** → **New repository**
3. Repository name 填 `chicago-showtimes`
4. 選 **Private**（你的 API Key 不會放在這裡，所以 Public 也可以）
5. 點 **Create repository**
6. 在新頁面，選擇 **upload an existing file**
7. 把這個資料夾裡的所有檔案（包含 `api/` 和 `public/` 子資料夾）拖進去上傳
8. 點 **Commit changes**

### 第二步：連接到 Vercel

1. 去 [vercel.com](https://vercel.com) → 用 GitHub 帳號登入
2. 點 **Add New Project**
3. 選擇你剛建的 `chicago-showtimes` repository → 點 **Import**
4. 不需要改任何設定，直接點 **Deploy**
5. 等待部署完成（約 1 分鐘）

### 第三步：設定 API Key（重要！）

API Key 不能放在程式碼裡，要透過 Vercel 的環境變數設定：

1. 在 Vercel 專案頁面，點上方 **Settings** 分頁
2. 左側選 **Environment Variables**
3. 填入：
   - **Key**: `SERPAPI_KEY`
   - **Value**: `你的 SerpAPI Key`
4. 點 **Save**
5. 回到 **Deployments** 分頁，點最新的部署右側 **⋯** → **Redeploy**

### 完成！

Vercel 會給你一個網址，像是：
```
https://chicago-showtimes-xxx.vercel.app
```

把這個網址加入書籤，之後每次直接開就好，不需要任何設定！

---

## 功能

- 📅 **日期切換**：Today / Tomorrow / 未來幾天
- 🎭 **兩種檢視**：By Theater（按電影院）/ By Movie（按電影）
- 🔍 **即時搜尋**：輸入電影名稱或電影院名稱過濾
- 🎬 **格式篩選**：All / IMAX / Dolby
- ↺ **Refresh**：重新抓取最新場次

## API 用量

SerpAPI 免費版每月 100 次搜尋。每次點 Refresh 或重新開啟網頁才算一次，日常使用完全夠。
