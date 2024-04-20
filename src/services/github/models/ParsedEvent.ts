export default interface ParsedEvent {
  body: {
    summary: string;
    description?: string[];
  };
  link?: {
    text: string;
    href?: string;
  };
}