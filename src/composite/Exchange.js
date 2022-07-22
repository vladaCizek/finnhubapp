export class Exchange {
  constructor(client) {
    this.client = client;
    this.isBusy = false;
    this.data = [];
    this.error = null;
    this.selected = null;
  }

  getExchanges = async () => {
    this.isBusy = true;
    return new Promise((resolve, reject) => {
      this.client.forexExchanges((error, data) => {
        if (error) {
          this.error = error;
          reject();
        } else {
          this.data = data || [];
          this.selected = null;
          if (!this.selected) {
            this.selected = data.length ? data[0] : null;
          }
          this.isBusy = false;
          resolve();
        }
      });
    });
  };

  selectExchange = (value) => {
    this.selected = value;
  };
}
