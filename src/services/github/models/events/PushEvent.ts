/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#pushevent PushEvent}
 */
export default interface PushEvent {
  repository_id: number;
  push_id: number;
  ref: string;
  head: string;
  before: string;
}