/* Script Settings */
var particleSettings = {
    color: "rgba(0, 160, 209, 1)",
    count: 250,
    render: true,
    speed: 0.2
};

/* Script Variables */
var canvas;
var context;
var particles;
var requestedRender;

function initializeParticles() {
    canvas = document.getElementById("particles");
    if (!canvas || canvas.nodeName !== "CANVAS") {
        console.error("Failed to find canvas for particles!");
        return;
    }

    context = canvas.getContext("2d");
    particles = new Array();
    updateCanvas();
    createParticles();
}

function updateCanvas() {
    if (!canvas) {
        return;
    }

    if ((canvas.width != window.innerWidth || canvas.height != window.innerHeight)) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    if (!requestedRender) {
        render();
    }
}

function render() {
    if (!particleSettings.render || !isVisible(canvas)) {
        cancelRender();
        return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    updateParticles();
    requestRender();
}

function requestRender() {
    var requestAnimationFrameFunction = getRequestAnimationFrameFunction();
    if (requestAnimationFrameFunction) {
        requestedRender = requestAnimationFrameFunction(render);
    }
}

function cancelRender() {
    var cancelAnimationFrameFunction = getCancelAnimationFrameFunction();
    if (cancelAnimationFrameFunction) {
        requestedRender = cancelAnimationFrameFunction(requestedRender);
    }
}

function getRequestAnimationFrameFunction() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
}

function getCancelAnimationFrameFunction() {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        window.clearTimeout;
}

function isVisible(element) {
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}

function createParticles() {
    for (var index = particles.length; index < particleSettings.count; index++) {
        var particle = new Object();
        particle.position = { x: Math.random() * canvas.width, y: Math.random() * canvas.height };
        particle.radius = Math.random() * 2 + 0.1;
        particle.velocity = { x: Math.cos(2 * Math.PI * Math.random()) * (particle.radius * 0.5), y: Math.sin(2 * Math.PI * Math.random()) * (particle.radius * 0.5) };
        particles.push(particle);
    }
}

function updateParticles() {
    for (var index = 0; index < particles.length; index++) {
        var particle = particles[index];
        if (!particle) {
            return;
        }

        particle.position.x += particle.velocity.x * particleSettings.speed;
        particle.position.y += particle.velocity.y * particleSettings.speed;
        if (particle.position.x - particle.radius < 0 || particle.position.x + particle.radius > canvas.width) {
            particle.velocity.x = -particle.velocity.x;
        }

        if (particle.position.y - particle.radius < 0 || particle.position.y + particle.radius > canvas.height) {
            particle.velocity.y = -particle.velocity.y;
        }

        context.fillStyle = particleSettings.color;
        context.beginPath();
        context.arc(particle.position.x, particle.position.y, particle.radius, 0, Math.PI * 2, false);
        context.fill();
    }
}

window.addEventListener("resize", function() {
    updateCanvas();
}, true);

initializeParticles();