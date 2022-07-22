<template>
  <div>
    <div class="container mx-auto tracking-tight px-8">

      <h1 class="text-6xl font-semibold mt-6 mb-8 ">Forex Exchange</h1>
      
      <div class="mb-8">
        <select class="rounded-xl mr-4 text-slate-700 border-slate-400" @change="(e) => selectExchange(e.target.value)">
          <option 
            v-for="(option, i) in exchanges.data" 
            :key="`ex-${i}`" 
            :value="option"
            :selected="exchanges.selected === option"
          >{{option}}</option>
        </select>
          
        <select class="rounded-xl text-slate-700 border-slate-400" v-model="symbols.selected">
          <option 
            v-for="(option, i) in symbols.data" 
            :key="`ex-sy-${i}`" 
            :value="option"
            :selected="symbols.selected.symbol === option.symbol"
          >{{option.displaySymbol}}</option>
        </select>
      </div>

      <div class="relative mx-auto max-w-6xl">

        <div class="mb-8">
          <div class="flex items-center">
            <currency-flags class="mr-4" :flags="flags()" />
            <exchange-name :name="exchanges.selected" :is-connected="!exchanges.isBusy && !symbols.isBusy" />
          </div>
          <div class="flex w-full justify-between">
            <currency-pair :name="symbols.selected?.displaySymbol || ''" />
            <current-price 
              :price="tradeSocket.price" 
              :symbol="forexRates.base" 
              :secondary-symbol="forexRates.secondary"
              :isInitiated="tradeSocket.isIniated" 
              :forex-rates-quote="forexRates.quote"
            />
          </div>
        </div>

        <div v-if="forexCandles.isInitiated" >
        <!-- candlestick -->
          <apexchart 
            type="area"
            height="350" 
            :options="chartOptions"
            :series="forexCandles.series"
          />

          <div class="flex justify-center">
            <forex-resolution 
              :resolution="forexCandles.resolution" 
              @setResolution="setResolution" 
            />
          </div>
        </div>

      </div>

    </div>
  </div>
</template> 

<script setup>
import { reactive, inject, watch, onBeforeUnmount } from 'vue';

import CurrencyFlags from './CurrencyFlags.vue';
import ExchangeName from './ExchangeName.vue';
import CurrencyPair from './CurrencyPair.vue';
import CurrentPrice from './CurrentPrice.vue'
import ForexResolution from './ForexResolution.vue'

import { useSymbols  } from '../composite/useSymbols';
import { useExchanges } from '../composite/useExchanges';
import { useForexCandles } from '../composite/useForexCandles';
import { useForexRates } from '../composite/useForexRates';
import { TradeSocket } from '../composite/TradeSocket';

onBeforeUnmount(() => {
  if(tradeSocket) {
    tradeSocket.socket.onclose = function () {}
    tradeSocket.socket.close();
  }
});

const client = inject('client');
const socketAddress = inject('socketAddress');
const moshaToast = inject('moshaToast');
const { exchanges, getExchanges, selectExchange } = useExchanges(client)
const { symbols, loadSymbols, flags } = useSymbols(client);
const { forexCandles, getForexCandles, setResolution} = useForexCandles(client, symbols.selected)
const { forexRates, getForexRates } = useForexRates(client, moshaToast)


const chartOptions = {
  xaxis: {
    type: 'datetime'
  },
  stroke: {
    width: 2
  },
  yaxis: {
    tooltip: {
      enabled: true
    }
  }
}

await getExchanges();
let tradeSocket = reactive(new TradeSocket(socketAddress, moshaToast))

watch(() => exchanges.selected, (newValue) => {
  if(newValue) loadSymbols(newValue);
}, { immediate: true });

watch(() => symbols.selected, (newValue, oldValue) => {
  if(!newValue) return;
  const [base, secondary] = newValue?.displaySymbol?.split('/')
  getForexCandles(newValue.symbol);
  getForexRates(base, secondary);
  tradeSocket.init(newValue?.symbol, oldValue?.symbol);
});

</script>