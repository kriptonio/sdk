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


export interface OrganizationSubscriptionLimitResponse { 
    canSponsorMainnetTransactions: boolean;
    canRunMainnetTransactions: boolean;
    monthlyApiCredits: number;
    endpoints: number;
    paymasters: number;
    monthlySponsoredTransactions: number;
    dedicatedEndpoints: number;
    smartContracts: number;
    ipfsSpaceMb: number;
    ipfsPins: number;
}

