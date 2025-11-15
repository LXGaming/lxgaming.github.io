import type { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#pullrequestevent PullRequestEvent}
 */
export default interface PullRequestEvent {
  action: string;
  number: number;
  pull_request: components["schemas"]["pull-request"];
  assignee?: components["schemas"]["simple-user"];
  assignees?: components["schemas"]["simple-user"][];
  label?: components["schemas"]["issue-event-label"];
  labels?: components["schemas"]["issue-event-label"][];
}