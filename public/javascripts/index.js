$(() => {
    
    //initial load function
    loadStories = () => {
        $('#nav-home').empty();
        $.ajax({
            url: 'http://localhost:3000/stories', //get stories route from node/express/server api
            method: "GET"
        })
            .done((results) => {
            //console.log(results);
            renderHtml(results); // send results to renderHtml function
        }) .fail((err) => {
            console.log("ERROR:"+ err);
            $('#main').append("<p>Error: "+err+"</p>");
        })
    }
    // call inital load function
    loadStories(); 

    // refresh stories when moving back to page
    $('#nav-home-tab').on('click', (e) => {
        loadStories();
    })

    //not finished working through a bug
    $('#nav-addstory-tab').on('click', (e) => {
        var addStoryForm = $('#addStoryForm')[0];
        console.log(addStoryForm)
        //console.log(e.currentTarget);
        //Sconsole.log($('#addStoryForm'));
        /* $('#addStoryForm .formgroup input[name="name"').val();
        $('input[name="from"').val();
        $('input[name="favoriteColor"').val();
        $('input[name="favoriteCookies"').val();
        $('input[name="picture"').val();
        $('input[name="piratesOrNinjas"').val();
        $('input[name="id"').val();  */
    })

    
    // Save story from client and save to stories object on the node/express/server api side
    $('.saveStory').on('click', (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
    
        var formData = $('#editStoryForm').serialize(); //make form date into json object to process on the node/express/server api side
        var id = $('input[name=id]').val();
        var url = "http://localhost:3000/story/"+id  //send to PUT request to route on node/express/server api side 
        $.ajax({
            url: url,
            method: "PUT",
            dataType: "JSON",
            data: formData
        })
        .done((results) => {
            $('#nav-home-tab').trigger('click'); //once results are back redirect to home tab
        })
    })

    //edit modal form
    $('#editModal').on('show.bs.modal', (e) => {
        var id = $(e.relatedTarget).data('id');
        var clickedStory = $(e.relatedTarget);
        
        var url = "http://localhost:3000/story/"+id //first get story from get story by id route on the node/express/server api side
        $.ajax({
            url: url,
            method: "GET"
        }).done((story) => {
            //add values to the modal form text fields
            $('input[name="name"').val(story.name);
            $('input[name="from"').val(story.from);
            $('input[name="favoriteColor"').val(story.favoriteColor);
            $('input[name="favoriteCookies"').val(story.favoriteCookies);
            $('input[name="picture"').val(story.picture);
            $('input[name="piratesOrNinjas"').val(story.piratesOrNinjas);
            $('input[name="id"').val(story.id);
        })
    }) 
    
    //delete a story 
    $(document).on('click', '.deleteStory', (e) => {
        var clickedButton = $(e.currentTarget);
        var id = clickedButton.data('id');
        var url = "http://localhost:3000/story/"+id //send delete request to delete route on the node/express/server api side

        $.ajax({
            url: url,
            method: "DELETE"

        })
        .done((results) =>{
            console.log(results)
            $('#nav-home-tab').trigger('click');
        })
        
        
    }) 

    getSingleStory = (id) => {
        $.ajax({
            url: 'http://localhost:3000/story/'+ id,
            method: "GET"
        })
            .done((results) => {
            //console.log(results);
            renderEditHtml(results);
        }) .fail((err) => {
            console.log("ERROR:"+ err);
            $('#main').append("<p>Error: "+err+"</p>");
        })
    }
    //submit #add story
    $('form').on('submit', (e) => {
        e.preventDefault();
        
        var formData = $(e.currentTarget).serialize(); //make data into json type format

        $.ajax({
            url: "http://localhost:3000/story", // send POST/Create to post route on the node/express/server api side
            method: "POST",
            data: formData
        })
            .done((data) => {
                
                $('#nav-home-tab').trigger('click'); // refresh stories in home tab
                
            })
        
    });

    //render results from loadStories 
    renderHtml = (results) => {
        var renderedHtml = '';
        for(var key in results){
            var storyId = key;
            var name = results[key].name;
            var home = results[key].from;
            var image = results[key].picture;
            var favoriteColor = results[key].favoriteColor;
            var piratesOrNinjas = results[key].piratesOrNinjas;
            var favoriteCookies = results[key].favoriteCookies;
            
            renderedHtml += '<div class="row storyRow">'
            renderedHtml += '<div class="col-3">'
            renderedHtml += '<img src="'+image+'" height="200" width="200"></div>'
            renderedHtml += '<div class="col-4">'
            renderedHtml += '<p> My name is '+name +'. I\'m from '+ home 
            renderedHtml += ', my favorite color is '+favoriteColor+' and I prefer '+piratesOrNinjas +'. My favorite cookies are '+favoriteCookies+ '</p>'
            renderedHtml += '</div>'
            renderedHtml += '<div class="col-1"><span><input type="button" id="'+storyId+'" class="btn btn-primary btn-sm editStory" data-target="#editModal" data-toggle="modal" data-id="'+storyId+'" value="Edit"></span></div>'
            renderedHtml += '<div class="col-1"><span><input type="button" id="'+storyId+'" class="btn btn-danger btn-sm deleteStory" data-id="'+storyId+'" value="Delete"></span></div>'

        }
        

        $('#nav-home').append(renderedHtml);
    }
 

    renderEditStory = (editStory) => {
        var renderHtml = "";
        renderHtml += '<div class="container" id="form">'
        renderHtml += '<form id="addStoryForm" method="post" action="/">'
        renderHtml += '<div class="form-group">'
        renderHtml += '<label for="Name">Name</label>'
        renderHtml += '<input type="text" class="form-control" id="name" name="name" placeholder="what is your name">'
        renderHtml += '</div>'
        renderHtml += '<div class="form-group">'
        renderHtml += '<label for="From">From</label>'
        renderHtml += '<input type="text" class="form-control" id="from" name="from" placeholder="Where are you from">'
        renderHtml += '</div>'
        renderHtml += '<div class="form-group">'
        renderHtml += '<label for="Color">Color</label>'
        renderHtml += '<input type="text" class="form-control" id="color" name="favoriteColor" placeholder="What is your favorite color">'
        renderHtml += '</div>'
        renderHtml += '<div class="form-group">'
        renderHtml += '<label for="Picture">Picture</label>'
        renderHtml += '<input type="text" class="form-control" id="picture" name="picture" placeholder="Url for your picture">'
        renderHtml += '</div>'
        renderHtml += '<div class="form-group">'
        renderHtml += '<label for="PiratesOrNinjas">Pirates or Ninjas</label>'
        renderHtml += '<input type="text" class="form-control" id="pn" name="piratesOrNinjas" placeholder="Pirates OR Ninjas">'
        renderHtml += '</div>'
        renderHtml += '<div class="form-group">'
        renderHtml += '<label for="FavoriteCookies">Favorite Cookie</label>'
        renderHtml += '<input type="text" class="form-control" id="favoriteCookies" name ="favoriteCookie" placeholder="Favorite Cookies">'
        renderHtml += '</div>'
        renderHtml += '<button type="submit" class="btn btn-primary">Submit</button>'
        renderHtml += '</form>'
        renderHtml += '</div>'
        
        $('#main').empty();
        $('#main').append(renderHtml);
    }
})