const express = require('express');
const router = express.Router()

router.get('/cliff', (req,res) => {
    res.send("WORD TO PRODUCTS")
})

module.exports = router;