const express = require('express');
const morgan = require('morgan');

const app = express();

const index = require('./routes/index');

app.use(express.json());
app.use(morgan('combined'));

app.use('/', index);

app.listen(3000, () => {
    console.log("Server listening on 3000...");
})