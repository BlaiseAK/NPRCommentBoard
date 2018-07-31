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
        if(data) {
            location.reload();
        }
    })
    .catch(function(err) {
        console.log(err);
    });
});

$(document).on("click", ".submitComment", function() {
    event.preventDefault();

    var id = $(this).data("id");
    var commentText = $(this).children(".commentText").val();


    $.ajax({
        method: "POST",
        url: "/articles/"+id,
        data: {
            comment: commentText
        }
    })
    .then(function(comment) {
        $(".commentText").val("");
        location.reload();
    });
});

$(document).on("click", ".delete", function() {
    var id = $(this).data("id");

    $.ajax({
        method: "DELETE",
        url: "/comment/"+id
    })
    .then(function(data) {
        if(data) {
            location.reload();
        }
    });
});
