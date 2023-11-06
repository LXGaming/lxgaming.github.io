"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { DateTime } from "luxon";
import { ReactNode, useEffect, useRef } from "react";
import {
  DefaultEventsPerPage,
  calculateEventPages,
  formatCommitMessage,
  listPublicEventsForUserAsync
} from "~/services/github/GitHubService";
import GitHubError from "~/services/github/errors/GitHubError";
import Event from "~/services/github/models/Event";
import Problem from "~/services/github/models/Problem";
import CreateEvent from "~/services/github/models/events/CreateEvent";
import DeleteEvent from "~/services/github/models/events/DeleteEvent";
import ForkEvent from "~/services/github/models/events/ForkEvent";
import IssueCommentEvent from "~/services/github/models/events/IssueCommentEvent";
import IssuesEvent from "~/services/github/models/events/IssuesEvent";
import PublicEvent from "~/services/github/models/events/PublicEvent";
import PushEvent from "~/services/github/models/events/PushEvent";
import ReleaseEvent from "~/services/github/models/events/ReleaseEvent";
import WatchEvent from "~/services/github/models/events/WatchEvent";

export default function Changelog(props: ChangelogProps) {
  const perPage = props.perPage ?? DefaultEventsPerPage;
  const maximumPages = calculateEventPages(perPage);

  const query = useInfiniteQuery({
    queryKey: ["events", props.username],
    queryFn: ({ pageParam }) => listPublicEventsForUserAsync(props.username, perPage, pageParam)
      .then(events => events.map(event => {
        return { event: event, parsedEvent: parseEvent(event) } as ChangelogItemProps;
      })),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // If GitHub returns fewer events than requested it's most likely the final page.
      if (lastPage.length !== perPage) {
        return undefined;
      }

      return allPages.length < maximumPages ? allPages.length + 1 : undefined;
    },
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    retryOnMount: false
  });
  const results = query.data != null ? query.data.pages.flat().filter(item => item.parsedEvent != null) : [];

  const scrollElement = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: query.hasNextPage ? results.length + 1 : results.length,
    getScrollElement: () => scrollElement.current,
    estimateSize: () => 100,
    overscan: 5
  });
  const items = virtualizer.getVirtualItems();

  useEffect(() => {
    // console.debug("isError: %s, isFetching: %s, hasNextPage: %s", query.isError, query.isFetching, query.hasNextPage);
    if (query.isError || query.isFetching || !query.hasNextPage || results.length === 0 || items.length === 0) {
      return;
    }

    const lastItem = items[items.length - 1];
    if (lastItem.index < results.length - 1) {
      return;
    }

    // console.debug("Fetching next page...");
    void query.fetchNextPage();
  }, [results.length, items, query]);

  return (
    <div className="shadow-lg shadow-neutral-900" data-nosnippet="true">
      <div className="flex justify-between px-3 py-2 rounded-t bg-neutral-900 text-white">
        <p className="uppercase">Changelog</p>
        <a className="text-blue-600" href={`https://github.com/${props.username}`} target="_blank" rel="noopener">{props.username}</a>
      </div>
      <div ref={scrollElement} className="max-h-[375px] overflow-auto px-3 rounded-b bg-white">
        <div className="divide-y divide-neutral-600 relative" style={{
          height: `${virtualizer.getTotalSize()}px`
        }}>
          {virtualizer.getVirtualItems().map(item => (
            <div key={item.key} data-index={item.index} ref={virtualizer.measureElement} style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${item.start}px)`
            }}>
              <ChangelogItem {...results[item.index]} error={query.error ?? undefined}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export interface ChangelogProps {
  username: string;
  perPage?: number;
}

function ChangelogItem(props: ChangelogItemProps): ReactNode {
  if (props.event != null) {
    const [user, repository] = props.event.repo.name.split("/");
    return (
      <div className="flex justify-between py-3">
        <div className="pr-3">
          <div className="text-xl">
            <a className="text-blue-600" href={`https://github.com/${user}`} target="_blank" rel="noopener">{user}</a>
            <span> / </span>
            <a className="text-blue-600" href={`https://github.com/${user}/${repository}`} target="_blank" rel="noopener">{repository}</a>
          </div>
          <div>
            <p>{props.parsedEvent?.body.summary ?? props.event.type}</p>
            {props.parsedEvent?.body.description?.map((value, index) => <p key={index} className="text-neutral-700">{value}</p>)}
          </div>
        </div>

        <div className="flex flex-col flex-shrink-0 justify-between pl-2 text-right">
          <div>
            {props.parsedEvent?.link != null && (
              <a className="text-blue-600" href={props.parsedEvent.link.href} target="_blank" rel="noopener">{props.parsedEvent.link.text}</a>
            )}
          </div>
          <div>
            <time dateTime={props.event.created_at}>{DateTime.fromISO(props.event.created_at).toRelative()}</time>
          </div>
        </div>
      </div>
    );
  }

  if (props.error != null) {
    const problem: Problem | undefined = props.error instanceof GitHubError ? props.error.problem : undefined;

    return (
      <div className="flex flex-col items-center justify-center py-3">
        <p className="text-red-600">{problem?.message ?? props.error.message}</p>
        {problem?.documentation_url != null && (
          <a className="text-blue-600" href={problem.documentation_url}>{problem.documentation_url}</a>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-3">
      <p>Loading...</p>
    </div>
  );
}

interface ChangelogItemProps {
  error?: Error;
  event?: Event<unknown>;
  parsedEvent?: ParsedEvent;
}

interface ParsedEvent {
  body: {
    summary: string;
    description?: string[];
  };
  link?: {
    text: string;
    href?: string;
  };
}

function parseEvent(event: Event<unknown>): ParsedEvent | undefined {
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