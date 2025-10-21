import type { NextApiRequest, NextApiResponse } from 'next';
import { compareProducts } from '../../../lib/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length !== 2) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'productIds must be an array with exactly 2 product IDs'
      });
    }

    const result = await compareProducts(productIds);

    return res.status(200).json({
      structuredContent: {
        products: result.products,
        comparison: result.comparison,
        mode: "compare"
      },
      content: [
        {
          type: "text",
          text: `Đây là so sánh giữa 2 sản phẩm:\n\n**Điểm chung:**\n${result.comparison.commonFeatures.map(f => `- ${f}`).join("\n")}\n\n**Khác biệt:**\n${result.comparison.differences.map(d => `- ${d}`).join("\n")}`
        }
      ]
    });
  } catch (error) {
    console.error('Error in compareProducts:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
