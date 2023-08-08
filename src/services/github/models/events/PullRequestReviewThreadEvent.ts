import { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#pullrequestreviewthreadevent PullRequestReviewThreadEvent}
 */
export default interface PullRequestReviewThreadEvent {
  action: string;
  pull_request: components["schemas"]["pull-request-simple"];
  thread: components["schemas"]["thread"];
}