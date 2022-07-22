export class ForexRates {
  constructor(client, notification) {
    this.client = client;
    this.notification = notification;
    this.base = null;
    this.quote = [];
    this.isBusy = false;
    this.error = null;
  }

  getRates = async (base) => {
    if (base === this.base) return;
    this.isBusy = true;
    this.base = base;
    return new Promise((resolve, reject) => {
      this.client.forexRates({ base: base }, (error, data, response) => {
        console.log("getRates error", error);
        console.log("getRates data", data);
        console.log("getRates response", response);
        if (error) {
          this.error = error;
          this.notification(this.error, { type: "danger" });
          this.isBusy = false;
          reject();
        } else if (response.body?.error) {
          this.error = response.body.error;
          this.notification(this.error, { type: "danger" });
          this.isBusy = false;
        } else {
          this.quote = data.quote || [];
          this.isBusy = false;
          resolve();
        }
      });
    });
  };
}
