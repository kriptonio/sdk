import { ApiErrorCode } from '../types/api/apiErrorCode';
import { ApiErrorResponse } from '../types/api/apiErrorResponse';
import { ExternalApiServiceError } from '../types/api/externalApiServiceError';

export class ApiError {
  public message: string | null = null;

  public code: ApiErrorCode | null = null;

  private cause: ExternalApiServiceError | null = null;

  private httpCode: number | null = null;

  public stringify = (): string => {
    const parts: string[] = [];

    if (this.code) {
      parts.push(`[${this.code}]`);
    }

    if (this.message) {
      parts.push(this.message);
    }

    const rootCause = this.getRootCause(this.cause);
    if (rootCause) {
      parts.push('caused by');

      if (rootCause.code) {
        parts.push(`[${rootCause.code}]`);
      }

      if (rootCause.message) {
        parts.push(rootCause.message);
      }
    }

    if (!parts.length && this.httpCode) {
      parts.push(this.httpCode.toString());
    }

    return parts.join(' ');
  };

  public get rootCause(): ExternalApiServiceError | null {
    return this.getRootCause(this.cause);
  }

  private getRootCause = (
    error: ExternalApiServiceError | null
  ): ExternalApiServiceError | null => {
    if (!error) {
      return null;
    }

    if (error.cause) {
      return this.getRootCause(error.cause);
    }

    return error;
  };

  public static from = (dto: ApiErrorResponse, httpCode: number) => {
    const model = new ApiError();

    model.message = dto.message ?? null;
    model.code = dto.code;
    model.cause = dto.cause ?? null;
    model.httpCode = httpCode;

    return model;
  };
}
