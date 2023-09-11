import ky from "ky";

export interface BhSetupOptions {
  apiBase: string;
}

export abstract class BaseModule {
  constructor(private readonly options: BhSetupOptions) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async request(endpoint: string, options?: any): Promise<any> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        if (options === undefined) {
          options = {};
        }
        options["prefixUrl"] = this.options.apiBase;

        const res = await ky(endpoint, options);

        if (!res.ok) return reject(res);

        const data: object = await res.json();

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}
