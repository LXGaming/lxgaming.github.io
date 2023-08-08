/**
 * {@link https://docs.github.com/en/webhooks-and-events/events/github-event-types#sponsorshipevent SponsorshipEvent}
 */
export default interface SponsorshipEvent {
  action: string;
  effective_date: string;
  changes?: {
    tier?: {
      from: {
        node_id: string;
        created_at: string;
        description: string;
        monthly_price_in_cents: number;
        monthly_price_in_dollars: number;
        name: string;
      };
    };
    privacy_level?: {
      from: string;
    };
  };
}