/* Script Settings */
var movementSpeed = 0.5;
var particleColor = "rgba(0, 160, 209, 1)";
var particleCount = 250;
var renderCanvas = true;

/* Script Variables */
var canvas;
var context;
var particles;

function initializeParticles() {
    canvas = document.getElementsByClassName("particles")[0];
    context = canvas.getContext("2d");
    particles = new Array();
    updateCanvas();
    createParticles();
    render();
}

function updateCanvas() {
    if (!canvas) {
        return;
    }

    if ((canvas.width != window.innerWidth || canvas.height != window.innerHeight)) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    if (!!(canvas.offsetWidth || canvas.offsetHeight || canvas.getClientRects().length)) {
        if (!renderCanvas) {
            renderCanvas = true;
            render();
        }
    } else {
        renderCanvas = false;
    }
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = particleColor;
    updateParticles();

    if (renderCanvas) {
        renderFrame(render);
    }
}

function renderFrame(callback) {
    return window.requestAnimationFrame(callback) ||
        window.webkitRequestAnimationFrame(callback) ||
        window.mozRequestAnimationFrame(callback) ||
        window.oRequestAnimationFrame(callback) ||
        window.msRequestAnimationFrame(callback) ||
        window.setTimeout(callback, 1000 / 60);
}

function createParticles() {
    for (let index = 0; index < particleCount; index++) {
        let particle = new Object();
        particle.x = Math.random() * canvas.width;
        particle.y = Math.random() * canvas.height;
        particle.radius = Math.random() * 2 + 0.1;
        particle.vx = Math.cos(2 * Math.PI * Math.random()) * (particle.radius * 0.5);
        particle.vy = Math.sin(2 * Math.PI * Math.random()) * (particle.radius * 0.5);
        particles.push(particle);
    }
}

function updateParticles() {
    for (let index = 0; index < particles.length; index++) {
        let particle = particles[index];
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, false);
        context.fill();

        if (particle.x - particle.radius < 0 || particle.x + particle.radius > canvas.width) {
            particle.vx = -particle.vx;
        }

        if (particle.y - particle.radius < 0 || particle.y + particle.radius > canvas.height) {
            particle.vy = -particle.vy;
        }

        particle.x += particle.vx * movementSpeed;
        particle.y += particle.vy * movementSpeed;
    }
}

if (window.attachEvent) {
    window.attachEvent("onresize", function() {
        updateCanvas();
    });
} else if (window.addEventListener) {
    window.addEventListener("resize", function() {
        updateCanvas();
    }, true);
} else {
    console.log("Browser does not support Javascript event binding");
}

initializeParticles();