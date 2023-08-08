/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#deleteevent DeleteEvent}
 */
export default interface DeleteEvent {
  ref: string;
  ref_type: string;
  pusher_type: string;
}