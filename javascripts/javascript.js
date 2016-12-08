function onLoad() {
	var host = "lxgaming.github.io"
	if (window.location.host == host && window.location.protocol != "https:") {
		window.location.protocol = "https:";
	}
}

function Image() {
	var image = document.getElementById("image").style;
	image.background = "url(images/background/code.jpg)";
	if (image.visibility == "visible") {
		image.visibility = "hidden";
	} else {
		image.visibility = "visible";
	}
	return;
}

function ScrollDown() {
	var body = $("body");
	$("html, body").animate({ scrollTop: document.getElementById("content").offsetHeight}, 1500);
	return;
}

function ScrollUp() {
	$("html, body").animate({ scrollTop: 0}, 1500);
	return;
}