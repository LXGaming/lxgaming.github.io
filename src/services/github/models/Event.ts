import type { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#event-object-common-properties Event}
 */
export default interface Event<Payload> {
  id: string;
  type: EventTypes;
  actor: components["schemas"]["actor"];
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: Payload;
  public: boolean;
  created_at: string;
  org?: components["schemas"]["actor"];
}

export type EventTypes =
  | "CommitCommentEvent"
  | "CreateEvent"
  | "DeleteEvent"
  | "ForkEvent"
  | "GollumEvent"
  | "IssueCommentEvent"
  | "IssuesEvent"
  | "MemberEvent"
  | "PublicEvent"
  | "PullRequestEvent"
  | "PullRequestReviewEvent"
  | "PullRequestReviewCommentEvent"
  | "PullRequestReviewThreadEvent"
  | "PushEvent"
  | "ReleaseEvent"
  | "SponsorshipEvent"
  | "WatchEvent";