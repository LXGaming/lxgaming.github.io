var types = {
    GITHUB: "GitHub",
    PAYPAL: "PayPal"
};

function onLoad(type) {
    initializeParticles();

    if (!type) {
        Materialize.toast("Error: undefined type");
    } else if (type === types.GITHUB) {
        initializeGitHub();
    } else if (type === types.PAYPAL) {
        return;
    } else {
        Materialize.toast("Error: unknown type");
    }

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
}

function onResize(type) {
    updateCanvas();
}

function createHttpRequest(url, callback) {
    $.ajax({
        dataType: "json",
        url: url,
        type: "GET",
        complete: callback
    });
}