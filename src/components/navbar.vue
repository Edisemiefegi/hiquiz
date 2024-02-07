<template>
  <nav class="flex justify-between py-8" :class="dark ? ' px-0' : 'px-10'">
    <p class="text-primary-light text-lg font-semibold">
      Welcome,
      <span :class="dark ? ' text-white' : 'text-primary'">
        {{ user && user.username }}</span
      >
    </p>
    <slot
      @click="quit"
      :class="dark ? ' bg-white text-primary' : 'bg-primary text-white'"
      class="text-sm w-24 p-1.5 cursor-pointer rounded-lg"
    />
  </nav>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  dark: Boolean,
});

const user = computed(() => {
  const loginuser = localStorage.getItem("loginUser");
  return loginuser ? JSON.parse(loginuser) : null;
});
</script>
