/**
 * Kriptonio Private API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: private
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import type { Feature } from './feature';


export interface BlockchainResponse { 
    id: string;
    fqdn: string;
    logoUrl: string;
    chainId: number;
    network: string;
    coin: string;
    coinDecimals: number;
    transactionUrlPrefix: string;
    blockUrlPrefix?: string | null;
    addressUrlPrefix: string;
    blockchain: string;
    testnet: boolean;
    faucetUrls: Array<string>;
    features: Array<Feature>;
}

