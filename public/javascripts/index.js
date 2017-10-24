$(function(){
    
    $.ajax({
        url: 'http://localhost:3000/story',
        method: "GET"
    })
        .done(function(results){
            console.log(results);
            $('#main').append(results);
        })
})