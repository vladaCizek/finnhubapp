<template>
  <div class="py-2 font-bold text-3xl">
    <p>{{ props.name }}</p>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
  name: {
    type: String,
    required: true,
    default: ''
  }
})
</script>