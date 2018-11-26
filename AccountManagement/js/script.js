$(document).ready(function(){
    $("#main-nav a").on("click", function(){
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
     });
});

