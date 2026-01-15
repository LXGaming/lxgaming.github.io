/**
 * {@link https://docs.github.com/en/rest/using-the-rest-api/github-event-types?apiVersion=2022-11-28#pushevent PushEvent}
 */
export default interface PushEvent {
  repository_id: number;
  push_id: number;
  ref: string;
  head: string;
  before: string;
}