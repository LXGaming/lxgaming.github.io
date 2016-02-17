function LXVisibility(){
	var main = document.getElementById("main").style;
	var logo = document.getElementById("logo").style;
	var content = document.getElementById("content").style;
	
	if (main.visibility=="hidden") main.visibility = "visible";
	else main.visibility = "hidden";
	
	if (main.visibility=="hidden") logo.background = "url('./images/titles/lxwebblack.png') center";
	else logo.background = "url('./images/titles/lxwebwhite.png') center";
	
	if (content.visibility=="hidden") content.visibility = "visible";
	else content.visibility = "hidden";
}