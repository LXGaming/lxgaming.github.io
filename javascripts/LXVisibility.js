function LXVisibility(){
var NavigationBase = document.getElementById("NavigationBase").style;
var Navigation = document.getElementById("Navigation").style;
var myCanvas = document.getElementById("myCanvas").style;
var Main = document.getElementById("Main").style;
		
if (NavigationBase.visibility=="hidden") NavigationBase.visibility = "visible";
else NavigationBase.visibility = "hidden";
		
if (Navigation.visibility=="hidden") Navigation.visibility = "visible";
else Navigation.visibility = "hidden";

if (myCanvas.visibility=="hidden") myCanvas.visibility = "visible";
else myCanvas.visibility = "hidden";

if (Main.visibility=="hidden") Main.visibility = "visible";
else Main.visibility = "hidden";
}