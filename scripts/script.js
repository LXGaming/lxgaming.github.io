function initializeScript() {
    var elements = document.getElementsByTagName("a");
    for (var index = 0; index < elements.length; index++) {
        if (!elements[index].getAttribute("data-color")) {
            continue;
        }

        elements[index].addEventListener("focus", updateColor);
        elements[index].addEventListener("mouseenter", updateColor);
        elements[index].addEventListener("blur", updateColor);
        elements[index].addEventListener("mouseleave", updateColor);
    }
}

function updateColor() {
    if (!event || !event.type) {
        return;
    }

    var element = event.target || event.srcElement;
    if (!element) {
        return;
    }

    if (event.type === "focus" || event.type === "mouseenter") {
        element.style.color = element.getAttribute("data-color");
    }

    if (event.type === "blur" || event.type === "mouseleave") {
        element.style.color = "";
        if (!element.getAttribute("style")) {
            element.removeAttribute("style");
        }
    }
}

initializeScript();