import { StatusCodes, getReasonPhrase } from "http-status-codes";
import HttpRequestError from "@/errors/HttpRequestError";
import GitHubError from "@/services/github/errors/GitHubError";
import type Event from "@/services/github/models/Event";

export const MaximumEvents = 300;
export const DefaultEventsPerPage = 30;
export const MaximumEventsPerPage = 100;

export async function listPublicEventsForUserAsync(username: string, perPage: number = DefaultEventsPerPage, page: number = 1): Promise<Event<unknown>[]> {
  if (perPage <= 0 || perPage > MaximumEventsPerPage) {
    throw new Error(`PerPage is outside of the allowed range (1 ~ ${MaximumEventsPerPage})`);
  }

  const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=${perPage}&page=${page}`, {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  });
  await ensureStatusAsync(response, StatusCodes.OK, StatusCodes.NO_CONTENT);
  return await response.json() as Event<unknown>[];
}

export function calculateEventPages(perPage: number): number {
  return Math.floor(MaximumEvents / perPage);
}

export function formatCommitMessage(message: string): string[] {
  return message
    .split(/\n\n|\r\n|\r|\n/g)
    .map(message => message.trim())
    .filter(message => message.length !== 0)
    .filter(message => !/^(Co-authored|Signed-off)-by:/i.test(message));
}

export function formatRef(ref: string): string {
  return ref.startsWith("refs/heads/") ? ref.substring(11) : ref;
}

async function ensureStatusAsync(response: Response, ...statuses: number[]): Promise<void> {
  if (statuses.includes(response.status)) {
    return;
  }

  const message = getReasonPhrase(response.status);
  /* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
  if (response.status === StatusCodes.BAD_REQUEST || response.status === StatusCodes.UNAUTHORIZED
    || response.status === StatusCodes.FORBIDDEN || response.status === StatusCodes.NOT_FOUND
    || response.status === StatusCodes.UNPROCESSABLE_ENTITY) {
    const error = await response.json() as Error;
    throw new GitHubError(message, response.status, error);
  }
  /* eslint-enable @typescript-eslint/no-unsafe-enum-comparison */

  throw new HttpRequestError(message, response.status);
}