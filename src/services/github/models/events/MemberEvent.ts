import { components } from "@octokit/openapi-types";

/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#memberevent MemberEvent}
 */
export default interface MemberEvent {
  action: string;
  member: components["schemas"]["simple-user"];
  changes?: {
    old_permission?: {
      from: string;
    };
  };
}