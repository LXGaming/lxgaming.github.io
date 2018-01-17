$(".scroll").click(function() {
    $("html, body").animate({
        scrollTop: $(".collection").offset().top
    }, 2000);
});

$(window).konami();
$(window).on("konami", function() {
    Materialize.toast("Konami Code!", 5000);
    if ($(".visibility").css("visibility") === "visible") {
        $(".visibility").css("visibility", "hidden");
        $("body").css("overflow-y", "hidden");
    } else {
        $(".visibility").css("visibility", "visible");
        $("body").css("overflow-y", "auto");
    }
});