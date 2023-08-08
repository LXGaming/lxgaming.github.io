import { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#issuesevent IssuesEvent}
 */
export default interface IssuesEvent {
  action: string;
  issue: components["schemas"]["issue"];
  changes?: {
    title?: {
      from: string;
    };
    body?: {
      from: string;
    };
  };
  assignee?: components["schemas"]["simple-user"];
  label?: components["schemas"]["issue-event-label"];
}