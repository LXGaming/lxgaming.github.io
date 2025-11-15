import type { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#releaseevent ReleaseEvent}
 */
export default interface ReleaseEvent {
  action: string;
  release: components["schemas"]["release"];
}