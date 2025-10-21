export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  color?: string;
  size?: string[];
  style?: string;
  category?: string;
  detailUrl: string;
  description?: string;
};

// Mock database với nhiều sản phẩm đa dạng
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Áo sơ mi trắng tay dài",
    image: "https://ivymoda.vn/images/ao1.jpg",
    price: 890000,
    color: "trắng",
    size: ["S", "M", "L", "XL"],
    style: "công sở",
    category: "áo sơ mi",
    detailUrl: "https://ivymoda.com/product/ao-so-mi-trang-tay-dai",
    description: "Áo sơ mi trắng form fitted, phù hợp cho công sở"
  },
  {
    id: "2",
    name: "Áo sơ mi trắng basic",
    image: "https://ivymoda.vn/images/ao2.jpg",
    price: 760000,
    color: "trắng",
    size: ["S", "M", "L"],
    style: "tối giản",
    category: "áo sơ mi",
    detailUrl: "https://ivymoda.com/product/ao-so-mi-basic",
    description: "Áo sơ mi basic, dễ phối đồ"
  },
  {
    id: "3",
    name: "Áo sơ mi đen tay ngắn",
    image: "https://ivymoda.vn/images/ao3.jpg",
    price: 790000,
    color: "đen",
    size: ["M", "L", "XL"],
    style: "năng động",
    category: "áo sơ mi",
    detailUrl: "https://ivymoda.com/product/ao-so-mi-den-tay-ngan",
    description: "Áo sơ mi đen tay ngắn, phong cách trẻ trung"
  },
  {
    id: "4",
    name: "Váy công sở đen midi",
    image: "https://ivymoda.vn/images/vay1.jpg",
    price: 1200000,
    color: "đen",
    size: ["S", "M", "L"],
    style: "công sở",
    category: "váy",
    detailUrl: "https://ivymoda.com/product/vay-cong-so-den-midi",
    description: "Váy công sở dáng midi thanh lịch"
  },
  {
    id: "5",
    name: "Váy xòe hoa nhí",
    image: "https://ivymoda.vn/images/vay2.jpg",
    price: 980000,
    color: "hoa",
    size: ["S", "M"],
    style: "nữ tính",
    category: "váy",
    detailUrl: "https://ivymoda.com/product/vay-xoe-hoa-nhi",
    description: "Váy xòe họa tiết hoa nhí dịu dàng"
  },
  {
    id: "6",
    name: "Quần âu xám công sở",
    image: "https://ivymoda.vn/images/quan1.jpg",
    price: 950000,
    color: "xám",
    size: ["S", "M", "L", "XL"],
    style: "công sở",
    category: "quần",
    detailUrl: "https://ivymoda.com/product/quan-au-xam-cong-so",
    description: "Quần âu xám form đẹp, chất liệu cao cấp"
  },
  {
    id: "7",
    name: "Quần jeans xanh skinny",
    image: "https://ivymoda.vn/images/quan2.jpg",
    price: 850000,
    color: "xanh",
    size: ["S", "M", "L"],
    style: "năng động",
    category: "quần",
    detailUrl: "https://ivymoda.com/product/quan-jeans-xanh-skinny",
    description: "Quần jeans form skinny tôn dáng"
  },
  {
    id: "8",
    name: "Blazer đen cổ điển",
    image: "https://ivymoda.vn/images/blazer1.jpg",
    price: 1500000,
    color: "đen",
    size: ["S", "M", "L", "XL"],
    style: "công sở",
    category: "áo khoác",
    detailUrl: "https://ivymoda.com/product/blazer-den-co-dien",
    description: "Blazer đen lịch lãm cho công sở"
  },
  {
    id: "9",
    name: "Áo thun trắng cổ tròn",
    image: "https://ivymoda.vn/images/thun1.jpg",
    price: 450000,
    color: "trắng",
    size: ["S", "M", "L", "XL"],
    style: "tối giản",
    category: "áo thun",
    detailUrl: "https://ivymoda.com/product/ao-thun-trang-co-tron",
    description: "Áo thun basic trắng tinh, dễ phối"
  },
  {
    id: "10",
    name: "Đầm công sở xanh navy",
    image: "https://ivymoda.vn/images/dam1.jpg",
    price: 1350000,
    color: "xanh navy",
    size: ["S", "M", "L"],
    style: "công sở",
    category: "đầm",
    detailUrl: "https://ivymoda.com/product/dam-cong-so-xanh-navy",
    description: "Đầm công sở xanh navy thanh lịch"
  }
];

// Hàm tìm sản phẩm
export async function fetchIVYProducts(params: {
  category?: string;
  color?: string;
  style?: string;
  size?: string;
}): Promise<Product[]> {
  const { category, color, style, size } = params;
  let filtered = mockProducts;

  if (category) {
    filtered = filtered.filter((p) =>
      p.category?.toLowerCase().includes(category.toLowerCase()) ||
      p.name.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (color) {
    filtered = filtered.filter((p) =>
      p.color?.toLowerCase().includes(color.toLowerCase()) ||
      p.name.toLowerCase().includes(color.toLowerCase())
    );
  }

  if (style) {
    filtered = filtered.filter((p) =>
      p.style?.toLowerCase().includes(style.toLowerCase())
    );
  }

  if (size) {
    filtered = filtered.filter((p) =>
      p.size?.some(s => s.toLowerCase() === size.toLowerCase())
    );
  }

  return filtered;
}

// Hàm lọc sản phẩm với nhiều filter
export async function filterProducts(params: {
  colors?: string[];
  sizes?: string[];
  styles?: string[];
  priceMin?: number;
  priceMax?: number;
  categories?: string[];
}): Promise<Product[]> {
  const { colors, sizes, styles, priceMin, priceMax, categories } = params;
  let filtered = mockProducts;

  if (colors && colors.length > 0) {
    filtered = filtered.filter((p) =>
      colors.some(c => p.color?.toLowerCase().includes(c.toLowerCase()))
    );
  }

  if (sizes && sizes.length > 0) {
    filtered = filtered.filter((p) =>
      p.size?.some(s => sizes.includes(s.toUpperCase()))
    );
  }

  if (styles && styles.length > 0) {
    filtered = filtered.filter((p) =>
      styles.some(st => p.style?.toLowerCase().includes(st.toLowerCase()))
    );
  }

  if (priceMin !== undefined) {
    filtered = filtered.filter((p) => p.price >= priceMin);
  }

  if (priceMax !== undefined) {
    filtered = filtered.filter((p) => p.price <= priceMax);
  }

  if (categories && categories.length > 0) {
    filtered = filtered.filter((p) =>
      categories.some(cat => p.category?.toLowerCase().includes(cat.toLowerCase()))
    );
  }

  return filtered;
}

// Hàm so sánh 2 sản phẩm
export async function compareProducts(productIds: string[]): Promise<{
  products: Product[];
  comparison: {
    priceDiff: number;
    commonFeatures: string[];
    differences: string[];
  };
}> {
  if (productIds.length !== 2) {
    throw new Error("Cần đúng 2 sản phẩm để so sánh");
  }

  const products = mockProducts.filter(p => productIds.includes(p.id));

  if (products.length !== 2) {
    throw new Error("Không tìm thấy đủ 2 sản phẩm");
  }

  const [p1, p2] = products;
  const priceDiff = Math.abs(p1.price - p2.price);

  const commonFeatures: string[] = [];
  const differences: string[] = [];

  // So sánh màu sắc
  if (p1.color === p2.color) {
    commonFeatures.push(`Cùng màu ${p1.color}`);
  } else {
    differences.push(`Màu sắc: ${p1.name} (${p1.color}) vs ${p2.name} (${p2.color})`);
  }

  // So sánh style
  if (p1.style === p2.style) {
    commonFeatures.push(`Cùng phong cách ${p1.style}`);
  } else {
    differences.push(`Phong cách: ${p1.style} vs ${p2.style}`);
  }

  // So sánh giá
  differences.push(`Chênh lệch giá: ${priceDiff.toLocaleString()}đ`);

  return {
    products,
    comparison: {
      priceDiff,
      commonFeatures,
      differences
    }
  };
}

// Hàm gợi ý outfit
export async function recommendOutfit(params: {
  style?: string;
  occasion?: string;
  baseProductId?: string;
}): Promise<{
  outfit: Product[];
  recommendation: string;
  totalPrice: number;
}> {
  const { style, occasion, baseProductId } = params;

  let selectedStyle = style || "công sở";
  let baseProduct: Product | undefined;

  // Nếu có sản phẩm gốc, lấy style của nó
  if (baseProductId) {
    baseProduct = mockProducts.find(p => p.id === baseProductId);
    if (baseProduct && baseProduct.style) {
      selectedStyle = baseProduct.style;
    }
  }

  // Logic gợi ý outfit theo style
  let outfit: Product[] = [];

  if (selectedStyle === "công sở" || occasion === "đi làm") {
    // Outfit công sở: áo sơ mi + quần âu/váy + blazer
    const shirt = mockProducts.find(p => p.category === "áo sơ mi" && p.style === "công sở");
    const bottom = mockProducts.find(p => (p.category === "quần" || p.category === "váy") && p.style === "công sở");
    const blazer = mockProducts.find(p => p.category === "áo khoác" && p.style === "công sở");

    outfit = [shirt, bottom, blazer].filter(Boolean) as Product[];
  } else if (selectedStyle === "tối giản") {
    // Outfit tối giản: áo thun + quần jeans + áo sơ mi
    const tshirt = mockProducts.find(p => p.category === "áo thun" && p.style === "tối giản");
    const jeans = mockProducts.find(p => p.category === "quần" && p.color?.includes("xanh"));
    const shirt = mockProducts.find(p => p.category === "áo sơ mi" && p.style === "tối giản");

    outfit = [tshirt, jeans, shirt].filter(Boolean) as Product[];
  } else if (selectedStyle === "nữ tính") {
    // Outfit nữ tính: váy + áo thun
    const dress = mockProducts.find(p => p.category === "váy" && p.style === "nữ tính");
    const shirt = mockProducts.find(p => p.category === "áo sơ mi" && p.color === "trắng");

    outfit = [dress, shirt].filter(Boolean) as Product[];
  } else {
    // Mặc định: lấy 3 sản phẩm random theo style
    outfit = mockProducts
      .filter(p => p.style === selectedStyle)
      .slice(0, 3);
  }

  // Nếu có baseProduct, đảm bảo nó có trong outfit
  if (baseProduct && !outfit.find(p => p.id === baseProduct.id)) {
    outfit = [baseProduct, ...outfit.slice(0, 2)];
  }

  const totalPrice = outfit.reduce((sum, p) => sum + p.price, 0);

  let recommendation = "";
  if (selectedStyle === "công sở") {
    recommendation = "Outfit hoàn hảo cho môi trường công sở chuyên nghiệp, lịch sự và thanh lịch.";
  } else if (selectedStyle === "tối giản") {
    recommendation = "Set đồ tối giản, dễ phối, phù hợp cho nhiều dịp khác nhau.";
  } else if (selectedStyle === "nữ tính") {
    recommendation = "Outfit nữ tính, dịu dàng, phù hợp cho buổi hẹn hoặc dạo phố.";
  } else {
    recommendation = `Gợi ý outfit theo phong cách ${selectedStyle}.`;
  }

  return {
    outfit,
    recommendation,
    totalPrice
  };
}

// Hàm lấy chi tiết sản phẩm theo ID
export async function getProductById(id: string): Promise<Product | null> {
  return mockProducts.find(p => p.id === id) || null;
}

// Hàm lấy sản phẩm tương tự
export async function getSimilarProducts(productId: string, limit: number = 3): Promise<Product[]> {
  const product = await getProductById(productId);
  if (!product) return [];

  return mockProducts
    .filter(p =>
      p.id !== productId &&
      (p.style === product.style || p.category === product.category || p.color === product.color)
    )
    .slice(0, limit);
}
