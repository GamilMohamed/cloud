// src/config/swagger.config.ts
import swaggerJsdoc from 'swagger-jsdoc';
import { guessDocs } from '../docs/guess.docs';
import { cloudDocs } from '../docs/cloud.docs';

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
      schemas: {
        ...cloudDocs.schemas,
        ...guessDocs.schemas,
      },
    },
    paths: {
      ...cloudDocs.paths,
      ...guessDocs.paths,
    },
  },
  apis: ['./src/routes/*.ts'], //pas oblige
};

export const specs = swaggerJsdoc(options);