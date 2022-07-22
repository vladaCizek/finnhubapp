<template>
  <div class="flex items-center">
    <div class="currency-flag mr-2 rounded-full bg-center drop-shadow" :class="flagClassOne"></div>
    <div class="currency-flag rounded-full bg-center drop-shadow" :class="flagClassTwo"></div>
  </div>
</template>

<script setup>
import { toRefs, computed } from 'vue';
// eslint-disable-next-line no-undef
const props = defineProps({
  flags: {
    type: Array,
    required: true,
    default: () => []
  }
})

const { flags } = toRefs(props);

const flagClassOne = computed(() => {
  if(!flags.value.length) return '';
  return `currency-flag-${flags.value[0].toLowerCase()}`;
});

const flagClassTwo = computed(() => {
  if(!flags.value.length) return '';
  return `currency-flag-${flags.value[1].toLowerCase()}`;
});


</script>

<style scoped src='currency-flags/dist/currency-flags.min.css'></style> 
<style scoped>
.currency-flag {
  width: 36px !important;
  height: 36px !important;
}</style>