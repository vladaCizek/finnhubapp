import { reactive } from "vue";

export function useForexRates(client, notification) {
  const forexRates = reactive({
    base: null,
    secondary: null,
    quote: [],
    isBusy: false,
    error: null,
  });

  const getForexRates = async (base, secondary) => {
    if (base === forexRates.base) return;
    forexRates.isBusy = true;
    forexRates.base = base;
    forexRates.secondary = secondary;
    return new Promise((resolve, reject) => {
      client.forexRates({ base: base }, (error, data, response) => {
        if (error) {
          forexRates.error = error;
          notification(this.error, { type: "danger" });
          forexRates.isBusy = false;
          reject();
        } else if (response.body?.error) {
          forexRates.error = response.body.error;
          notification(this.error, { type: "danger" });
          forexRates.isBusy = false;
        } else {
          forexRates.quote = data.quote || [];
          forexRates.isBusy = false;
          resolve();
        }
      });
    });
  };

  return {
    forexRates,
    getForexRates,
  };
}
