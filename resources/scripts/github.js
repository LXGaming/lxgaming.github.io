function initializeGitHub() {
    createHttpRequest("https://api.github.com/users/LXGaming/events/public", getPublicEventsData);
}

function getPublicEventsData(xhr, status) {
    if (status !== "success") {
        Materialize.toast("An error occurred", 5000);
        return;
    }

    let data = xhr.responseJSON;
    let array = new Array();
    for (let index = 0; index < data.length; index++) {
        if (!data[index]) {
            continue;
        } else if (data[index].type === "CreateEvent") {
            getCreateData(array, data[index]);
        } else if (data[index].type === "IssueCommentEvent") {
            getIssueCommentData(array, data[index]);
        } else if (data[index].type === "IssuesEvent") {
            getIssuesData(array, data[index]);
        } else if (data[index].type === "PushEvent") {
            getPushData(array, data[index])
        }
    }

    for (let index = 0; index < array.length; index++) {
        if (!array[index]) {
            continue;
        }

        let header = document.createElement("li");
        header.setAttribute("class", "collection-header");
        $(header).append(array[index].header);

        let item = document.createElement("li");
        item.setAttribute("class", "collection-item");
        $(item).append(array[index].identifier);
        $(item).append(array[index].title);
        if (array[index].message) {
            $(item).append(array[index].message);
        }
        
        $(item).append(array[index].footer);
        $(item).append("<br>");
        $(".collection").append(header, item);
    }

    $("time.timeago").timeago();
    $(".hide").removeClass("hide");
}

function getCreateData(array, jsonObject) {
    if (!jsonObject || !jsonObject.actor || !jsonObject.payload || !jsonObject.repo) {
        return;
    }

    let data = new Object();
    data.header = formatHeader(jsonObject.repo.name);

    if (jsonObject.payload.ref_type === "tag") {
        return;
    } else if (jsonObject.payload.ref_type === "repository") {
        data.title = formatTitle("Created new repository");
    } else if (jsonObject.payload.ref_type === "branch") {
        data.identifier = formatIdentifier(jsonObject.payload.ref, getUrl(jsonObject.repo.name) + "tree/" + jsonObject.payload.ref + "/");
        data.title = formatTitle("Created new branch");
    }

    data.footer = formatFooter(jsonObject.actor.display_login, jsonObject.created_at);
    array.push(data);
}

function getIssueCommentData(array, jsonObject) {
    if (!jsonObject || !jsonObject.actor || !jsonObject.payload || !jsonObject.repo || !jsonObject.payload.issue || !jsonObject.payload.comment) {
        return;
    }

    let data = new Object();
    data.header = formatHeader(jsonObject.repo.name);
    data.identifier = formatIdentifier("#" + jsonObject.payload.issue.number, jsonObject.payload.comment.html_url);
    data.title = formatTitle(jsonObject.payload.issue.title);
    data.footer = formatFooter(jsonObject.actor.display_login, jsonObject.created_at);
    array.push(data);
}

function getIssuesData(array, jsonObject) {
    if (!jsonObject || !jsonObject.actor || !jsonObject.payload || !jsonObject.repo || !jsonObject.payload.issue) {
        return;
    }

    let data = new Object();
    data.header = formatHeader(jsonObject.repo.name);
    data.identifier = formatIdentifier("#" + jsonObject.payload.issue.number, jsonObject.payload.issue.html_url);
    data.title = formatTitle(jsonObject.payload.issue.title);
    data.footer = formatFooter(jsonObject.actor.display_login, jsonObject.created_at);
    array.push(data);
}

function getPushData(array, jsonObject) {
    if (!jsonObject || !jsonObject.actor || !jsonObject.payload || !jsonObject.repo || !jsonObject.payload.commits) {
        return;
    }

    if (jsonObject.payload.commits.length > 1) {
        jsonObject.payload.commits.reverse();
    }

    for (let index = 0; index < jsonObject.payload.commits.length; index++) {
        if (!jsonObject.actor || !jsonObject.repo || !jsonObject.payload.commits[index]) {
            continue;
        }

        let data = new Object();
        data.header = formatHeader(jsonObject.repo.name);
        data.identifier = formatIdentifier(getCommitHash(jsonObject.payload.commits[index].sha), getUrl(jsonObject.repo.name) + "commit/" + jsonObject.payload.commits[index].sha);

        if (jsonObject.payload.commits[index].message && jsonObject.payload.commits[index].message.split(/\n\n/g).length > 1) {
            data.title = formatTitle(jsonObject.payload.commits[index].message.split(/\n\n/g)[0]);
            data.message = formatMessage(jsonObject.payload.commits[index].message.split(/\n\n/g).slice(1).join(/\n/g).replace(/\n/g, "<br>"));
        } else {
            data.title = formatTitle(jsonObject.payload.commits[index].message);
        }

        data.footer = formatFooter(jsonObject.actor.display_login, jsonObject.created_at);
        array.push(data);
    }
}

function formatHeader(name) {
    let element = "<h2 class=\"truncate\"><a href=\"[ACTOR_URL]\" target=\"_blank\">[ACTOR]</a> / <a href=\"[REPO_URL]\" target=\"_blank\">[REPO]</a></h2>";
    if (!name || name.split("/").length != 2) {
        return element.replace("[ACTOR_URL]", "#").replace("[ACTOR]", "Unknown").replace("[REPO_URL]", "#").replace("[REPO]", "Unknown");
    }

    let actor = name.split("/")[0];
    let repo = name.split("/")[1];
    return element.replace("[ACTOR_URL]", getUrl(actor)).replace("[ACTOR]", actor).replace("[REPO_URL]", getUrl(name)).replace("[REPO]", repo);
}

function formatIdentifier(identifier, identifierUrl) {
    let element = "<span class=\"secondary-content\"><h6><a href=\"[IDENTIFIER_URL]\" target=\"_blank\">[IDENTIFIER]</a></h6></span>";
    if (!identifier) {
        return element.replace("[IDENTIFIER_URL]", "#").replace("[IDENTIFIER]", "Unknown");
    }

    return element.replace("[IDENTIFIER]", identifier).replace("[IDENTIFIER_URL]", identifierUrl);
}

function formatTitle(title) {
    let element = "<h4>[TITLE]</h4>";
    if (!title) {
        return element.replace("[TITLE]", "Unknown");
    }

    return element.replace("[TITLE]", title);
}

function formatMessage(message) {
    let element = "<h6>[MESSAGE]</h6>";
    if (!message) {
        return element.replace("[MESSAGE]", "Unknown");
    }

    return element.replace("[MESSAGE]", message);
}

function formatFooter(actor, created) {
    let element = "<span class=\"secondary-content\"><h6><a href=\"[ACTOR_URL]\" target=\"_blank\">[ACTOR]</a> - <time class=\"timeago\" datetime=\"[CREATED]\"></time></h6></span>"
    if (!actor || !created) {
        return element.replace("[ACTOR_URL]", "#").replace("[ACTOR]", "Unknown").replace("[CREATED]", "Unknown");
    }

    return element.replace("[ACTOR_URL]", getUrl(actor)).replace("[ACTOR]", actor).replace("[CREATED]", created);
}

function getUrl(name) {
    let url = "https://github.com/";
    let actor = name.split("/")[0];
    let repo = name.split("/")[1];

    if (actor) {
        url += actor + "/";
    }

    if (repo) {
        url += repo + "/";
    }

    return url;
}

function getCommitHash(hash) {
    if (hash && hash.length >= 7) {
        return hash.substring(0, 7);
    }
}