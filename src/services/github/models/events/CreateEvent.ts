/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#createevent CreateEvent}
 */
export default interface CreateEvent {
  ref: string;
  ref_type: string;
  master_branch: string;
  description: string;
  pusher_type: string;
}