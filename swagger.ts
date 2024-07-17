// swagger.ts
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Canteen Connect APIs",
    version: "1.0.0",
    description: "Backend APIs for Canteen Connect App",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Local server",
    },
  ],
  tags: [
    {
      name: "Users",
      description: "User management endpoints",
    },
    {
      name: "Categories",
      description: "Category management endpoints",
    },
    {
      name: "Orders",
      description: "Order management endpoints",
    },
    {
      name: "Products",
      description: "Product management endpoints",
    },
    {
      name: "Cart",
      description: "Cart management endpoints",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.ts"],
};

export default options;
