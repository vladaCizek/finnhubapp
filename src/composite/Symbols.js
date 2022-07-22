export class Symbols {
  constructor(client) {
    this.client = client;
    this.isBusy = false;
    this.data = [];
    this.error = null;
    this.selected = null;
  }

  loadSymbols = async (symbolName) => {
    this.isBusy = true;
    return new Promise((resolve, reject) => {
      this.client.forexSymbols(symbolName, (error, data) => {
        if (error) {
          this.error = error;
          this.isBusy = false;
          reject();
        } else {
          this.selected = null;
          this.data = data || [];
          this.selected = data.length ? data[0] : null;
          this.isBusy = false;
          resolve();
        }
      });
    });
  };

  selectSymbol = (symbol) => {
    this.selected = symbol;
  };

  get flags() {
    return this.selected?.displaySymbol?.split("/") || [];
  }
}
