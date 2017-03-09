function load() {
    enforceHTTPS();
    enableToolTips();
}

function enforceHTTPS() {
    var host = "lxgaming.github.io"
	if (window.location.host == host && window.location.protocol != "https:") {
		window.location.protocol = "https:";
        console.log("Enforcing HTTPS");
	}
}

function enableToolTips() {
    $('[data-toggle="tooltip"]').tooltip();
}