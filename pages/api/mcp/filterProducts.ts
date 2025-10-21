import type { NextApiRequest, NextApiResponse } from 'next';
import { filterProducts } from '../../../lib/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { colors, sizes, styles, priceMin, priceMax, categories } = req.body;

    const products = await filterProducts({
      colors,
      sizes,
      styles,
      priceMin,
      priceMax,
      categories
    });

    const filterInfo = [];
    if (colors) filterInfo.push(`màu ${colors.join(", ")}`);
    if (styles) filterInfo.push(`style ${styles.join(", ")}`);
    if (priceMin || priceMax) {
      filterInfo.push(`giá ${priceMin?.toLocaleString() || "0"}đ - ${priceMax?.toLocaleString() || "∞"}đ`);
    }

    return res.status(200).json({
      structuredContent: {
        products,
        mode: "list",
        filterApplied: filterInfo.join(", ")
      },
      content: [
        {
          type: "text",
          text: `Tìm thấy ${products.length} sản phẩm phù hợp với bộ lọc: ${filterInfo.join(", ")}`
        }
      ]
    });
  } catch (error) {
    console.error('Error in filterProducts:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
