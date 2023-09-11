import { BaseModule } from "./base";

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
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export class BhRegistrationRequests extends BaseModule {
  public async getRegistrationPage(
    page: number,
    limit: number,
  ): Promise<GetRegistrationsResponse> {
    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    const response: GetRegistrationsResponse = await this.request(
      `registration?${queryParams.toString()}`,
    );
    return response;
  }

  public async getRegistration(ubid: string): Promise<Registration> {
    const response: Registration = await this.request(`registration/${ubid}`);
    return response;
  }
}
