import { reactive } from "vue";

export function useSymbols(client) {
  const symbols = reactive({
    isBusy: false,
    data: [],
    error: null,
    selected: null,
  });

  const loadSymbols = async (symbolName) => {
    symbols.isBusy = true;
    return new Promise((resolve, reject) => {
      client.forexSymbols(symbolName, (error, data) => {
        if (error) {
          symbols.error = error;
          symbols.isBusy = false;
          reject();
        } else {
          symbols.selected = null;
          symbols.data = data || [];
          symbols.selected = data.length ? data[0] : null;
          symbols.isBusy = false;
          resolve();
        }
      });
    });
  };

  const flags = () => {
    return symbols.selected?.displaySymbol?.split("/") || [];
  };

  return {
    symbols,
    loadSymbols,
    flags,
  };
}
