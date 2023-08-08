import { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#commitcommentevent CommitCommentEvent}
 */
export default interface CommitCommentEvent {
  action: string;
  comment: components["schemas"]["commit-comment"];
}