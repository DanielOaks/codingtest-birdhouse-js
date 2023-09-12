import { BhSetupOptions } from "./module/base.js";
import { BhRegistrationRequests } from "./module/registration.js";
import { BhOccupancyRequests } from "./module/occupancy.js";

export default class BhApi {
  constructor(private readonly options: BhSetupOptions) {}

  public registration: BhRegistrationRequests = new BhRegistrationRequests(
    this.options,
  );
  public occupancy: BhOccupancyRequests = new BhOccupancyRequests(this.options);
}
