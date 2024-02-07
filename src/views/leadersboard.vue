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
        <span class="">{{ item.user && item.user.username }}</span>

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
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import navbar from "../components/navbar.vue";

const router = useRouter();
const results = ref("");
const Homepage = () => {
  router.push({ name: "dashboard" });
};

onMounted(() => {
  const leaders = localStorage.getItem("results");
  results.value = leaders ? JSON.parse(leaders) : [];

  let math = results.value.filter((el) => el.subject == "mathematics");
  let eng = results.value.filter((el) => el.subject == "english");

  math = math.sort((a, b) => b.score - a.score).slice(0, 5);
  eng = eng.sort((a, b) => b.score - a.score).slice(0, 5);

  results.value = [...math, ...eng];

  results.value = results.value.sort((a, b) =>
    a.subject.localeCompare(b.subject)
  );
});
</script>
