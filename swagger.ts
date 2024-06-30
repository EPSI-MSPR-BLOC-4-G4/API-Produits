import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'API documentation for the Product service',
    },
    servers: [
      {
        url: 'http://localhost:7000', // replace with your server URL
      },
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'stock', 'details'],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated ID of the product',
            },
            name: {
              type: 'string',
              description: 'The name of the product',
            },
            stock: {
              type: 'integer',
              description: 'The stock quantity of the product',
            },
            details: {
              type: 'object',
              properties: {
                price: {
                  type: 'number',
                  format: 'float',
                  description: 'The price of the product',
                },
                description: {
                  type: 'string',
                  description: 'The description of the product',
                },
                color: {
                  type: 'string',
                  description: 'The color of the product',
                },
              },
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The creation date of the product',
            },
          },
          example: {
            id: 1,
            name: 'Product Name',
            stock: 10,
            details: {
              price: 29.99,
              description: 'Product description',
              color: 'red',
            },
            createdAt: '2023-06-28T00:00:00.000Z',
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // replace with the path to your routes files
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
