import type { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#issuesevent IssuesEvent}
 */
export default interface IssuesEvent {
  action: string;
  issue: components["schemas"]["issue"];
  assignee?: components["schemas"]["simple-user"];
  assignees?: components["schemas"]["simple-user"][];
  label?: components["schemas"]["issue-event-label"];
  labels?: components["schemas"]["issue-event-label"][];
}