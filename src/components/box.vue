<template>
  <div
    @click="$emit('action')"
    :class="[border ? 'border-primary' : 'bg-primary text-white']"
    class="border w-96 rounded-lg text-sm p-4 cursor-pointer flex justify-between items-center"
  >
    <span>{{ name }}</span>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: "name",
  },

  border: {
    type: Boolean,
    default: false,
  },

  showLogout: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["action"]);
</script>

<style></style>
