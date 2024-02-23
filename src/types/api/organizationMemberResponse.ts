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
import type { UserResponse } from './userResponse';
import type { OrganizationResponse } from './organizationResponse';
import type { OrganizationRole } from './organizationRole';


export interface OrganizationMemberResponse { 
    id: string;
    organization: OrganizationResponse;
    user: UserResponse;
    role: OrganizationRole;
}
export namespace OrganizationMemberResponse {
}


