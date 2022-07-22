// export named class FinnhubClient Singleton
let instance = null;

export class FinnhubClient {
  constructor(client) {
    if (!instance) {
      instance = this;
    }

    this._client = client;
    return instance;
  }

  get client() {
    return this._client;
  }
}
