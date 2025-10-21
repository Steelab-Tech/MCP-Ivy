import type { NextApiRequest, NextApiResponse } from 'next';
import { recommendOutfit } from '../../../lib/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, occasion, baseProductId } = req.body;

    const result = await recommendOutfit({
      style,
      occasion,
      baseProductId
    });

    return res.status(200).json({
      structuredContent: {
        outfit: result.outfit,
        recommendation: result.recommendation,
        totalPrice: result.totalPrice,
        mode: "outfit"
      },
      content: [
        {
          type: "text",
          text: `${result.recommendation}\n\nGợi ý outfit gồm ${result.outfit.length} món đồ, tổng giá trị: ${result.totalPrice.toLocaleString()}đ`
        }
      ]
    });
  } catch (error) {
    console.error('Error in outfitRecommend:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
