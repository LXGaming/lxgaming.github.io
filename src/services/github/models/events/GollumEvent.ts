/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#gollumevent GollumEvent}
 */
export default interface GollumEvent {
  pages: {
    page_name: string;
    title: string;
    action: string;
    sha: string;
    html_url: string;
  }[];
}