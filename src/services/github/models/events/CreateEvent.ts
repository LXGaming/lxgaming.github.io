/**
 * {@link https://docs.github.com/en/rest/using-the-rest-api/github-event-types?apiVersion=2022-11-28#createevent CreateEvent}
 */
export default interface CreateEvent {
  ref: string;
  ref_type: "branch" | "repository" | "tag";
  full_ref: string;
  master_branch: string;
  description: string;
  pusher_type: string;
}