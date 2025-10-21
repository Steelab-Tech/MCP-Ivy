# ✅ Deployment Checklist - IVY Fashion ChatGPT App

## Pre-Deployment

- [ ] Đã cài đặt Node.js v16+
- [ ] Đã có tài khoản Vercel
- [ ] Đã có tài khoản ChatGPT Plus
- [ ] Đã review code trong các files chính
- [ ] Đã tạo .env.local (nếu cần)

---

## Local Testing

- [ ] Run `npm install` thành công
- [ ] Run `npm run dev` không có lỗi
- [ ] Test trang chủ http://localhost:3000
- [ ] Run `npm run build` thành công
- [ ] Run `npm start` production mode OK

---

## Vercel Deployment

### Option A: Vercel CLI
- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Login: `vercel login`
- [ ] Deploy: `vercel`
- [ ] Deploy production: `vercel --prod`
- [ ] Lưu lại deployment URL

### Option B: Vercel Dashboard
- [ ] Truy cập vercel.com
- [ ] Import project từ Git/Upload
- [ ] Configure settings (nếu cần)
- [ ] Click Deploy
- [ ] Lưu lại deployment URL

**Deployment URL:** _______________________________________________

---

## Post-Deployment Verification

- [ ] Test URL production trong browser
- [ ] Test endpoint: `curl https://your-app.vercel.app/api/mcp-schema`
- [ ] Schema JSON trả về đúng
- [ ] Widgets accessible: `/widget/product-list.html`
- [ ] Widgets accessible: `/widget/product-compare.html`
- [ ] Widgets accessible: `/widget/outfit.html`
- [ ] Manifest accessible: `/manifest.json`
- [ ] No CORS errors trong console

---

## ChatGPT Integration

### Create Custom GPT
- [ ] Vào chat.openai.com
- [ ] Click avatar → "My GPTs"
- [ ] Click "Create a GPT"
- [ ] Chuyển sang tab "Configure"

### Configure GPT
- [ ] Set Name: "IVY Fashion Assistant"
- [ ] Set Description (copy từ DEPLOYMENT_GUIDE.md)
- [ ] Paste Instructions (copy từ DEPLOYMENT_GUIDE.md)
- [ ] Add Conversation starters (4 examples)
- [ ] Scroll xuống "Actions"

### Add Actions
- [ ] Click "Create new action"
- [ ] Click "Import from URL"
- [ ] Paste: `https://your-vercel-app.vercel.app/api/mcp-schema`
- [ ] Click "Import"
- [ ] Verify 4 tools imported:
  - [ ] findProducts
  - [ ] filterProducts
  - [ ] compareProducts
  - [ ] outfitRecommend

### Upload Manifest (Optional)
- [ ] Vào tab "Knowledge"
- [ ] Upload `public/manifest.json`
- [ ] Confirm upload thành công

### Set Privacy
- [ ] Chọn visibility: Only me / Anyone with link / Public
- [ ] Click "Save"
- [ ] Click "Confirm"

---

## Testing in ChatGPT

### Test Case 1: Tìm sản phẩm
- [ ] User: "Tìm cho tôi áo sơ mi trắng"
- [ ] GPT gọi tool findProducts
- [ ] Widget hiển thị list sản phẩm
- [ ] Images load OK
- [ ] Prices format đúng
- [ ] Click CTA → mở browser external

### Test Case 2: Lọc sản phẩm
- [ ] User: "Lọc sản phẩm công sở giá dưới 1 triệu"
- [ ] GPT gọi tool filterProducts
- [ ] Widget hiển thị + filter info
- [ ] Kết quả đúng với filter
- [ ] UI responsive trên mobile

### Test Case 3: So sánh sản phẩm
- [ ] User: "Tìm áo sơ mi"
- [ ] GPT hiển thị list
- [ ] User: "So sánh sản phẩm 1 và 2"
- [ ] GPT gọi tool compareProducts
- [ ] Widget compare hiển thị
- [ ] VS badge xuất hiện
- [ ] Comparison summary đúng
- [ ] Price diff hiển thị

### Test Case 4: Gợi ý outfit
- [ ] User: "Gợi ý outfit công sở"
- [ ] GPT gọi tool outfitRecommend
- [ ] Widget outfit hiển thị
- [ ] 2-3 sản phẩm trong outfit
- [ ] Tổng giá hiển thị đúng
- [ ] Recommendation text hiển thị
- [ ] Gradient background đẹp
- [ ] CTA buttons hoạt động

### Edge Cases
- [ ] Test không tìm thấy sản phẩm → empty state
- [ ] Test so sánh với sai số lượng IDs → error message
- [ ] Test filter không match → empty state
- [ ] Test tiếng Việt có dấu

---

## Performance & Monitoring

- [ ] Vercel Analytics installed (optional)
- [ ] Check Vercel Logs: `vercel logs`
- [ ] Monitor response times
- [ ] Check error rates
- [ ] Review user feedback

---

## Share & Document

- [ ] Lấy GPT link: `https://chat.openai.com/g/g-XXXXX-ivy-fashion-assistant`
- [ ] Share link với team
- [ ] Document deployment URL
- [ ] Document GPT URL
- [ ] Take screenshots cho demo
- [ ] Write launch announcement (nếu cần)

**GPT URL:** _______________________________________________

---

## Post-Launch

- [ ] Monitor first 24h usage
- [ ] Collect user feedback
- [ ] Track most used tools
- [ ] Identify improvement areas
- [ ] Plan next iteration

---

## Troubleshooting (if needed)

### Schema not loading
- [ ] Check URL is correct
- [ ] Test endpoint with curl
- [ ] Check CORS headers
- [ ] Verify Vercel deployment status

### Widget not displaying
- [ ] Check assetPrefix in next.config.js
- [ ] Verify widget paths: `ui://widget/...`
- [ ] Check browser console for errors
- [ ] Test widget URLs directly

### Tools not being called
- [ ] Re-import schema
- [ ] Improve GPT instructions
- [ ] Add more examples
- [ ] Check OpenAPI schema format

### Deep links not working
- [ ] Verify window.openai.openExternal available
- [ ] Check ChatGPT app version
- [ ] Test fallback window.open

---

## Success Metrics

After 1 week:
- [ ] Number of GPT interactions: _______
- [ ] Most popular tool: _______
- [ ] Average response time: _______
- [ ] User satisfaction: _______
- [ ] Conversion rate (if tracked): _______

---

## Next Steps

- [ ] Iterate based on feedback
- [ ] Add more products
- [ ] Improve outfit recommendations
- [ ] Add more intents
- [ ] Consider real API integration
- [ ] Plan v2 features

---

## Notes

```
(Space for your deployment notes, issues encountered, solutions, etc.)











```

---

**Deployment Date:** _______________________
**Deployed By:** _______________________
**Status:** ⬜ Planning | ⬜ In Progress | ⬜ Completed | ⬜ Live

---

**Good luck with your deployment! 🚀**
