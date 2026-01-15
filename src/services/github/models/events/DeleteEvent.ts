/**
 * {@link https://docs.github.com/en/rest/using-the-rest-api/github-event-types?apiVersion=2022-11-28#deleteevent DeleteEvent}
 */
export default interface DeleteEvent {
  ref: string;
  ref_type: "branch" | "tag";
  full_ref: string;
  pusher_type: string;
}