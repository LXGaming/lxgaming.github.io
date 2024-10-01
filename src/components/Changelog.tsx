"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { DateTime } from "luxon";
import { type ReactNode, useEffect, useRef } from "react";
import { parseEvent } from "@/services/github/EventService";
import {
  DefaultEventsPerPage,
  calculateEventPages,
  listPublicEventsForUserAsync
} from "@/services/github/GitHubService";
import GitHubError from "@/services/github/errors/GitHubError";
import type Event from "@/services/github/models/Event";
import type ParsedEvent from "@/services/github/models/ParsedEvent";
import type Problem from "@/services/github/models/Problem";

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
  const results = query.data?.pages.flat().filter(item => item.parsedEvent !== undefined) ?? [];

  const scrollElement = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: query.hasNextPage || query.isError ? results.length + 1 : results.length,
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
  if (props.event !== undefined) {
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
            {props.parsedEvent?.link !== undefined && (
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

  if (props.error !== undefined) {
    const problem: Problem | undefined = props.error instanceof GitHubError ? props.error.problem : undefined;

    return (
      <div className="flex flex-col items-center justify-center py-3">
        <p className="text-red-600">{problem?.message ?? props.error.message}</p>
        {problem?.documentation_url !== undefined && (
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