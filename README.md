# IVY Fashion ChatGPT App 👗

Ứng dụng trợ lý thời trang IVY chạy trong ChatGPT sử dụng Model Context Protocol (MCP) và Next.js.

## 🎯 Tính năng

### 1. **Tìm sản phẩm** (`findProducts`)
- Tìm kiếm sản phẩm theo danh mục, màu sắc, style, size
- Hiển thị grid sản phẩm với hình ảnh, giá, thông tin chi tiết
- Deep link đến trang sản phẩm trên IVY MODA

### 2. **Lọc sản phẩm nâng cao** (`filterProducts`)
- Lọc theo nhiều tiêu chí: màu sắc, size, style, khoảng giá
- Hỗ trợ multi-select (chọn nhiều màu, nhiều size cùng lúc)
- Hiển thị bộ lọc đã áp dụng

### 3. **So sánh sản phẩm** (`compareProducts`)
- So sánh chi tiết 2 sản phẩm side-by-side
- Phân tích điểm chung và khác biệt
- Tính chênh lệch giá
- UI đẹp với badge "VS"

### 4. **Gợi ý Outfit** (`outfitRecommend`)
- Gợi ý set đồ hoàn chỉnh (2-3 sản phẩm)
- Dựa trên phong cách, dịp sử dụng hoặc sản phẩm base
- Hiển thị tổng giá trị outfit
- UI gradient đẹp mắt với numbering

## 📦 Cấu trúc Project

```
ivy-chatgpt-demo/
├── lib/
│   └── api.ts                 # Mock API & business logic
├── mcp/
│   └── route.ts               # MCP tools registration
├── widget/
│   ├── product-list.html      # Widget danh sách sản phẩm
│   ├── product-compare.html   # Widget so sánh sản phẩm
│   └── outfit.html            # Widget gợi ý outfit
├── pages/
│   └── index.tsx              # Landing page
├── public/
│   └── manifest.json          # Metadata cho ChatGPT
├── next.config.js             # Next.js config
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Deploy lên Vercel

### Bước 1: Cài đặt dependencies

```bash
npm install
```

### Bước 2: Test local

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem.

### Bước 3: Deploy lên Vercel

#### Option A: Deploy qua Vercel CLI

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Login vào Vercel
vercel login

# Deploy
vercel
```

#### Option B: Deploy qua Vercel Dashboard

1. Truy cập [vercel.com](https://vercel.com)
2. Import project từ GitHub
3. Vercel sẽ tự động detect Next.js và deploy

### Bước 4: Lấy URL deploy

Sau khi deploy, bạn sẽ có URL dạng:
```
https://ivy-chatgpt-demo.vercel.app
```

## 🔗 Tích hợp với ChatGPT

### Bước 1: Tạo Custom GPT

1. Truy cập [chat.openai.com](https://chat.openai.com)
2. Vào **Settings** → **Builder** → **Create a GPT**
3. Nhập thông tin:
   - **Name**: IVY Fashion Assistant
   - **Description**: Trợ lý thời trang IVY - Gợi ý sản phẩm và outfit
   - **Instructions**:
     ```
     Bạn là trợ lý thời trang IVY MODA, giúp người dùng tìm kiếm sản phẩm,
     lọc theo tiêu chí, so sánh sản phẩm, và gợi ý outfit hoàn chỉnh.

     Sử dụng các tools:
     - findProducts: Tìm sản phẩm cơ bản
     - filterProducts: Lọc nâng cao theo nhiều tiêu chí
     - compareProducts: So sánh 2 sản phẩm
     - outfitRecommend: Gợi ý outfit hoàn chỉnh

     Luôn giao tiếp bằng tiếng Việt thân thiện, chuyên nghiệp.
     ```

### Bước 2: Cấu hình MCP

1. Trong GPT Builder, vào **Configure** → **Actions**
2. Import schema từ: `https://your-vercel-app.vercel.app/mcp/schema`
3. Hoặc thêm manual:

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "IVY Fashion MCP",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://your-vercel-app.vercel.app"
    }
  ],
  "paths": {
    "/mcp/findProducts": {
      "post": {
        "summary": "Tìm sản phẩm",
        "operationId": "findProducts",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "category": { "type": "string" },
                  "color": { "type": "string" },
                  "style": { "type": "string" },
                  "size": { "type": "string" }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### Bước 3: Upload manifest.json

1. Upload file `public/manifest.json` vào GPT
2. File này chứa metadata về intents, keywords tiếng Việt

## 🧪 Test trong ChatGPT

Sau khi setup xong, test các câu lệnh:

### Tìm sản phẩm
```
- Tìm cho tôi áo sơ mi trắng
- Có váy công sở nào không?
- Gợi ý quần âu màu xám
```

### Lọc sản phẩm
```
- Lọc sản phẩm công sở giá dưới 1 triệu
- Tìm đồ màu đen size M, L
- Sản phẩm tối giản từ 500k đến 1 triệu
```

### So sánh sản phẩm
```
- So sánh 2 áo sơ mi này (sau khi hiển thị list)
- Khác biệt giữa áo 1 và áo 2
```

### Gợi ý outfit
```
- Gợi ý outfit công sở
- Phối đồ đi làm
- Set đồ tối giản
- Mặc gì để đi hẹn hò?
```

## 🎨 Widgets UI

### Product List
- Responsive grid layout
- Hover effects
- Tags cho style, color
- Size badges
- Deep link CTA button
- Empty state

### Product Compare
- Side-by-side layout
- VS badge ở giữa
- Comparison summary với icons
- Price difference highlight
- Common features (✓) & differences (↔)

### Outfit Recommendation
- Gradient background
- Numbered items (1, 2, 3)
- Total price display
- CTA section "Mua ngay" / "Khám phá thêm"
- Responsive cho mobile

## 📱 Deep Link Integration

Tất cả widgets đều tích hợp `window.openai.openExternal()`:

```javascript
function openDetail(url) {
  if (window.openai && window.openai.openExternal) {
    window.openai.openExternal(url);
  } else {
    window.open(url, '_blank');
  }
}
```

Khi user click CTA, app sẽ:
1. Mở trình duyệt external nếu trong ChatGPT
2. Fallback sang `window.open()` nếu test local

## 🔧 Customization

### Thêm sản phẩm mock

Edit `lib/api.ts`:

```typescript
const mockProducts: Product[] = [
  {
    id: "11",
    name: "Áo blazer xanh navy",
    image: "https://ivymoda.vn/images/blazer2.jpg",
    price: 1650000,
    color: "xanh navy",
    size: ["S", "M", "L"],
    style: "công sở",
    category: "áo khoác",
    detailUrl: "https://ivymoda.com/product/blazer-xanh-navy",
    description: "Blazer xanh navy thanh lịch"
  },
  // ... thêm sản phẩm khác
];
```

### Thay đổi style widgets

Edit các file `.html` trong `widget/`:
- `product-list.html` → Grid layout, colors, fonts
- `product-compare.html` → Comparison UI
- `outfit.html` → Gradient, spacing

### Tùy chỉnh intents

Edit `public/manifest.json`:
- Thêm keywords tiếng Việt
- Thêm phrases patterns
- Cập nhật contextual info

## 📚 Tài liệu tham khảo

- [Vercel Blog: Running Next.js inside ChatGPT](https://vercel.com/blog/running-next-js-inside-chatgpt-a-deep-dive-into-native-app-integration)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Next.js Documentation](https://nextjs.org/docs)
- [ChatGPT Custom GPTs](https://platform.openai.com/docs/guides/gpts)

## 🤝 Contributing

Contributions welcome! Feel free to open issues or PRs.

## 📄 License

MIT License

---

**Made with ❤️ for IVY MODA**
