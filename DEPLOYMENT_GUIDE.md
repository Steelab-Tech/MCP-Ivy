# 🚀 Hướng dẫn Deploy IVY Fashion ChatGPT App

## ✅ Checklist trước khi deploy

- [ ] Đã cài đặt Node.js (v16+)
- [ ] Đã có tài khoản Vercel
- [ ] Đã có tài khoản ChatGPT Plus (để tạo Custom GPT)
- [ ] Đã review code và test local

## 📋 Các bước deploy chi tiết

### 1. Chuẩn bị môi trường local

```bash
# Clone hoặc cd vào project
cd /Users/blackpham/Desktop/MCP/ivy-chatgpt-demo

# Install dependencies
npm install

# Tạo file .env.local từ .env.example
cp .env.example .env.local

# Test local
npm run dev
```

Mở http://localhost:3000 để kiểm tra.

### 2. Build và test production locally

```bash
# Build production
npm run build

# Chạy production server
npm start
```

Nếu build thành công và chạy được, bạn đã sẵn sàng deploy.

### 3. Deploy lên Vercel

#### Option A: Vercel CLI (Recommended)

```bash
# Install Vercel CLI global
npm install -g vercel

# Login
vercel login

# Deploy (lần đầu)
vercel

# Deploy production
vercel --prod
```

Vercel sẽ hỏi một số câu hỏi:
- Set up and deploy? **Y**
- Which scope? **Your account**
- Link to existing project? **N**
- Project name? **ivy-chatgpt-demo** (hoặc tên khác)
- In which directory? **./** (enter)
- Want to override settings? **N**

#### Option B: Vercel Dashboard (GUI)

1. Truy cập https://vercel.com
2. Click **"Import Project"**
3. Chọn **"Import Git Repository"** hoặc upload folder
4. Vercel tự detect Next.js
5. Click **"Deploy"**

### 4. Lấy URL production

Sau khi deploy thành công, bạn sẽ có URL dạng:
```
https://ivy-chatgpt-demo-abc123.vercel.app
```

**Lưu URL này lại** để dùng cho bước tiếp theo.

### 5. Tạo Custom GPT trong ChatGPT

#### 5.1. Truy cập GPT Builder

1. Vào https://chat.openai.com
2. Click avatar → **"My GPTs"**
3. Click **"Create a GPT"**

#### 5.2. Configure GPT (Tab "Configure")

**Name:**
```
IVY Fashion Assistant
```

**Description:**
```
Trợ lý thời trang IVY MODA - Tìm sản phẩm, gợi ý outfit, so sánh và lọc sản phẩm thông minh
```

**Instructions:**
```
Bạn là trợ lý thời trang chuyên nghiệp của IVY MODA, thương hiệu thời trang hàng đầu Việt Nam.

NHIỆM VỤ:
1. Giúp khách hàng tìm kiếm sản phẩm theo nhu cầu (áo, váy, quần, đầm, phụ kiện)
2. Gợi ý outfit hoàn chỉnh cho các dịp: đi làm, dạo phố, hẹn hò, dự tiệc
3. So sánh sản phẩm về giá cả, phong cách, chất liệu
4. Lọc sản phẩm theo màu sắc, size, giá, phong cách

PHONG CÁCH GIAO TIẾP:
- Thân thiện, nhiệt tình, chuyên nghiệp
- Luôn sử dụng tiếng Việt
- Hiểu ngữ cảnh và đưa ra gợi ý phù hợp
- Hỏi thêm nếu thông tin chưa rõ

TOOLS CÓ SẴN:
- findProducts: Tìm sản phẩm theo category, color, style, size
- filterProducts: Lọc nâng cao theo nhiều tiêu chí
- compareProducts: So sánh chi tiết 2 sản phẩm
- outfitRecommend: Gợi ý set đồ hoàn chỉnh

Luôn ưu tiên hiển thị widget với hình ảnh sản phẩm đẹp mắt.
```

**Conversation starters:**
```
Tìm cho tôi áo sơ mi trắng công sở
Gợi ý outfit đi làm hôm nay
So sánh 2 sản phẩm này
Lọc váy màu đen giá dưới 1 triệu
```

#### 5.3. Add Actions

1. Scroll xuống **"Actions"** section
2. Click **"Create new action"**
3. Click **"Import from URL"**
4. Nhập URL:
   ```
   https://your-vercel-app.vercel.app/api/mcp-schema
   ```
5. Click **"Import"**

Vercel sẽ tự động load OpenAPI schema với 4 tools.

**Hoặc** copy-paste schema thủ công từ file response của `/api/mcp-schema`.

#### 5.4. Configure Authentication

- **Authentication**: None (hoặc API Key nếu cần bảo mật)
- **Privacy**: Internal / Public (tùy nhu cầu)

#### 5.5. Upload Manifest (Optional)

1. Vào tab **"Knowledge"**
2. Upload file `public/manifest.json`
3. GPT sẽ hiểu rõ hơn về intents và keywords tiếng Việt

### 6. Test Custom GPT

#### Test cases:

**Test 1: Tìm sản phẩm**
```
User: Tìm cho tôi áo sơ mi trắng
Expected: Widget hiển thị list áo sơ mi trắng
```

**Test 2: Lọc sản phẩm**
```
User: Lọc sản phẩm công sở giá dưới 1 triệu
Expected: Widget list + filter info
```

**Test 3: So sánh**
```
User: Tìm áo sơ mi
GPT: [Hiển thị list]
User: So sánh sản phẩm 1 và 2
Expected: Widget compare với VS badge
```

**Test 4: Outfit**
```
User: Gợi ý outfit công sở
Expected: Widget outfit với 2-3 sản phẩm + tổng giá
```

### 7. Publish GPT

1. Click **"Save"** ở góc trên bên phải
2. Chọn visibility:
   - **Only me**: Chỉ bạn dùng
   - **Anyone with a link**: Share link
   - **Public**: Publish lên GPT Store

3. Click **"Confirm"**

### 8. Share & Monitor

**Lấy link share:**
```
https://chat.openai.com/g/g-XXXXX-ivy-fashion-assistant
```

**Monitor usage:**
- Vercel Analytics: https://vercel.com/dashboard/analytics
- Vercel Logs: https://vercel.com/dashboard/logs

## 🔧 Troubleshooting

### Lỗi: "Failed to fetch schema"

**Nguyên nhân:** URL sai hoặc endpoint không hoạt động

**Giải pháp:**
1. Kiểm tra URL Vercel deployment
2. Test endpoint: `curl https://your-app.vercel.app/api/mcp-schema`
3. Kiểm tra CORS settings

### Lỗi: Widget không hiển thị

**Nguyên nhân:** Path widget sai hoặc assetPrefix không đúng

**Giải pháp:**
1. Kiểm tra `next.config.js` có đúng `assetPrefix`
2. Widget paths phải bắt đầu bằng `ui://widget/`
3. Check Vercel build logs

### Lỗi: Tools không được gọi

**Nguyên nhân:** Schema không đúng hoặc GPT instructions chưa rõ

**Giải pháp:**
1. Re-import schema
2. Cải thiện GPT instructions với context rõ ràng hơn
3. Thêm examples trong schema descriptions

### Lỗi: CORS issues

**Giải pháp:** Thêm vào `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
      ],
    },
  ];
}
```

## 📊 Monitoring & Analytics

### Vercel Analytics
```bash
# Install analytics package
npm install @vercel/analytics

# Add to pages/_app.tsx
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

### Custom Logging

Thêm logging vào `mcp/route.ts`:
```typescript
server.registerTool("findProducts", {...}, async (params) => {
  console.log('[MCP] findProducts called with:', params);
  const products = await fetchIVYProducts(params);
  console.log('[MCP] Found products:', products.length);
  return { ... };
});
```

View logs: `vercel logs your-deployment-url`

## 🎉 Done!

Bạn đã deploy thành công IVY Fashion ChatGPT App!

**Next steps:**
- Share link với team để test
- Thu thập feedback
- Iterate và improve
- Monitor analytics

**Need help?**
- Vercel Docs: https://vercel.com/docs
- ChatGPT GPTs Docs: https://platform.openai.com/docs/guides/gpts
- MCP Docs: https://modelcontextprotocol.io

---

**Happy deploying! 🚀**
