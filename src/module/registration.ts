import { BaseModule } from "./base";

export interface Registration {
  value: string;
  birdhouse?: {
    ubidValue: string;
    name: string;
    longitude: number;
    latitude: number;
    lastOccupationUpdate: Date;
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tempResponse: any = await this.request(
      `registration?${queryParams.toString()}`,
    );
    const response: GetRegistrationsResponse = {
      meta: {
        totalItems: tempResponse.meta.totalItems,
        itemCount: tempResponse.meta.itemCount,
        itemsPerPage: tempResponse.meta.itemsPerPage,
        totalPages: tempResponse.meta.totalPages,
        currentPage: tempResponse.meta.currentPage,
      },
      items: [],
    };
    for (const item of tempResponse.items) {
      const newItem: Registration = {
        value: item.value,
      };
      if (item.birdhouse) {
        newItem.birdhouse = {
          ubidValue: item.birdhouse.ubidValue,
          name: item.birdhouse.name,
          longitude: item.birdhouse.longitude,
          latitude: item.birdhouse.latitude,
          lastOccupationUpdate: new Date(item.birdhouse.lastOccupationUpdate),
        };
      }
      response.items.push(newItem);
    }

    return response;
  }

  public async getRegistration(ubid: string): Promise<Registration> {
    const response: Registration = await this.request(`registration/${ubid}`);
    return response;
  }
}
