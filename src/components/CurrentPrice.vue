<template>
  <div class="flex items-center justify-start text-4xl font-semibold tracking-tight	">
    
    <span v-if="!isInitiated && !price" class="ml-2">
      <inner-loader />
    </span>
    <span v-else>
      <span>{{ currencySymbol }}</span>
      <span>{{ parseFloat(price).toFixed(4) }}</span>
      <div class="text-sm" :class="diffClass">
        <span class="mr-2">{{absDiff}}</span>
        <span>{{percDiff}}%</span>
      </div>
    </span>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue';
import InnerLoader from './InnerLoader.vue';
// eslint-disable-next-line no-undef
const props = defineProps({
  price: {
    type: [Number, String, null],
    required: true,
    default: 'Price not available'
  },
  symbol: {
    type: [String, null],
    required: true,
    default: 'Symbol not available'
  },
  secondarySymbol: {
    type: [String, null],
    required: true,
    default: 'Secondary symbol not available'
  },
  forexRatesQuote: {
    type: Array,
    required: true,
    default: () => ([])
  },
  isInitiated: Boolean,
})

const getSymbolFromCurrency = inject('getSymbolFromCurrency');

const currencySymbol = computed(() => {
  return getSymbolFromCurrency(props.symbol) || props.symbol;
});

const openingPrice = computed(() => {
  return props.forexRatesQuote[props.secondarySymbol] || 0
});

const absDiff = computed(() => {
  return parseFloat(openingPrice.value - props.price || 0).toFixed(4)
});

const percDiff = computed(() => {
  return parseFloat(((openingPrice.value - props.price || 0) / openingPrice.value) * 100).toFixed(2)
});

const diffClass = computed(() => {
  return percDiff.value > 0 ? 'text-green-600' : 'text-red-600'
});

</script>