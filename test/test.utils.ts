import { KriptonioSdk } from '../src/Sdk';
import { testEnv } from './testEnv';

export function createSdkConfig() {
  return {
    apiUrl: 'http://localhost:8000',
    rpcApiUrl: 'http://localhost:5251',
    paymasterApiUrl: 'http://localhost:5050',
  };
}

export function createSdk() {
  const sdk = new KriptonioSdk({ accessToken: testEnv.sdk.accessToken });
  sdk.configure(createSdkConfig());

  return sdk;
}
