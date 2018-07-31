$.getJSON("/", function(data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].photo + "<br />" + data[i].title + "<br />" + data[i].summary + "<br />" + data[i].link + "</p>");

    }
});

$(document).on("click", "#scrapper", function() {
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
    .then(function(data){
        var article = $("<div>");
        article = article
    })
})

$(document).on("click", "p", function() {
    $("#comments").empty();

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/"+thisId
    })
        .then(function(data) {
            console.log(data);
            $("#comments").append("<h2>"+data.title+"</h2>");
            $("#comments").append("<input id='titleinput' name='title' >");
            $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
            $("#comments").append("<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>");

            if (data.comment) {
                $("#bodyinput").val(data.comment.body);
            }
        })
        .then(function(){
            location.reload();
        });
});

$(document).on("click", "#savecomment", function() {
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
        .then(function(data) {
            console.log(data);
            $("#comments").empty();
        })
        .then(function(){
            location.reload();
        });
    $("#titleinput").val("");
    $("#bodyinput").val("");
});