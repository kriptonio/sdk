import { BaseError } from 'viem';

interface ErrorInfo {
  code?: number | null;
  message?: string | null;
  cause?: ErrorInfo | BaseError | null;
}

type RpcError = {
  code: number;
  message?: string;
  data?: {
    cause: RpcError;
  };
};

export class KriptonioError extends Error {
  public code?: number;
  public cause?: KriptonioError | BaseError;

  public constructor(error: ErrorInfo) {
    super(error.message ?? undefined);
    this.code = error.code ?? undefined;

    if (error.cause) {
      this.cause =
        error.cause instanceof BaseError
          ? error.cause
          : new KriptonioError(error.cause);
    }
  }

  public static fromJsonRpcError = (
    error: RpcError | null
  ): KriptonioError | null => {
    if (!error) {
      return null;
    }

    return new KriptonioError({
      code: error.code,
      message: error.message ?? undefined,
      cause: error.data?.cause
        ? KriptonioError.fromJsonRpcError(error.data.cause)
        : undefined,
    });
  };
}
