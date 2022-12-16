const swaggerAutogen = require('swagger-autogen')()


const doc = {
    info: {
        version: "1.0.0",
        title: "Vending Machine Backend API",
        description: "Vending Machine APIs"
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "User",
            "description": "Endpoints"
        },
        {
            "name": "Product",
            "description": "Endpoints"
        }
    ],
    securityDefinitions: {
        api_key: {
            type: "apiKey",
            name: "api_key",
            in: "header"
        }
    },
    definitions: {
        Product: {
            productName: "Mouse",
            amountAvailable: 50,
            cost: 50,
            sellerId: 875827649081624
        },
        User: {
            username: "Jhon Doe",
            password: 'HashedPassword',
            deposite: 50,
            role: 'Seller/Buyer'
        },
    }
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./routes/ProductRoute.js', './routes/UserRoute.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app');
});
