import { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#pullrequestevent PullRequestEvent}
 */
export default interface PullRequestEvent {
  action: string;
  number: number;
  changes?: {
    title?: {
      from: string;
    };
    body?: {
      from: string;
    };
  };
  pull_request: components["schemas"]["pull-request"];
}