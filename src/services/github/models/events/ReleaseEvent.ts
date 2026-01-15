import type { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/rest/using-the-rest-api/github-event-types?apiVersion=2022-11-28#releaseevent ReleaseEvent}
 */
export default interface ReleaseEvent {
  action: "published";
  release: components["schemas"]["release"];
}