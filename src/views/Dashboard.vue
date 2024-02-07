<template>
  <navbar>
    <button
      type="button"
      @click="logoutFN"
      class="text-sm w-24 p-1.5 cursor-pointer rounded-lg bg-primary text-white"
    >
      Logout
    </button>
  </navbar>

  <div class="px-10 py-11 flex gap-7 flex-col">
    <div
      class="text-center text-primary-light flex flex-col gap-3"
      v-if="!savedscore.length"
    >
      <p>Oops.. Blank Test</p>
      <p>You haven’t taken any test.Tab the button below to start test now</p>
    </div>

    <div
      v-else
      class="flex flex-col w-80 gap-3 border-2 rounded-lg border-primary-light p-4"
    >
      <p class="text-primary font-medium">Completed Quizzes</p>
      <div
        v-for="(score, i) in savedscore"
        :key="i"
        class="flex sm:items-center justify-between px-3 py-2 h-9 bg-pink-100"
      >
        <p class="text-primary-light font-medium">{{ score.subject }}</p>
        <div class="border border-primary h-full"></div>
        <p class="text-primary font-medium">{{ score.score }}</p>
      </div>
    </div>

    <div class="flex flex-col gap-3 border-2 border-primary p-4">
      <p class="text-primary font-medium">Available Quizzes</p>
      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between px-3 py-2 bg-primary-light"
      >
        <p class="text-primary font-medium">Mathematics</p>
        <button
          @click="takeQuiz('mathematics')"
          class="text-primary text-center text-sm sm:w-40 w-full p-1.5 bg-white cursor-pointer rounded-lg"
        >
          Get Started
        </button>
      </div>
      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between px-3 py-2 bg-primary-light"
      >
        <p class="text-primary font-medium">English Language</p>
        <button
          @click="takeQuiz('english')"
          class="text-primary text-center text-sm sm:w-40 w-full p-1.5 bg-white cursor-pointer rounded-lg"
        >
          Get Started
        </button>
      </div>
    </div>

    <button
      @click="leadersboard"
      class="text-white text-sm sm:w-48 w-full p-1.5 bg-primary cursor-pointer rounded-lg"
    >
      Leaders Board
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Box from "../components/box.vue";
import navbar from "../components/navbar.vue";

const router = useRouter();

const user = ref(null);

const savedscore = ref([]);

const takeQuiz = (arg) => {
  router.push({ name: "Questions", query: { subject: arg } });
};

function logoutFN() {
  localStorage.removeItem("loginUser");
  router.push({ name: "auth" });
}

const getsavedscore = () => {
  const localscore = localStorage.getItem("results");
  let results = localscore ? JSON.parse(localscore) : [];

  if (results) {
    results = results.filter((el) => el.email == user.value.email);
    savedscore.value = results;
  }
};

const leadersboard = () => {
  router.push({
    name: "leadersboard",
  });
};

onMounted(() => {
  const loginuser = localStorage.getItem("loginUser");

  if (!loginuser) {
    router.push({ name: "auth" });
  } else {
    user.value = JSON.parse(loginuser);
    getsavedscore();
  }
});
</script>
