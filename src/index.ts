import { BhSetupOptions } from "./module/base";
import { BhRegistrationRequests } from "./module/registration";
import { BhOccupancyRequests } from "./module/occupancy";

export default class BhApi {
  constructor(private readonly options: BhSetupOptions) {}

  public registration: BhRegistrationRequests = new BhRegistrationRequests(
    this.options,
  );
  public occupancy: BhOccupancyRequests = new BhOccupancyRequests(this.options);
}
