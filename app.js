const express = require('express');
const morgan = require('morgan');

const app = express();

const index = require('./routes/index');
const products = require('./routes/products');

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan('combined'));

app.use(express.static('public'));

app.use('/', index);
app.use('/products', products)

app.listen(3000, () => {
    console.log("Server listening on 3000...");
})