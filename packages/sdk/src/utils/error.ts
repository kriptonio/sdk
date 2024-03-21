import { BaseError, Hex, isHex } from 'viem';
import { KriptonioError } from '../Error';

export function parseError(error: unknown): Error | unknown {
  const parsedViemError = parseViemError(error);
  if (parsedViemError) {
    return parsedViemError;
  }

  if (error instanceof KriptonioError) {
    return error;
  }

  return error;
}

function parseViemError(error: unknown): KriptonioError | null {
  // not using instanceof because if dependency library has different version of viem,
  // it will return false negative
  const viemError = error as BaseError;

  if (viemError.details || viemError.shortMessage) {
    if (viemError.cause) {
      const causeViemError = viemError.cause as BaseError;
      if (causeViemError.details || causeViemError.shortMessage) {
        return parseViemError(causeViemError);
      }
    }

    return new KriptonioError({
      message: viemError.details ?? viemError.shortMessage,
      cause: viemError,
    });
  }

  return null;
}

export function assertHex(value: string, propertyName: string): Hex {
  if (!isHex(value)) {
    throw new KriptonioError({
      message: `Property ${propertyName} has invalid hex value: ${value}`,
    });
  }

  return value as Hex;
}
