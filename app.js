const express = require('express');
const app = express();
const userRouter = require('./routes/UserRoute');
const productRouter = require('./routes/ProductRoute');
const config = require('config');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const {handleError} = require('./exceptions/ExceptionHandler')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
require("./config/db");


if(!config.has('jwtPrivateKey')){
    console.error('FATAL ERROR WITH jwtPrivateKey');
    process.exit(1);
};

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use(handleError);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.get('/', (req, res) => {
    res.send('Hello to FlapKap Backend Challenge');
});

console.log(`Application name: ${config.get('name')}`);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}..`)
});