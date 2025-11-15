import type { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#forkevent ForkEvent}
 */
export default interface ForkEvent {
  action: string;
  forkee: components["schemas"]["repository"];
}