import type { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/rest/using-the-rest-api/github-event-types?apiVersion=2022-11-28#memberevent MemberEvent}
 */
export default interface MemberEvent {
  action: "added";
  member: components["schemas"]["simple-user"];
}