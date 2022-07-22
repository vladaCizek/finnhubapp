import { forexCandleResolutionOptions } from "../consts";
import { reactive } from "vue";

export function useForexCandles(client) {
  const forexCandles = reactive({
    isBusy: false,
    isInitiated: false,
    series: [{ data: [] }],
    error: null,
    from: Date.now() - 3600 * 1000 * 24,
    to: Date.now(),
    resolution: forexCandleResolutionOptions[1], // 1h
    symbol: null,
  });

  const setResolution = (resolution) => {
    forexCandles.resolution = resolution;
    getForexCandles();
  };

  const getForexCandles = async (symbol) => {
    console.log("getForexCandles", symbol);
    if (symbol) forexCandles.symbol = symbol;
    client.forexCandles(
      forexCandles.symbol, //"OANDA:EUR_USD",
      forexCandles.resolution.value, //"D",
      forexCandles.from, //1590988249
      forexCandles.to, //1590988249
      (error, data) => {
        if (error) {
          forexCandles.error = error;
        } else {
          forexCandles.series[0].data = [];
          for (let i = 0; i < data.t.length; i++) {
            forexCandles.series[0].data.push({
              x: new Date(data.t[i]),
              y: [data.h[i], data.l[i], data.c[i], data.v[i]],
            });
          }
          forexCandles.isInitiated = true;
        }
        forexCandles.isBusy = false;
      }
    );
  };

  return {
    forexCandles,
    getForexCandles,
    setResolution,
  };
}
