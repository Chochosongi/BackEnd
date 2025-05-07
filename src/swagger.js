// src/swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SafeMeal API",
      version: "1.0.0",
      description: "SafeMeal 서비스의 RESTful API 문서",
    },
    servers: [
      {
        url: "https://forkcast.onrender.com", // 배포시 실제 URL로 수정
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"], // Swagger 주석을 작성한 경로
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
