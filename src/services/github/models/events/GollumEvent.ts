/**
 * {@link https://docs.github.com/en/rest/using-the-rest-api/github-event-types?apiVersion=2022-11-28#gollumevent GollumEvent}
 */
export default interface GollumEvent {
  pages: {
    page_name: string;
    title: string;
    summary?: string;
    action: "created" | "edited";
    sha: string;
    html_url: string;
  }[];
}