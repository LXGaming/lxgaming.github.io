import type { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#issuecommentevent IssueCommentEvent}
 */
export default interface IssueCommentEvent {
  action: string;
  issue: components["schemas"]["issue"];
  comment: components["schemas"]["issue-comment"];
}