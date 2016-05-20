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
	$("html, body").animate({ scrollTop: body.height()}, 2000);
	return;
}

function ScrollUp() {
	$("html, body").animate({ scrollTop: 0}, 2000);
	return;
}