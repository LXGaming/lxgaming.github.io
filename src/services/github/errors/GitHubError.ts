import HttpRequestError from "@/errors/HttpRequestError";
import type Problem from "@/services/github/models/Problem";

export default class GitHubError extends HttpRequestError {

  public readonly problem?: Problem;

  public constructor(message?: string, status?: number, problem?: Problem) {
    super(message, status);
    this.problem = problem;
  }
}