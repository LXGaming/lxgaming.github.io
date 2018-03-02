var latestEventId;

function initializeGitHub() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.github.com/users/LXGaming/events/public", true);
    xhr.send();
    xhr.onreadystatechange = function(event) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                processPublicEventsData(JSON.parse(xhr.responseText));
            } else if (xhr.status === 403) {
                processForbiddenData(JSON.parse(xhr.responseText));
            } else {
                console.warn("An error occurred");
            }
        }
    };
}

function processForbiddenData(data) {
    if (!data || !data.message || !data.documentation_url) {
        return;
    }

    clear();
    append(createElement("p", data.message));
    append(createElement("p", createLink(data.documentation_url, data.documentation_url)));
}

function processPublicEventsData(data) {
    if (!data || !(data instanceof Array)) {
        return;
    }

    for (var index = 0; index < data.length; index++) {
        var element = data[index];
        if (!element || !element.id || !element.public) {
            continue;
        }

        if (!latestEventId || latestEventId < element.id) {
            latestEventId = element.id;
            clear();
        } else if (latestEventId === element.id) {
            return;
        }

        if (element.type === "IssueCommentEvent") {
            processIssueCommentData(element);
        } else if (element.type === "IssuesEvent") {
            processIssuesData(element);
        } else if (element.type === "PushEvent") {
            processPushData(element);
        }
    }

    if (typeof timeago === "function") {
        timeago().render(document.querySelectorAll(".timeago"));
    } else {
        console.warn("Timeago is not present");
        var elements = document.getElementsByClassName("timeago");
        for (var index = 0; index < elements.length; index++) {
            elements[index].innerText = elements[index].getAttribute("datetime");
        }
    }
}

function processIssueCommentData(jsonObject) {
    if (!jsonObject || !jsonObject.actor || !jsonObject.payload || !jsonObject.repo || !jsonObject.payload.issue || !jsonObject.payload.comment) {
        return;
    }

    var names = jsonObject.repo.name.split("/");
    appendTitle({
        user: names[0],
        repo: names[1]});

    appendBody({
        user: names[0],
        repo: names[1],
        messages: [jsonObject.payload.issue.title],
        endpoint: "issues/" + jsonObject.payload.issue.number + "/#issuecomment-" + jsonObject.payload.comment.id,
        display: "#" + jsonObject.payload.issue.number});

    appendFooter({
        user: names[0],
        created: jsonObject.created_at});

    append(createElement("hr"));
}

function processIssuesData(jsonObject) {
    if (!jsonObject || !jsonObject.actor || !jsonObject.payload || !jsonObject.repo || !jsonObject.payload.issue) {
        return;
    }

    var names = jsonObject.repo.name.split("/");
    appendTitle({
        user: names[0],
        repo: names[1]});

    appendBody({
        user: names[0],
        repo: names[1],
        messages: [jsonObject.payload.issue.title],
        endpoint: "issues/" + jsonObject.payload.issue.number,
        display: "#" + jsonObject.payload.issue.number});

    appendFooter({
        user: names[0],
        created: jsonObject.created_at});

    append(createElement("hr"));
}

function processPushData(jsonObject) {
    if (!jsonObject || !jsonObject.actor || !jsonObject.repo || !jsonObject.payload || !jsonObject.payload.commits) {
        return;
    }

    if (jsonObject.payload.commits.length > 1) {
        jsonObject.payload.commits.reverse();
    }

    for (var index = 0; index < jsonObject.payload.commits.length; index++) {
        if (!jsonObject.payload.commits[index]) {
            continue;
        }

        var commit = jsonObject.payload.commits[index];
        var names = jsonObject.repo.name.split("/");
        appendTitle({
            user: names[0],
            repo: names[1]});

        appendBody({
            user: names[0],
            repo: names[1],
            messages: commit.message.split(/\n\n/g),
            endpoint: "commit/" + commit.sha,
            display: commit.sha.substring(0, 7)});

        appendFooter({
            user: names[0],
            created: jsonObject.created_at});

        append(createElement("hr"));
    }
}

function clear() {
    var element = document.getElementById("changelog");
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
}

function append(element) {
    document.getElementById("changelog").appendChild(element);
}

function appendTitle(data) {
    if (!data) {
        return;
    }

    var titleElement = createElement("h2");
    titleElement.appendChild(createLink("https://github.com/" + data.user, data.user));
    titleElement.appendChild(createElement("span", " / "));
    titleElement.appendChild(createLink("https://github.com/" + data.user + "/" + data.repo, data.repo));
    append(titleElement);
}

function appendBody(data) {
    if (!data) {
        return;
    }

    var bodyElement = createElement("div");
    bodyElement.appendChild(createElement("h3", data.messages[0]));
    bodyElement.appendChild(createElement("h3", createLink("https://github.com/" + data.user + "/" + data.repo + "/" + data.endpoint, data.display)));
    append(bodyElement);
    if (data.messages.length > 1) {
        append(createElement("p", data.messages.slice(1).join(/\n/g, "<br>")));
    }
}

function appendFooter(data) {
    if (!data) {
        return;
    }

    var footerElement = createElement("h4");
    footerElement.appendChild(createLink("https://github.com/" + data.user, data.user));
    footerElement.appendChild(createElement("span", " - "));
    footerElement.appendChild(createTimeElement(data.created));
    append(footerElement);
}

function createLink(link, text) {
    if (!link || !text) {
        endpoint = "#";
        text = "Unknown";
    }

    var element = createElement("a", text);
    element.setAttribute("href", link);
    element.setAttribute("target", "_blank");
    element.setAttribute("rel", "noopener");
    return element;
}

function createElement(type, content) {
    var element = document.createElement(type);
    if (content) {
        if (content instanceof HTMLElement) {
            element.appendChild(content);
        } else {
            element.innerText = content;
        }
    }

    return element;
}

function createTimeElement(time) {
    var element = createElement("time");
    element.classList.add("timeago");
    element.setAttribute("datetime", time);
    return element;
}

initializeGitHub();