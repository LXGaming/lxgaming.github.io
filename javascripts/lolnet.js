function checkLolnet() {
  background();
  document.getElementById("status").innerHTML = "Checking..."
  document.getElementById("status").style.color = "White"
  document.getElementById("message").innerHTML = ""
  
  var httpRequest = new XMLHttpRequest();
  httpRequest.timeout = 10000;
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
	  var json = JSON.parse(httpRequest.responseText);
	  
	  if (json.status != "success") {
        document.getElementById("status").innerHTML = "Error!";
        document.getElementById("status").style.color = "Red";
		return;
	  }
	  
	  if (json.online == true) {
		document.getElementById("status").innerHTML = "Yes";
        document.getElementById("status").style.color = "Green";
		document.getElementById("message").innerHTML = "Currently " + json.players.now + " players online."
	  } else {
        document.getElementById("status").innerHTML = "No";
        document.getElementById("status").style.color = "Red";
		document.getElementById("social").innerHTML = "<br>Facebook: <a style='text-decoration:none;color:deepskyblue;' href='https://www.facebook.com/lolnetNZ/'>lolnetNZ</a><br> Twitter: <a style='text-decoration:none;color:deepskyblue;' href='https://twitter.com/lolnetnz'>@lolnetNZ</a>";
		message();
	  }
	  return;
    }
	
	if (httpRequest.readyState == 4 && httpRequest.status != 200) {
      document.getElementById("status").innerHTML = "Error!";
      document.getElementById("status").style.color = "Red";
	}
  }
  
  httpRequest.onerror = function() {
      document.getElementById("status").innerHTML = "Error!";
      document.getElementById("status").style.color = "Red";
  }
  
  httpRequest.ontimeout = function() {
      document.getElementById("status").innerHTML = "Timeout!";
      document.getElementById("status").style.color = "Orange";
  }
  
  httpRequest.open("GET", "https://mcapi.us/server/status?ip=lolnet.co.nz&port=25565", true);
  httpRequest.send();
}

function background() {
  var random = Math.floor(Math.random() * (5 - 0 + 1) + 0);
  document.getElementById("image").style = "background-image:url(images/background/lolnetbg" + random + ".png);"
}

function message() {
  var random = Math.floor(Math.random() * (5 - 0 + 1) + 0);
  
  if (random == 0) {
    document.getElementById("message").innerHTML = "Try again later.";
  } else if (random == 1) {
    document.getElementById("message").innerHTML = "I'm yelling at James and even he can't fix it.";
  } else if (random == 2) {
    document.getElementById("message").innerHTML = "The server is still on fire!";
  } else if (random == 3) {
    document.getElementById("message").innerHTML = "*Pokes server with stick*<br>It's not moving :(";
  } else if (random == 4) {
    document.getElementById("message").innerHTML = "Yes, we have tired turning it on and off again.";
  } else if (random == 5) {
    document.getElementById("message").innerHTML = "404 Server not found.";
  }
}