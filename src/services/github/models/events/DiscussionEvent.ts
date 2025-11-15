import type { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#discussionevent DiscussionEvent}
 */
export default interface DiscussionEvent {
  action: string;
  discussion: components["schemas"]["discussion"];
}