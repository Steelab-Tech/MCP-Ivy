import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const schema = {
    openapi: "3.1.0",
    info: {
      title: "IVY Fashion MCP API",
      description: "Model Context Protocol API for IVY Fashion ChatGPT Integration",
      version: "1.0.0"
    },
    servers: [
      {
        url: process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000",
        description: "IVY Fashion MCP Server"
      }
    ],
    paths: {
      "/api/mcp/findProducts": {
        post: {
          summary: "Tìm sản phẩm IVY",
          description: "Tìm kiếm sản phẩm thời trang IVY theo danh mục, màu sắc, style, size",
          operationId: "findProducts",
          tags: ["Products"],
          requestBody: {
            required: false,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    category: {
                      type: "string",
                      description: "Danh mục sản phẩm: áo sơ mi, váy, quần, đầm, áo khoác, áo thun"
                    },
                    color: {
                      type: "string",
                      description: "Màu sắc: trắng, đen, xám, xanh, hoa"
                    },
                    style: {
                      type: "string",
                      description: "Phong cách: công sở, tối giản, năng động, nữ tính"
                    },
                    size: {
                      type: "string",
                      description: "Kích thước: S, M, L, XL"
                    }
                  }
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Danh sách sản phẩm tìm được",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      structuredContent: {
                        type: "object",
                        properties: {
                          products: {
                            type: "array",
                            items: {
                              type: "object"
                            }
                          },
                          mode: {
                            type: "string",
                            default: "list"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/mcp/filterProducts": {
        post: {
          summary: "Lọc sản phẩm IVY nâng cao",
          description: "Lọc sản phẩm theo nhiều tiêu chí: màu sắc, kích thước, phong cách, khoảng giá",
          operationId: "filterProducts",
          tags: ["Products"],
          requestBody: {
            required: false,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    colors: {
                      type: "array",
                      items: { type: "string" },
                      description: "Danh sách màu sắc"
                    },
                    sizes: {
                      type: "array",
                      items: { type: "string" },
                      description: "Danh sách size: S, M, L, XL"
                    },
                    styles: {
                      type: "array",
                      items: { type: "string" },
                      description: "Danh sách phong cách"
                    },
                    priceMin: {
                      type: "number",
                      description: "Giá tối thiểu (VND)"
                    },
                    priceMax: {
                      type: "number",
                      description: "Giá tối đa (VND)"
                    },
                    categories: {
                      type: "array",
                      items: { type: "string" },
                      description: "Danh sách danh mục"
                    }
                  }
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Danh sách sản phẩm đã lọc"
            }
          }
        }
      },
      "/api/mcp/compareProducts": {
        post: {
          summary: "So sánh 2 sản phẩm",
          description: "So sánh chi tiết 2 sản phẩm về giá cả, màu sắc, style",
          operationId: "compareProducts",
          tags: ["Products"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["productIds"],
                  properties: {
                    productIds: {
                      type: "array",
                      items: { type: "string" },
                      minItems: 2,
                      maxItems: 2,
                      description: "Mảng chứa đúng 2 ID sản phẩm"
                    }
                  }
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Kết quả so sánh"
            }
          }
        }
      },
      "/api/mcp/outfitRecommend": {
        post: {
          summary: "Gợi ý outfit hoàn chỉnh",
          description: "Gợi ý set đồ hoàn chỉnh dựa trên phong cách, dịp sử dụng",
          operationId: "outfitRecommend",
          tags: ["Outfit"],
          requestBody: {
            required: false,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    style: {
                      type: "string",
                      description: "Phong cách: công sở, tối giản, năng động, nữ tính"
                    },
                    occasion: {
                      type: "string",
                      description: "Dịp sử dụng: đi làm, dạo phố, hẹn hò, party"
                    },
                    baseProductId: {
                      type: "string",
                      description: "ID sản phẩm làm cơ sở để gợi ý"
                    }
                  }
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Gợi ý outfit"
            }
          }
        }
      }
    },
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            image: { type: "string" },
            price: { type: "number" },
            color: { type: "string" },
            size: {
              type: "array",
              items: { type: "string" }
            },
            style: { type: "string" },
            category: { type: "string" },
            detailUrl: { type: "string" },
            description: { type: "string" }
          }
        }
      }
    }
  };

  res.status(200).json(schema);
}
