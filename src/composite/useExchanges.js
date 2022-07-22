import { reactive } from "vue";

export function useExchanges(client) {
  const exchanges = reactive({
    isBusy: false,
    data: [],
    error: null,
    selected: null,
  });

  const getExchanges = async () => {
    exchanges.isBusy = true;
    return new Promise((resolve, reject) => {
      client.forexExchanges((error, data) => {
        if (error) {
          exchanges.error = error;
          reject();
        } else {
          exchanges.data = data || [];
          exchanges.selected = null;
          exchanges.selected = data.length ? data[0] : null;
          exchanges.isBusy = false;
          resolve();
        }
      });
    });
  };

  const selectExchange = (value) => {
    exchanges.selected = value;
  };

  return {
    exchanges,
    getExchanges,
    selectExchange,
  };
}
