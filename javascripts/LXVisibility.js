function LXVisibility(){
var nav = document.getElementById("nav").style;
var content = document.getElementById("content").style;
var lxvb = document.getElementById("lxvb").style;
var myCanvas = document.getElementById("myCanvas").style;

if (nav.visibility=="hidden") nav.visibility = "visible";
else nav.visibility = "hidden";

if (content.visibility=="hidden") content.visibility = "visible";
else content.visibility = "hidden";

if (nav.visibility=="hidden") lxvb.background = "url('./images/Titles/LXWebBlack.png') center";
else lxvb.background = "url('./images/Titles/LXWebWhite.png') center";

if (myCanvas.visibility=="hidden") myCanvas.visibility = "visible";
else myCanvas.visibility = "hidden";
}