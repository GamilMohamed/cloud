// src/config/swagger.config.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cloud Drawing API',
      version: '1.0.0',
      description: 'API for cloud drawing and guessing game',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // Chemins vers les fichiers contenant les annotations
  apis: ['./src/routes/*.ts'],
};

export const specs = swaggerJsdoc(options);