function load() {
    createHttpRequest("https://api.github.com/users/LXGaming/repos", processRepos);
    createHttpRequest("https://api.github.com/users/LXGaming/events/public", processEvents);
}

function processRepos(data) {
    if (data == null) {
        document.getElementById("pushed").innerHTML = "Recently Pushed - <a href='https://api.github.com/rate_limit' style='color:red'>Rate Limit</a>";
        document.getElementById("created").innerHTML = "Recently Created - <a href='https://api.github.com/rate_limit' style='color:red'>Rate Limit</a>";
        return;
    }

    var jsonObject = JSON.parse(data);
    if (!jsonObject) {
        return;
    }
    
    var mostRecentlyPushed = getMostRecent(jsonObject, "pushed_at");
    var mostRecentlyCreated = getMostRecent(jsonObject, "created_at");
    document.getElementById("pushed").innerHTML = "Recently Pushed - <a href='" + jsonObject[mostRecentlyPushed]["html_url"] + "'>" + jsonObject[mostRecentlyPushed]["name"] + "</a>";
    document.getElementById("created").innerHTML = "Recently Created - <a href='" + jsonObject[mostRecentlyCreated]["html_url"] + "'>" + jsonObject[mostRecentlyCreated]["name"] + "</a>";
}

function processEvents(data) {
    if (data == null) {
        document.getElementById("commit").innerHTML = "<li><h2><a href='https://api.github.com/rate_limit' style='color:red'>Rate Limit</a></h2></li>";
        return;
    }

    document.getElementById("commit").innerHTML = "";
    var jsonObject = JSON.parse(data);
    for (var index = 0; index < jsonObject.length; index++) {
        if (!jsonObject[index].hasOwnProperty("type") || jsonObject[index]["type"] !== "PushEvent") {
            continue;
        }

        var commitData = new Object();
        commitData.name = jsonObject[index]["repo"]["name"];
        commitData.user = commitData.name.split("/")[0];
        commitData.repo = commitData.name.split("/")[1];
        commitData.repoUrl = "https://github.com/" + commitData.user + "/" + commitData.repo;
        commitData.commit = jsonObject[index]["payload"]["head"];
        commitData.commitId = commitData.commit.substring(0, 7);
        commitData.commitUrl = commitData.repoUrl + "/commit/" + commitData.commit;
        commitData.commitMessages = jsonObject[index]["payload"]["commits"].map(function(e) {
            return e["message"];
        });

        var element = document.createElement("li");
        element.innerHTML += "<h2><a href='" + commitData.repoUrl + "'>" + commitData.name + "</a></h2>";
        element.innerHTML += "<p><a href='" + commitData.commitUrl + "'>" + commitData.commitId + "</a>: " + commitData.commitMessages.join("\n").replace(/\n/g, "<br/>") + "</p>";
        document.getElementById("commit").appendChild(element);
    }
}

function getMostRecent(jsonObject, entry) {
    if (!jsonObject || !entry) {
        return null;
    }

    var mostRecentIndex = null;
    var mostRecentTime = null;
    for (var index in jsonObject) {
        var time = new Date(jsonObject[index][entry]);
        if (time && time.getTime() > mostRecentTime) {
            mostRecentIndex = index;
            mostRecentTime = time.getTime();
        }
    }
    return mostRecentIndex;
}

function createHttpRequest(url, callback) {
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open("GET", url, true);
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == "200") {
            callback(request.responseText);
        } else if (request.readyState == 4 && request.status == "403") {
            callback();
        }
    }
    request.send();
}