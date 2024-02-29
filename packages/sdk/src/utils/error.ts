import { BaseError, Hex, isHex } from 'viem';
import { KriptonioError } from '../Error';

export function formatViemError(error: BaseError): string {
  return [error.shortMessage, error.details].filter((part) => !!part).join(' ');
}

export function parseError(error: unknown): Error | unknown {
  if (error instanceof BaseError) {
    return new KriptonioError({
      message: formatViemError(error),
      cause: error,
    });
  }

  if (error instanceof KriptonioError) {
    return error;
  }

  return error;
}

export function assertHex(value: string, propertyName: string): Hex {
  if (!isHex(value)) {
    throw new KriptonioError({
      message: `Property ${propertyName} has invalid hex value: ${value}`,
    });
  }

  return value as Hex;
}
