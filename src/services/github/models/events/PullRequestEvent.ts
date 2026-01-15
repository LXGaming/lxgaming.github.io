import type { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/rest/using-the-rest-api/github-event-types?apiVersion=2022-11-28#pullrequestevent PullRequestEvent}
 */
export default interface PullRequestEvent {
  action: "assigned" | "closed" | "labeled" | "merged" | "opened"  | "reopened" | "unassigned" | "unlabeled";
  number: number;
  pull_request: components["schemas"]["pull-request"];
  assignee?: components["schemas"]["simple-user"];
  assignees?: components["schemas"]["simple-user"][];
  label?: components["schemas"]["issue-event-label"];
  labels?: components["schemas"]["issue-event-label"][];
}