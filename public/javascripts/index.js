$(() => {
    
    loadStories = () => {
        $('#nav-home').empty();
        $.ajax({
            url: 'http://localhost:3000/stories',
            method: "GET"
        })
            .done((results) => {
            console.log(results);
            renderHtml(results);
        }) .fail((err) => {
            console.log("ERROR:"+ err);
            $('#main').append("<p>Error: "+err+"</p>");
        })
    }

    loadStories();

    $('#nav-home-tab').on('click', (e) => {
        loadStories();
    })

    $('.saveStory').on('click', (e) => {
        console.log(e.currentTarget);
        e.preventDefault();
        
        var formData = $(e.currentTarget).serialize(); 
    })

    $('#editModal').on('show.bs.modal', (e) => {
        var id = $(e.relatedTarget).data('id');
        var clickedStory = $(e.relatedTarget);
        
        var url = "http://localhost:3000/story/"+id
        $.ajax({
            url: url,
            method: "GET"
        }).done((story) => {
            //console.log(story);
            for(var key in story.id){
                console.log(story.id[key].name);
            }
            //console.log(story[1]);
            /* for(var key in story){
                //console.log(story);
                console.log(key);
                console.log(story[key].name);
                $('input[name="name"').val(story[key].name);
                $('input[name="from"').val(story[key].from);
                $('input[name="favoriteColor"').val(story[key].favoriteColor);
                $('input[name="favoriteCookies"').val(story[key].favoriteCookies);
                $('input[name="picture"').val(story[key].picture);
                $('input[name="piratesOrNinjas"').val(story[key].piratesOrNinjas);
            } */
            
        })
    }) 

    $(document).on('click', '.deleteStory', (e) => {
        var clickedButton = $(e.currentTarget);
        var id = clickedButton.data('id');
        console.log(id);
        
        
    }) 
    getSingleStory = (id) => {
        $.ajax({
            url: 'http://localhost:3000/story/'+ id,
            method: "GET"
        })
            .done((results) => {
            console.log(results);
            renderEditHtml(results);
        }) .fail((err) => {
            console.log("ERROR:"+ err);
            $('#main').append("<p>Error: "+err+"</p>");
        })
    }
    //submit #add story
    $('form').on('submit', (e) => {
        e.preventDefault();
        
        var formData = $(e.currentTarget).serialize();

        $.ajax({
            url: "http://localhost:3000/story",
            method: "POST",
            data: formData
        })
            .done((data) => {
                //window.location.href = "/"
                $('#nav-home-tab').trigger('click');
                
                //loadStories();
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