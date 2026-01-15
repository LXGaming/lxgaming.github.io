import type { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/rest/using-the-rest-api/github-event-types?apiVersion=2022-11-28#pullrequestreviewevent PullRequestReviewEvent}
 */
export default interface PullRequestReviewEvent {
  action: "created" | "dismissed" | "updated";
  pull_request: components["schemas"]["pull-request-simple"];
  review: components["schemas"]["pull-request-review"];
}