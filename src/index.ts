import { BhSetupOptions } from "./module/base";
import { BhRegistrationRequests } from "./module/registration";

export default class BhApi {
  constructor(private readonly options: BhSetupOptions) {}

  public registration: BhRegistrationRequests = new BhRegistrationRequests(
    this.options,
  );
}
