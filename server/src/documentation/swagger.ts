import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerDoc: swaggerJSDoc.Options = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product API',
            version: '1.0.0',
            description: 'API of Product test',
        },
    },
    apis: ['./src/routes/*.ts']
});