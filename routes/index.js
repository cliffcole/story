const express = require('express');
const router = express.Router()


var stories = {
    1: {
        "name": "Cliff",
        "from": "Cartersville, GA",
        "favoriteColor": "Black",
        "picture": "http://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/local-experts-maui-where-to-watch-big-wave-surfing.jpg?itok=yPFPYPj4",
        "piratesOrNinjas": "Ninja",
        "favoriteCookies": "Sugar cookies"
    }
};

var storyId = 2;

router.get('/story/:id', (req,res,next) => {
    var id = req.params.id;


    res.json(stories[id]);
})
router.get('/stories', (req,res,next) => {
    console.log(stories);
    res.json(stories);
})
router.post('/story', (req,res,next) => {
    var newStory = req.body;
    newStory.id = storyId;
    stories[storyId] = newStory;
    console.log(newStory);
    res.json(newStory);
})

router.put('/story/:id', (req,res,next) => {
    var id = req.params.id;
    var updatedStory = req.body

    if(stories[id]){
        stories[id] = updatedStory;
    }

    res.send(updatedStory);
})

module.exports = router;