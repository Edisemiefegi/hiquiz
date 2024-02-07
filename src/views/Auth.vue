<template>
  <div
    class="flex items-center justify-center bg-primary w-screen min-h-screen relative overflow-hidden"
  >
    <div
      class="bg-primary-light w-3/5 border-8 border-white min-h-screen rotate-12 fixed md:-right-28 md:-top-16 -right-16 -top-10"
    ></div>

    <div class="flex justify-between w-3/5" v-if="!showForm">
      <div class="w-3/5">
        <p class="text-white md:text-3xl text-2xl font-light">Welcome to</p>
        <p class="text-white md:text-6xl text-4xl font-bold">
          Hi<span class="text-primary-light">Quiz</span>
        </p>
      </div>

      <div class="flex flex-col gap-5 w-2/5 z-20">
        <button
          @click="toggleSignUpForm(false)"
          class="sm:w-72 w-36 text-sm bg-white cursor-pointer font-medium text-primary rounded-md p-2"
        >
          Login
        </button>
        <button
          class="sm:w-72 w-36 text-sm bg-primary cursor-pointer font-medium text-white rounded-md p-2"
          @click="toggleSignUpForm(true)"
        >
          Sign Up
        </button>
      </div>
    </div>
    <Login v-else :showSignupForm="showSignupForm" @toggle="toggleSignUpForm" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Login from "../components/login.vue";

const showForm = ref(false);
const showSignupForm = ref(false);

const toggleSignUpForm = (arg) => {
  showForm.value = true;
  showSignupForm.value = arg;
};
</script>
