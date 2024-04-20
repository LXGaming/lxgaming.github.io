import type { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#pullrequestreviewevent PullRequestReviewEvent}
 */
export default interface PullRequestReviewEvent {
  action: string;
  pull_request: components["schemas"]["pull-request-simple"];
  review: components["schemas"]["pull-request-review"];
}