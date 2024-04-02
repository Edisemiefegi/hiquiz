<template>
  <navbar>
    <p class="font-medium text-lg text-primary">Leadersboard</p>
  </navbar>

  <div class="flex flex-col gap-6 px-10">
    <div class="flex flex-col gap-5">
      <div class="grid grid-cols-3 gap-5">
        <span class="text-primary font-semibold">Names</span>
        <span class="text-primary font-semibold">Subject</span>
        <span class="text-primary font-semibold">Score</span>
      </div>

      <div
        class="grid grid-cols-3 gap-5 font-semibold capitalize"
        v-for="(item, i) in results"
        :key="i"
      >
        <span class="">{{ item.username }}</span>

        <span class="text-primary-light">{{ item.subject }}</span>

        <span class="font-semibold">{{ item.score }}</span>
      </div>
    </div>

    <button
      @click="Homepage"
      class="text-white text-center text-sm w-32 p-1.5 bg-primary cursor-pointer rounded-lg"
    >
      Home
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import navbar from "../components/navbar.vue";
import { useQuizStore } from "../../stores/store.js";

const router = useRouter();
const store = useQuizStore();

const Homepage = () => {
  router.push({ name: "Dashboard" });
};

const results = computed(() => store.getallScores);

onMounted(() => {
  store.leaders();
});
</script>
