/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#pushevent PushEvent}
 */
export default interface PushEvent {
  push_id: number;
  size: number;
  distinct_size: number;
  ref: string;
  head: string;
  before: string;
  commits: {
    sha: string;
    message: string;
    author: {
      name: string;
      email: string;
    };
    url: string;
    distinct: boolean;
  }[];
}