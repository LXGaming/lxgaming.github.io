import { formatCommitMessage } from "~/services/github/GitHubService";
import type Event from "~/services/github/models/Event";
import type ParsedEvent from "~/services/github/models/ParsedEvent";
import type CreateEvent from "~/services/github/models/events/CreateEvent";
import type DeleteEvent from "~/services/github/models/events/DeleteEvent";
import type ForkEvent from "~/services/github/models/events/ForkEvent";
import type IssueCommentEvent from "~/services/github/models/events/IssueCommentEvent";
import type IssuesEvent from "~/services/github/models/events/IssuesEvent";
import type PublicEvent from "~/services/github/models/events/PublicEvent";
import type PushEvent from "~/services/github/models/events/PushEvent";
import type ReleaseEvent from "~/services/github/models/events/ReleaseEvent";
import type WatchEvent from "~/services/github/models/events/WatchEvent";

export function parseEvent(event: Event<unknown>): ParsedEvent | undefined {
  switch (event.type) {
  case "CreateEvent":
    return parseCreateEvent(event as Event<CreateEvent>);
  case "DeleteEvent":
    return parseDeleteEvent(event as Event<DeleteEvent>);
  case "ForkEvent":
    return parseForkEvent(event as Event<ForkEvent>);
  case "IssueCommentEvent":
    return parseIssueCommentEvent(event as Event<IssueCommentEvent>);
  case "IssuesEvent":
    return parseIssuesEvent(event as Event<IssuesEvent>);
  case "PublicEvent":
    return parsePublicEvent(event as Event<PublicEvent>);
  case "PushEvent":
    return parsePushEvent(event as Event<PushEvent>);
  case "ReleaseEvent":
    return parseReleaseEvent(event as Event<ReleaseEvent>);
  case "WatchEvent":
    return parseWatchEvent(event as Event<WatchEvent>);
  }
}

function parseCreateEvent(event: Event<CreateEvent>): ParsedEvent {
  return {
    body: {
      summary: `New ${event.payload.ref_type} created`
    },
    link: {
      text: event.payload.ref,
      href: `https://github.com/${event.repo.name}/tree/${event.payload.ref}`
    }
  };
}

function parseDeleteEvent(event: Event<DeleteEvent>): ParsedEvent {
  return {
    body: {
      summary: `${event.payload.ref_type} deleted: ${event.payload.ref}`
    }
  };
}

function parseForkEvent(event: Event<ForkEvent>): ParsedEvent {
  return {
    body: {
      summary: "Forked"
    },
    link: {
      text: event.payload.forkee.name,
      href: event.payload.forkee.html_url
    }
  };
}

function parseIssueCommentEvent(event: Event<IssueCommentEvent>): ParsedEvent {
  return {
    body: {
      summary: `[commented] ${event.payload.issue.title}`
    },
    link: {
      text: `#${event.payload.issue.number}`,
      href: event.payload.comment.html_url
    }
  };
}

function parseIssuesEvent(event: Event<IssuesEvent>): ParsedEvent {
  return {
    body: {
      summary: `[${event.payload.action}] ${event.payload.issue.title}`
    },
    link: {
      text: `#${event.payload.issue.number}`,
      href: event.payload.issue.html_url
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function parsePublicEvent(event: Event<PublicEvent>): ParsedEvent {
  return {
    body: {
      summary: "Now open sourced!"
    }
  };
}

function parsePushEvent(event: Event<PushEvent>): ParsedEvent {
  let href;
  if (event.payload.commits.length > 1) {
    href = `https://github.com/${event.repo.name}/compare/${event.payload.before.substring(0, 7)}...${event.payload.head.substring(0, 7)}`;
  } else {
    href = `https://github.com/${event.repo.name}/commit/${event.payload.head}`;
  }

  return {
    body: {
      summary: `${event.payload.commits.length} new ${event.payload.commits.length === 1 ? "commit" : "commits"}`,
      description: event.payload.commits.flatMap(commit => formatCommitMessage(commit.message)[0]).slice(0, 5)
    },
    link: {
      text: event.payload.head.substring(0, 7),
      href: href
    }
  };
}

function parseReleaseEvent(event: Event<ReleaseEvent>): ParsedEvent {
  return {
    body: {
      summary: "New release published"
    },
    link: {
      text: event.payload.release.tag_name,
      href: event.payload.release.html_url
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function parseWatchEvent(event: Event<WatchEvent>): ParsedEvent {
  return {
    body: {
      summary: "Starred"
    }
  };
}