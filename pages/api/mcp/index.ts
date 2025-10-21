import type { NextApiRequest, NextApiResponse } from 'next';
import {
  fetchIVYProducts,
  filterProducts,
  compareProducts,
  recommendOutfit,
} from '../../../lib/api';

// MCP Protocol handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Return MCP server info
    return res.status(200).json({
      protocol: "mcp/1.0",
      name: "ivy-fashion-mcp",
      version: "1.0.0",
      capabilities: {
        tools: {
          list: true,
          call: true,
        },
      },
      tools: [
        {
          name: "findProducts",
          description: "Tìm kiếm sản phẩm thời trang IVY theo danh mục, màu sắc, style, size",
          inputSchema: {
            type: "object",
            properties: {
              category: { type: "string", description: "Danh mục sản phẩm" },
              color: { type: "string", description: "Màu sắc" },
              style: { type: "string", description: "Phong cách" },
              size: { type: "string", description: "Kích thước" },
            },
          },
        },
        {
          name: "filterProducts",
          description: "Lọc sản phẩm theo nhiều tiêu chí",
          inputSchema: {
            type: "object",
            properties: {
              colors: { type: "array", items: { type: "string" } },
              sizes: { type: "array", items: { type: "string" } },
              styles: { type: "array", items: { type: "string" } },
              priceMin: { type: "number" },
              priceMax: { type: "number" },
              categories: { type: "array", items: { type: "string" } },
            },
          },
        },
        {
          name: "compareProducts",
          description: "So sánh 2 sản phẩm",
          inputSchema: {
            type: "object",
            properties: {
              productIds: {
                type: "array",
                items: { type: "string" },
                minItems: 2,
                maxItems: 2,
              },
            },
            required: ["productIds"],
          },
        },
        {
          name: "outfitRecommend",
          description: "Gợi ý outfit hoàn chỉnh",
          inputSchema: {
            type: "object",
            properties: {
              style: { type: "string" },
              occasion: { type: "string" },
              baseProductId: { type: "string" },
            },
          },
        },
      ],
    });
  }

  if (req.method === 'POST') {
    const { method, params } = req.body;

    if (method === 'tools/list') {
      return res.status(200).json({
        tools: [
          {
            name: "findProducts",
            description: "Tìm kiếm sản phẩm thời trang IVY",
            inputSchema: {
              type: "object",
              properties: {
                category: { type: "string" },
                color: { type: "string" },
                style: { type: "string" },
                size: { type: "string" },
              },
            },
          },
          {
            name: "filterProducts",
            description: "Lọc sản phẩm nâng cao",
            inputSchema: {
              type: "object",
              properties: {
                colors: { type: "array" },
                sizes: { type: "array" },
                styles: { type: "array" },
                priceMin: { type: "number" },
                priceMax: { type: "number" },
              },
            },
          },
          {
            name: "compareProducts",
            description: "So sánh 2 sản phẩm",
            inputSchema: {
              type: "object",
              properties: {
                productIds: { type: "array", minItems: 2, maxItems: 2 },
              },
              required: ["productIds"],
            },
          },
          {
            name: "outfitRecommend",
            description: "Gợi ý outfit",
            inputSchema: {
              type: "object",
              properties: {
                style: { type: "string" },
                occasion: { type: "string" },
                baseProductId: { type: "string" },
              },
            },
          },
        ],
      });
    }

    if (method === 'tools/call') {
      const { name, arguments: args } = params;

      try {
        switch (name) {
          case "findProducts": {
            const products = await fetchIVYProducts(args);
            return res.status(200).json({
              content: [
                {
                  type: "text",
                  text: `Tìm được ${products.length} sản phẩm phù hợp`,
                },
              ],
              structuredContent: {
                products,
                mode: "list",
              },
            });
          }

          case "filterProducts": {
            const products = await filterProducts(args);
            const filterInfo = [];
            if (args.colors) filterInfo.push(`màu ${args.colors.join(", ")}`);
            if (args.styles) filterInfo.push(`style ${args.styles.join(", ")}`);

            return res.status(200).json({
              content: [
                {
                  type: "text",
                  text: `Tìm thấy ${products.length} sản phẩm với bộ lọc: ${filterInfo.join(", ")}`,
                },
              ],
              structuredContent: {
                products,
                mode: "list",
                filterApplied: filterInfo.join(", "),
              },
            });
          }

          case "compareProducts": {
            if (!args.productIds || args.productIds.length !== 2) {
              throw new Error("Cần đúng 2 product IDs");
            }

            const result = await compareProducts(args.productIds);
            return res.status(200).json({
              content: [
                {
                  type: "text",
                  text: `So sánh 2 sản phẩm:\n${result.comparison.differences.join("\n")}`,
                },
              ],
              structuredContent: {
                products: result.products,
                comparison: result.comparison,
                mode: "compare",
              },
            });
          }

          case "outfitRecommend": {
            const result = await recommendOutfit(args);
            return res.status(200).json({
              content: [
                {
                  type: "text",
                  text: `${result.recommendation}\nGợi ý outfit gồm ${result.outfit.length} món đồ, tổng giá: ${result.totalPrice.toLocaleString()}đ`,
                },
              ],
              structuredContent: {
                outfit: result.outfit,
                recommendation: result.recommendation,
                totalPrice: result.totalPrice,
                mode: "outfit",
              },
            });
          }

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return res.status(500).json({
          error: {
            message: error instanceof Error ? error.message : "Unknown error",
          },
        });
      }
    }

    return res.status(400).json({ error: "Invalid method" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
