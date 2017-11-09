function onLoad() {
    initializeParticles();
    initializeGitHub();
    $(".scroll").click(function() {
        $("html, body").animate({
            scrollTop: $(".commits").offset().top
        }, 2000);
    });
}

function onResize() {
    updateCanvas();
}