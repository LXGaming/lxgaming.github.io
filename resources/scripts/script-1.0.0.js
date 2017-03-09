function load() {
    enforceHTTPS();
    enableToolTips();
    getLXGamingRepos();
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

function update(data) {
    if (data == null) {
        document.getElementById("pushed").innerHTML = "Recently Pushed - <a href='https://api.github.com/rate_limit' style='color:red'>Rate Limit</a>";
        document.getElementById("created").innerHTML = "Recently Created - <a href='https://api.github.com/rate_limit' style='color:red'>Rate Limit</a>";
        return;
    }
    var jsonObject = JSON.parse(data);
    var mostRecentlyPushed = getMostRecentRepoIndex(jsonObject, "pushed_at");
    var mostRecentlyCreated = getMostRecentRepoIndex(jsonObject, "created_at");
    document.getElementById("pushed").innerHTML = "Recently Pushed - <a href='" + jsonObject[mostRecentlyPushed]["html_url"] + "'>" + jsonObject[mostRecentlyPushed]["name"] + "</a>";
    document.getElementById("created").innerHTML = "Recently Created - <a href='" + jsonObject[mostRecentlyCreated]["html_url"] + "'>" + jsonObject[mostRecentlyCreated]["name"] + "</a>";
}

function getMostRecentRepoIndex(jsonObject, data) {
    var mostRecentIndex = 0;
    var mostRecentTime = 0;
    for (var index in jsonObject) {
        var time = new Date(jsonObject[index][data]).getTime();
        if (time > mostRecentTime) {
            mostRecentIndex = index;
            mostRecentTime = time;
        }
    }
    return mostRecentIndex;
}

function getLXGamingRepos() {
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open("GET", "https://api.github.com/users/LXGaming/repos", true);
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == "200") {
            update(request.responseText);
        }
        if (request.readyState == 4 && request.status == "403") {
            update(null);
        }
    }
    request.send(null);
}