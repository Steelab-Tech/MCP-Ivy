# 🧪 Test Examples - IVY Fashion ChatGPT App

## Local Testing (Before Deployment)

### 1. Test API Functions

```bash
# Start dev server
npm run dev
```

Mở browser console và test:

```javascript
// Test trong browser console tại http://localhost:3000

// Import API functions (chỉ để test logic)
// Thực tế trong production sẽ gọi qua MCP tools

// Test data
const testProduct1 = {
  id: "1",
  name: "Áo sơ mi trắng tay dài",
  price: 890000,
  color: "trắng"
};

// Test findProducts
fetch('/api/test-find', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ category: "áo sơ mi", color: "trắng" })
}).then(r => r.json()).then(console.log);
```

### 2. Test Widgets Directly

Truy cập các URL sau trong browser:

```
http://localhost:3000/widget/product-list.html
http://localhost:3000/widget/product-compare.html
http://localhost:3000/widget/outfit.html
```

**Note:** Widgets cần `window.openai.toolOutput` object. Để test local, thêm mock data:

```html
<!-- Thêm vào đầu widget -->
<script>
if (!window.openai) {
  window.openai = {
    toolOutput: {
      structuredContent: {
        products: [
          {
            id: "1",
            name: "Áo sơ mi trắng test",
            image: "https://via.placeholder.com/400",
            price: 890000,
            color: "trắng",
            size: ["S", "M", "L"],
            style: "công sở",
            category: "áo sơ mi",
            detailUrl: "https://ivymoda.com",
            description: "Test product"
          }
        ],
        mode: "list"
      }
    },
    openExternal: (url) => console.log('Open:', url)
  };
}
</script>
```

---

## ChatGPT Testing (After Deployment)

### Test Scenarios với Tiếng Việt

#### Scenario 1: Tìm kiếm cơ bản

**Input:**
```
Tìm cho tôi áo sơ mi trắng
```

**Expected:**
- GPT gọi tool `findProducts` với params: `{ category: "áo sơ mi", color: "trắng" }`
- Widget product-list hiển thị
- Hiển thị 2 sản phẩm: "Áo sơ mi trắng tay dài" và "Áo sơ mi trắng basic"
- Images load
- Prices: 890,000đ và 760,000đ

**Verification:**
- [ ] Widget renders
- [ ] Images visible
- [ ] Prices formatted với dấu phẩy
- [ ] Tags hiển thị (công sở, tối giản)
- [ ] Sizes (S, M, L, XL)
- [ ] CTA button clickable

---

#### Scenario 2: Lọc theo nhiều tiêu chí

**Input:**
```
Lọc sản phẩm công sở màu đen, size M, giá dưới 1 triệu 200
```

**Expected:**
- GPT gọi tool `filterProducts` với:
  ```json
  {
    "colors": ["đen"],
    "sizes": ["M"],
    "styles": ["công sở"],
    "priceMax": 1200000
  }
  ```
- Widget hiển thị filtered products
- Filter info: "màu đen, style công sở, giá 0đ - 1,200,000đ"

**Verification:**
- [ ] Filter applied correctly
- [ ] Kết quả: Áo sơ mi đen (790k), Váy công sở đen (1.2M)
- [ ] Filter info header hiển thị
- [ ] Không có sản phẩm nào >1.2M

---

#### Scenario 3: So sánh sản phẩm

**Input 1:**
```
Tìm cho tôi áo sơ mi
```

**GPT Response:**
Widget hiển thị list áo sơ mi

**Input 2:**
```
So sánh sản phẩm 1 và sản phẩm 2
```

**Expected:**
- GPT extract IDs: ["1", "2"]
- Gọi tool `compareProducts` với `{ productIds: ["1", "2"] }`
- Widget product-compare hiển thị
- Side-by-side layout
- VS badge ở giữa
- Comparison summary:
  - **Điểm chung:** Cùng màu trắng, Cùng danh mục áo sơ mi
  - **Khác biệt:** Phong cách: công sở vs tối giản, Chênh lệch giá: 130,000đ

**Verification:**
- [ ] 2 products side-by-side
- [ ] VS badge visible
- [ ] Common features với ✓
- [ ] Differences với ↔
- [ ] Price diff: 130,000đ
- [ ] Both CTA buttons work

---

#### Scenario 4: Gợi ý outfit

**Input:**
```
Gợi ý cho tôi outfit công sở
```

**Expected:**
- GPT gọi tool `outfitRecommend` với `{ style: "công sở" }`
- Widget outfit hiển thị
- Outfit gồm:
  1. Áo sơ mi trắng tay dài (890k)
  2. Váy công sở đen midi (1.2M)
  3. Blazer đen cổ điển (1.5M)
- Recommendation: "Outfit hoàn hảo cho môi trường công sở..."
- Total price: 3,590,000đ

**Verification:**
- [ ] Gradient background
- [ ] 3 items với numbers (1, 2, 3)
- [ ] Images load
- [ ] Individual prices
- [ ] Total price highlighted
- [ ] Recommendation text
- [ ] CTA section với 2 buttons

---

#### Scenario 5: Gợi ý outfit theo dịp

**Input:**
```
Mặc gì đi hẹn hò vậy?
```

**Expected:**
- GPT interpret occasion = "hẹn hò" hoặc style = "nữ tính"
- Gọi tool `outfitRecommend` với `{ style: "nữ tính", occasion: "hẹn hò" }`
- Widget outfit với style nữ tính (váy xòe hoa, áo sơ mi trắng)

---

#### Scenario 6: Context-aware conversation

**Conversation:**
```
User: Tìm váy công sở
GPT: [Shows list với váy]

User: Có màu nào khác không?
GPT: [Gọi lại findProducts hoặc filterProducts với colors khác]

User: Cái đầu tiên với cái thứ hai khác nhau như thế nào?
GPT: [Gọi compareProducts với IDs từ list trước]

User: Phối váy đầu tiên với gì?
GPT: [Gọi outfitRecommend với baseProductId của váy]
```

---

### Edge Cases Testing

#### Edge Case 1: Không tìm thấy sản phẩm

**Input:**
```
Tìm áo khoác màu tím
```

**Expected:**
- Empty products array
- Widget hiển thị empty state
- Icon 🔍
- Text: "Không tìm thấy sản phẩm phù hợp"

---

#### Edge Case 2: So sánh không đủ IDs

**Input:**
```
So sánh sản phẩm 1
```

**Expected:**
- Error: "Cần đúng 2 sản phẩm để so sánh"
- GPT respond: "Bạn cần chọn 2 sản phẩm để so sánh..."

---

#### Edge Case 3: Filter quá strict

**Input:**
```
Lọc sản phẩm màu hồng neon size XXL giá dưới 100k
```

**Expected:**
- Empty results
- Widget empty state
- GPT suggest: "Không tìm thấy sản phẩm. Bạn có muốn nới lỏng điều kiện?"

---

### Performance Testing

#### Test 1: Response Time

```bash
# Test API response time
time curl -X POST https://your-app.vercel.app/api/mcp/findProducts \
  -H "Content-Type: application/json" \
  -d '{"category":"áo sơ mi"}'

# Expected: < 500ms
```

#### Test 2: Widget Load Time

```javascript
// Trong browser console
performance.mark('widget-start');
// Load widget
performance.mark('widget-end');
performance.measure('widget-load', 'widget-start', 'widget-end');
console.log(performance.getEntriesByName('widget-load'));

// Expected: < 1s for first load
```

#### Test 3: Concurrent Requests

```bash
# Sử dụng Apache Bench hoặc similar tool
ab -n 100 -c 10 https://your-app.vercel.app/api/mcp/findProducts

# Expected: Tất cả requests succeed, avg response < 1s
```

---

### Mobile Testing

#### Devices to test:
- [ ] iPhone 14 Pro (iOS Safari)
- [ ] iPhone SE (small screen)
- [ ] Samsung Galaxy S21 (Chrome Android)
- [ ] iPad Pro (tablet view)

#### What to verify:
- [ ] Grid responsive (1 column on mobile)
- [ ] Touch targets (buttons) đủ lớn (min 44px)
- [ ] Text readable (no need to zoom)
- [ ] Images scale properly
- [ ] CTA buttons full-width on mobile
- [ ] No horizontal scroll
- [ ] Smooth scrolling

---

### Browser Compatibility

Test trên các browsers:
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader compatible (alt text)
- [ ] Color contrast sufficient (WCAG AA)
- [ ] Focus indicators visible
- [ ] No flashing elements

**Tools:**
- Chrome Lighthouse
- WAVE Extension
- axe DevTools

---

## Automated Testing (Optional)

### Unit Tests (Jest)

```javascript
// lib/api.test.ts
import { fetchIVYProducts, filterProducts, compareProducts } from './api';

describe('fetchIVYProducts', () => {
  it('should return products by category', async () => {
    const result = await fetchIVYProducts({ category: 'áo sơ mi' });
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].category).toBe('áo sơ mi');
  });

  it('should filter by color', async () => {
    const result = await fetchIVYProducts({ color: 'trắng' });
    result.forEach(p => {
      expect(p.color).toContain('trắng');
    });
  });
});

describe('compareProducts', () => {
  it('should compare 2 products', async () => {
    const result = await compareProducts(['1', '2']);
    expect(result.products.length).toBe(2);
    expect(result.comparison.priceDiff).toBeGreaterThan(0);
  });

  it('should throw error if not 2 IDs', async () => {
    await expect(compareProducts(['1'])).rejects.toThrow();
  });
});
```

### Integration Tests (Playwright/Cypress)

```javascript
// e2e/chatgpt.spec.js
describe('ChatGPT Integration', () => {
  it('should display widget on findProducts', () => {
    // Mock ChatGPT environment
    cy.visit('/widget/product-list.html');
    cy.window().then((win) => {
      win.openai = {
        toolOutput: {
          structuredContent: { products: mockProducts }
        }
      };
    });
    cy.get('.card').should('have.length.at.least', 1);
  });
});
```

---

## Test Data

### Mock Products for Testing

```javascript
const testProducts = [
  {
    id: "test-1",
    name: "Test Áo Sơ Mi",
    image: "https://via.placeholder.com/400",
    price: 500000,
    color: "trắng",
    size: ["S", "M"],
    style: "công sở",
    category: "áo sơ mi",
    detailUrl: "https://example.com",
    description: "Test product"
  }
];
```

---

## Monitoring & Logging

### What to log:

```typescript
// Trong mcp/route.ts
server.registerTool("findProducts", {...}, async (params) => {
  console.log('[MCP] findProducts called', {
    timestamp: new Date().toISOString(),
    params,
    requestId: generateId()
  });

  const products = await fetchIVYProducts(params);

  console.log('[MCP] findProducts result', {
    count: products.length,
    requestId
  });

  return { ... };
});
```

### View logs:

```bash
# Vercel logs
vercel logs --follow

# Filter by function
vercel logs --filter "findProducts"
```

---

## Success Criteria

### Functional Requirements
- [x] All 4 tools work correctly
- [x] Widgets render beautifully
- [x] Deep links open external browser
- [x] Responsive on all devices
- [x] Vietnamese text displays correctly
- [x] Empty states handle gracefully
- [x] Errors show friendly messages

### Performance Requirements
- [ ] API response < 500ms (p95)
- [ ] Widget render < 1s
- [ ] No memory leaks
- [ ] Works offline (cached widgets)

### User Experience
- [ ] Intuitive UI
- [ ] Fast interactions
- [ ] No unexpected behaviors
- [ ] Clear error messages
- [ ] Smooth animations

---

**Happy Testing! 🧪**
