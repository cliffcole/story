const express = require('express');
const router = express.Router()

router.use('/story', (req,res,next) => {
    story = {
        "name": "Cliff",
        "from": "Cartersville, GA",
        "favoriteColor": "Black",
        "picture": "http://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/local-experts-maui-where-to-watch-big-wave-surfing.jpg?itok=yPFPYPj4",
        "piratesOrNinjas": "Ninja",
        "favoriteCookies": "Sugar cookies"
    }

    res.json(story);
})

module.exports = router;