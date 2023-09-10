import { BaseModule } from "./base";

export interface GetRegistrationsRequest {
  page: number;
  limit: number;
}

export interface Registration {
  value: string;
  birdhouse?: {
    ubidValue: string;
    name: string;
    longitude: number;
    latitude: number;
    lastOccupationUpdate: string;
  };
}

export interface GetRegistrationsResponse {
  items: Registration[];
  meta: {
    totalItems: number,
    itemCount: number,
    itemsPerPage: number,
    totalPages: number,
    currentPage: number,
  };
}

export class BhRegistrationRequests extends BaseModule {
  public async getRegistrations(info: GetRegistrationsRequest): Promise<GetRegistrationsResponse> {
    const queryParams = new URLSearchParams();
    queryParams.append('page', info.page.toString());
    queryParams.append('limit', info.limit.toString());
    return this.request(`registration?${ queryParams.toString() }`);
  }
}
