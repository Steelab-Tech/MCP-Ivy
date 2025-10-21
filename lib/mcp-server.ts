import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import {
  fetchIVYProducts,
  filterProducts,
  compareProducts,
  recommendOutfit,
} from "./api";

// Định nghĩa tools theo MCP format
const TOOLS: Tool[] = [
  {
    name: "findProducts",
    description: "Tìm kiếm sản phẩm thời trang IVY theo danh mục, màu sắc, style, size",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description: "Danh mục sản phẩm: áo sơ mi, váy, quần, đầm, áo khoác, áo thun",
        },
        color: {
          type: "string",
          description: "Màu sắc: trắng, đen, xám, xanh, hoa",
        },
        style: {
          type: "string",
          description: "Phong cách: công sở, tối giản, năng động, nữ tính",
        },
        size: {
          type: "string",
          description: "Kích thước: S, M, L, XL",
        },
      },
    },
  },
  {
    name: "filterProducts",
    description: "Lọc sản phẩm theo nhiều tiêu chí: màu sắc, kích thước, phong cách, khoảng giá",
    inputSchema: {
      type: "object",
      properties: {
        colors: {
          type: "array",
          items: { type: "string" },
          description: "Danh sách màu sắc",
        },
        sizes: {
          type: "array",
          items: { type: "string" },
          description: "Danh sách size: S, M, L, XL",
        },
        styles: {
          type: "array",
          items: { type: "string" },
          description: "Danh sách phong cách",
        },
        priceMin: {
          type: "number",
          description: "Giá tối thiểu (VND)",
        },
        priceMax: {
          type: "number",
          description: "Giá tối đa (VND)",
        },
        categories: {
          type: "array",
          items: { type: "string" },
          description: "Danh sách danh mục",
        },
      },
    },
  },
  {
    name: "compareProducts",
    description: "So sánh chi tiết 2 sản phẩm về giá cả, màu sắc, style",
    inputSchema: {
      type: "object",
      properties: {
        productIds: {
          type: "array",
          items: { type: "string" },
          minItems: 2,
          maxItems: 2,
          description: "Mảng chứa đúng 2 ID sản phẩm",
        },
      },
      required: ["productIds"],
    },
  },
  {
    name: "outfitRecommend",
    description: "Gợi ý set đồ hoàn chỉnh dựa trên phong cách, dịp sử dụng",
    inputSchema: {
      type: "object",
      properties: {
        style: {
          type: "string",
          description: "Phong cách: công sở, tối giản, năng động, nữ tính",
        },
        occasion: {
          type: "string",
          description: "Dịp sử dụng: đi làm, dạo phố, hẹn hò, party",
        },
        baseProductId: {
          type: "string",
          description: "ID sản phẩm làm cơ sở để gợi ý",
        },
      },
    },
  },
];

// Tạo MCP Server instance
export const mcpServer = new Server(
  {
    name: "ivy-fashion-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handler cho list tools
mcpServer.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: TOOLS,
  };
});

// Handler cho call tool
mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "findProducts": {
        const products = await fetchIVYProducts(args as any);
        return {
          content: [
            {
              type: "text",
              text: `Tìm được ${products.length} sản phẩm phù hợp`,
            },
          ],
          _meta: {
            structuredContent: {
              products,
              mode: "list",
            },
          },
        };
      }

      case "filterProducts": {
        const filterArgs = args as any;
        const products = await filterProducts(filterArgs);
        const filterInfo = [];
        if (filterArgs.colors) filterInfo.push(`màu ${filterArgs.colors.join(", ")}`);
        if (filterArgs.styles) filterInfo.push(`style ${filterArgs.styles.join(", ")}`);

        return {
          content: [
            {
              type: "text",
              text: `Tìm thấy ${products.length} sản phẩm với bộ lọc: ${filterInfo.join(", ")}`,
            },
          ],
          _meta: {
            structuredContent: {
              products,
              mode: "list",
              filterApplied: filterInfo.join(", "),
            },
          },
        };
      }

      case "compareProducts": {
        const compareArgs = args as any;
        if (!compareArgs.productIds || compareArgs.productIds.length !== 2) {
          throw new Error("Cần đúng 2 product IDs");
        }

        const result = await compareProducts(compareArgs.productIds);
        return {
          content: [
            {
              type: "text",
              text: `So sánh 2 sản phẩm:\n${result.comparison.differences.join("\n")}`,
            },
          ],
          _meta: {
            structuredContent: {
              products: result.products,
              comparison: result.comparison,
              mode: "compare",
            },
          },
        };
      }

      case "outfitRecommend": {
        const result = await recommendOutfit(args as any);
        return {
          content: [
            {
              type: "text",
              text: `${result.recommendation}\nGợi ý outfit gồm ${result.outfit.length} món đồ, tổng giá: ${result.totalPrice.toLocaleString()}đ`,
            },
          ],
          _meta: {
            structuredContent: {
              outfit: result.outfit,
              recommendation: result.recommendation,
              totalPrice: result.totalPrice,
              mode: "outfit",
            },
          },
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      ],
      isError: true,
    };
  }
});

// Export hàm để run server
export async function runMCPServer() {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.error("IVY Fashion MCP server running on stdio");
}
