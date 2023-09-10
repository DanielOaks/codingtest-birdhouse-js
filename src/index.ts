import { BhSetupOptions } from "./interface/birdhouse.setup.options";
import { BhRegistrationRequests } from "./module/registration";

export default class BHApi {
  constructor(private readonly options: BhSetupOptions) { }

  public registration: BhRegistrationRequests = new BhRegistrationRequests(this.options);
}
