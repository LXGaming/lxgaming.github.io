function AjaxTyla() {
	jQuery.ajax ({
		url: "https://www.lolnet.co.nz/api/v1.0/lolstats/getTylaServerInfo.php",
		type: "post",
		data: "",
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function(result){alert(result);},
		error: function(result){alert(result);}
	});
}

function process(result) {
	var tyla = document.getElementById("tyla").style;
	tyla.text = result
}