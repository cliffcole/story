const express = require('express');
const morgan = require('morgan');

const app = express();

//separate routes from main app file
const index = require('./routes/index');
const products = require('./routes/products');

//express built in body-parser - http://expressjs.com/en/4x/api.html#express.json
app.use(express.json());
app.use(express.urlencoded({extended: true}))
//logger middle ware - https://github.com/expressjs/morgan
app.use(morgan('combined'));

//setting up static directory for html - http://expressjs.com/en/4x/api.html#express.static
app.use(express.static('public'));

//Call the routes defined above
app.use('/', index);
app.use('/products', products)

app.listen(3000, () => {
    console.log("Server listening on 3000...");
})