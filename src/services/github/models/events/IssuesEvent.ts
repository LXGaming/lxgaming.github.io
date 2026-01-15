import type { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/rest/using-the-rest-api/github-event-types?apiVersion=2022-11-28#issuesevent IssuesEvent}
 */
export default interface IssuesEvent {
  action: "closed" | "opened" | "reopened";
  issue: components["schemas"]["issue"];
  assignee?: components["schemas"]["simple-user"];
  assignees?: components["schemas"]["simple-user"][];
  label?: components["schemas"]["issue-event-label"];
  labels?: components["schemas"]["issue-event-label"][];
}