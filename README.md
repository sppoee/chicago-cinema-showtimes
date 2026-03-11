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

## 功能

- 📅 **日期切換**：Today / Tomorrow / 未來幾天
- 🎭 **兩種檢視**：By Theater（按電影院）/ By Movie（按電影）
- 🔍 **即時搜尋**：輸入電影名稱或電影院名稱過濾
- 🎬 **格式篩選**：All / IMAX / Dolby
- ↺ **Refresh**：重新抓取最新場次

## API 用量

SerpAPI 免費版每月 100 次搜尋。每次點 Refresh 或重新開啟網頁才算一次，日常使用完全夠。
