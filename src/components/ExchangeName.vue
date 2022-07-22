<template>
  <div class="flex items-center bg-slate-100 px-4 py-1 rounded-2xl">
    <inner-pulsar class="mr-2" :color="pulsarColors.color" :pulse-color="pulsarColors.pulseColor" />
    <span>{{ props.name }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import InnerPulsar from './InnerPulsar.vue';
// eslint-disable-next-line no-undef
const props = defineProps({
  isConnected: Boolean,
  name: {
    type: String,
    required: true,
    default: ''
  }
})

const pulsarColors = computed(() => {
  if(props.isConnected) {
    return {
      color: 'bg-green-500',
      pulseColor: 'bg-green-400'
    }
  }

  return {
    color: 'bg-red-500',
    pulseColor: 'bg-red-400'
  }
})
</script>