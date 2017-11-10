function onLoad() {
    initializeParticles();
    initializeGitHub();
    $(".scroll").click(function() {
        $("html, body").animate({
            scrollTop: $(".collection").offset().top
        }, 2000);
    });
}

function onResize() {
    updateCanvas();
}