import { BaseModule } from "./base";

export interface OccupancyState {
  id: string;
  eggs: number;
  birds: number;
  createdAt: Date;
}

export interface GetOccupancyResponse {
  items: OccupancyState[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export class BhOccupancyRequests extends BaseModule {
  public async getOccupancy(
    ubid: string,
    page: number,
    limit: number,
  ): Promise<GetOccupancyResponse> {
    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tempResponse: any = await this.request(
      `house/${ubid}/occupancy?${queryParams.toString()}`,
      {
        headers: {
          "X-UBID": ubid,
        },
      },
    );

    const response: GetOccupancyResponse = {
      items: [],
      meta: tempResponse.meta,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tempResponse.items.forEach((element: any) => {
      response.items.push({
        id: element.id,
        eggs: element.eggs,
        birds: element.birds,
        createdAt: new Date(element.created_at),
      });
    });

    return response;
  }
}
