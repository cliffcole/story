$(() => {
    
    $.ajax({
        url: 'http://localhost:3000/story/1',
        method: "GET"
    })
        .done((results) => {
        
        renderHtml(results);
    }) .fail((err) => {
        console.log("ERROR:"+ err);
        $('#main').append("<p>Error: "+err+"</p>");
    })
        /* .error(function(err){
            $('#main').append('<p>ERRRORR</p>')
        }) */


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
        var name = results.name
        var home = results.from
        var image = results.picture
        var favoriteColor = results.favoriteColor
        var piratesOrNinjas = results.piratesOrNinjas
        var favoriteCookies = results.favoriteCookies;
        var renderedHtml = '';
        renderedHtml += '<div class="row">'
        renderedHtml += '<div class="col-3">'
        renderedHtml += '<img src="'+image+'" height="200" width="200"></div>'
        renderedHtml += '<div class="col-9">'
        renderedHtml += '<p> My name is '+name +'. I\'m from '+ home 
        renderedHtml += ', my favorite color is '+favoriteColor+' and I prefer '+piratesOrNinjas +'. My favorite cookies are '+favoriteCookies+ '</p>'
        renderedHtml += '</div></div>'

        $('#main').append(renderedHtml);
    }
})