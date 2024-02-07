<template>
  <navbar score />
  <div
    class="sm:flex-row flex flex-col gap-5 justify-between px-10 w-full sm:w-2/3"
  >
    <div class="flex flex-col gap-6 sm:w-2/3">
      <p class="text-primary font-semibold">{{ subject }}</p>

      <div class="flex flex-col gap-3 border-2 border-primary w-full p-3">
        <div class="flex justify-between text-primary text-sm">
          <p>Number of Correct answers</p>
          <p>{{ correctans }}</p>
        </div>
        <div class="w-full border border-primary"></div>
        <div class="flex justify-between text-primary text-sm">
          <p>Number of Wrong answers</p>
          <p>{{ wrongans }}</p>
        </div>
      </div>

      <button
        @click="GoHomepage"
        class="text-white text-sm w-28 p-1.5 bg-primary cursor-pointer rounded-lg"
      >
        Home
      </button>
    </div>

    <div class="sm:w-5/12 w-full flex justify-center">
      <div
        class="w-40 h-40 flex flex-col justify-center items-center rounded-full border-4 border-primary-light"
      >
        <p class="text-primary-light font-medium">Score</p>
        <p class="text-primary text-5xl font-semibold">{{ score }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import navbar from "./navbar.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  score: {
    type: Number,
  },
  correctans: {
    type: Number,
  },
  wrongans: {
    type: Number,
  },
  subject: {
    type: String,
  },
});

console.log(props.score);
console.log(props.correctans, props.wrongans);

const GoHomepage = () => {
  router.push({ name: "dashboard" });
};
</script>
