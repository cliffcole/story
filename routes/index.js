const express = require('express');
const router = express.Router() //defined for the router


//template for stories
var stories = {
    1: {
            "name": "Cliff",
            "from": "Cartersville, GA",
            "favoriteColor": "Black",
            "picture": "http://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/local-experts-maui-where-to-watch-big-wave-surfing.jpg?itok=yPFPYPj4",
            "piratesOrNinjas": "Ninja",
            "favoriteCookies": "Sugar cookies",
            "id": 1
        }
    
};

//increment starting at 2
var storyId = 2;

//route for get/read story by id
router.get('/story/:id', (req, res, next) => {
    var id = req.params.id;
    var story = {}
    story[id] = stories[id]
    
    console.log(story);
    res.json(stories[id]);
})
//route to get/read all stories
router.get('/stories', (req, res, next) => {
    console.log(stories);
    res.json(stories);
})
//route to add/create a story
router.post('/story', (req, res, next) => {
    var newStory = req.body;
    newStory.id = storyId;
    stories[storyId] = newStory;
    console.log(newStory);
    storyId++;
    res.status(201);
    res.json(newStory);
})

//route to update story
router.put('/story/:id', (req, res, next) => {
    var id = req.params.id;
    var updatedStory = req.body
    console.log(updatedStory);
    if(stories[id]){
        stories[id] = updatedStory;
    }
    res.json(updatedStory);
})

//route to delete a story
router.delete('/story/:id', (req, res, next) => {
    console.log("GOTHERE");
    var id = req.params.id;
    if(stories[id]){
        delete stories[id];
    }
    res.json('200');
})
module.exports = router;