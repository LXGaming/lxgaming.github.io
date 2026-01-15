import type { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/rest/using-the-rest-api/github-event-types?apiVersion=2022-11-28#pullrequestreviewcommentevent PullRequestReviewCommentEvent}
 */
export default interface PullRequestReviewCommentEvent {
  action: "created";
  pull_request: components["schemas"]["pull-request-simple"];
  comment: components["schemas"]["pull-request-review-comment"];
}