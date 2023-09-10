import ky from 'ky';
import { BhSetupOptions } from '../interface/birdhouse.setup.options';

export abstract class BaseModule {

  constructor(private readonly options: BhSetupOptions) { }

  protected async request(endpoint: string, options?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        options['prefixUrl'] = this.options.apiBase;

        const res = await ky(endpoint, options);

        if (!res.ok) return reject(res);

        const data = await res.json();

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}
