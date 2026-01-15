import type { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/rest/using-the-rest-api/github-event-types?apiVersion=2022-11-28#discussionevent DiscussionEvent}
 */
export default interface DiscussionEvent {
  action: "created";
  discussion: components["schemas"]["discussion"];
}