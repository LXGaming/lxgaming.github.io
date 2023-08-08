/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#watchevent WatchEvent}
 */
export default interface WatchEvent {
  action: string;
}