<template>
  <span class="relative flex h-3 w-3">
    <span 
      class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" 
      :class="props.color" 
    />
    <span 
      class="relative inline-flex rounded-full h-3 w-3" 
      :class="props.pulseColor" 
    />
  </span>
</template>

// script setup with defineProps
<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
  color: {
    type: String,
    default: 'bg-sky-500'
  },
  pulseColor: {
    type: String,
    default: 'bg-sky-400'
  },
})
</script>