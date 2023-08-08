import { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#pullrequestreviewcommentevent PullRequestReviewCommentEvent}
 */
export default interface PullRequestReviewCommentEvent {
  action: string;
  changes?: {
    body?: {
      from: string;
    };
  };
  pull_request: components["schemas"]["pull-request-simple"];
  comment: components["schemas"]["pull-request-review-comment"];
}