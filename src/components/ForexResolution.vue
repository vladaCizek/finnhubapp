<template>
  <div class="flex items-center font-bold">
    <div 
      v-for="resolution in forexCandleResolutionOptions" 
      :key="resolution"
      class="px-4 py-3 mx-1 bg-slate-200 hover:bg-sky-600 rounded cursor-pointer"
      :class="{'bg-sky-600 text-white': props.resolution.value === resolution.value, 'bg-slate-100 text-slate-400 pointer-events-none' : resolution.disabled}"
      @click="$emit('setResolution', resolution)"
    >{{ resolution.label }}</div>
  </div>
</template>

<script setup>
import { forexCandleResolutionOptions } from "../consts";
// eslint-disable-next-line no-undef
const props = defineProps({
  resolution: {
    type: Object
  },
})
</script>