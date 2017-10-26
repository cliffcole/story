$(() => {
    
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
        /* .error(function(err){
            $('#main').append('<p>ERRRORR</p>')
        }) */

    $('.addStory').on('click', (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
        console.log("GOTHERE");
    })

    $('form').on('submit', (e) => {
        e.preventDefault();
        
        var formData = $(e.currentTarget).serialize();

        $.ajax({
            url: "http://localhost:3000/story",
            method: "POST",
            data: formData
        })
            .done((data) => {
                console.log(data);
            })
        
    });

    renderHtml = (results) => {
        var renderedHtml = '';
        for(var key in results){
            
            var name = results[key].name
            var home = results[key].from
            var image = results[key].picture
            var favoriteColor = results[key].favoriteColor
            var piratesOrNinjas = results[key].piratesOrNinjas
            var favoriteCookies = results[key].favoriteCookies;
            
            renderedHtml += '<div class="row">'
            renderedHtml += '<div class="col-3">'
            renderedHtml += '<img src="'+image+'" height="200" width="200"></div>'
            renderedHtml += '<div class="col-4">'
            renderedHtml += '<p> My name is '+name +'. I\'m from '+ home 
            renderedHtml += ', my favorite color is '+favoriteColor+' and I prefer '+piratesOrNinjas +'. My favorite cookies are '+favoriteCookies+ '</p>'
            renderedHtml += '</div></div>'
        }
        

        $('#main').append(renderedHtml);
    }
})