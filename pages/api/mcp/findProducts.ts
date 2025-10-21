import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchIVYProducts } from '../../../lib/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category, color, style, size } = req.body;

    const products = await fetchIVYProducts({
      category,
      color,
      style,
      size
    });

    return res.status(200).json({
      structuredContent: {
        products,
        mode: "list"
      },
      content: [
        {
          type: "text",
          text: `Mình tìm được ${products.length} sản phẩm phù hợp với yêu cầu của bạn:`
        }
      ]
    });
  } catch (error) {
    console.error('Error in findProducts:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
