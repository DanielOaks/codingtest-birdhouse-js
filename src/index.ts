import { BhSetupOptions } from "./interface/birdhouse.setup.options";
import { BhRegistrationRequests } from "./module/registration";

export default class BhApi {
  constructor(private readonly options: BhSetupOptions) { }

  public registration: BhRegistrationRequests = new BhRegistrationRequests(this.options);
}
