import { createSwaggerSpec } from "next-swagger-doc";

export async function getApiDocs(): Promise<Object> {
  return createSwaggerSpec({
    apiFolder: "app/api",
    definition: {
      components: { securitySchemes: { BearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } } },
      info: { title: "Next Swagger API Example", version: "1.0" },
      openapi: "3.0.0",
      security: [],
    },
  });
}
