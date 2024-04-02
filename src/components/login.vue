<template>
  <form
    class="z-20 w-72 h-full bg-white p-6 flex flex-col gap-4"
    @submit.prevent="handlesubmit"
  >
    <p class="text-primary text-center font-medium text-lg">
      <span v-if="showSignupForm == false"> Login </span>
      <span v-else>Sign Up</span>
    </p>
    <div class="flex flex-col gap-2" v-if="showSignupForm == true">
      <label for="" class="text-primary text-sm font-medium">Username</label>
      <input
        v-model="data.username"
        type="text"
        inputmode="text"
        placeholder="Username"
        :disabled="loading"
        class="p-2 w-full border border-primary rounded-lg text-xs text-primary-light placeholder:text-primary-light outline-primary"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label for="" class="text-primary text-sm font-medium">Email</label>
      <input
        v-model="data.email"
        type="email"
        inputmode="email"
        placeholder="Email"
        :disabled="loading"
        class="p-2 w-full border border-primary rounded-lg text-xs text-primary-light placeholder:text-primary-light outline-primary"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label for="" class="text-primary font-medium text-sm">Password</label>
      <input
        v-model="data.password"
        type="password"
        placeholder="Password"
        :disabled="loading"
        class="p-2 w-full border border-primary rounded-lg text-xs text-primary-light placeholder:text-primary-light outline-primary"
      />
    </div>
    <button
      :class="loading ? 'cursor-none' : 'cursor-pointer'"
      class="text-white text-sm w-full p-1.5 bg-primary rounded-lg"
    >
      <span v-if="!showSignupForm">
        {{ loading ? "Loading..." : "Login" }}
      </span>
      <span v-else> {{ loading ? "Loading..." : "Signup" }}</span>
    </button>
    <button type="button" class="text-xs text-primary text-center">
      <span v-if="showSignupForm == false" @click="emit('toggle', true)"
        >Signup</span
      >
      <span v-else @click="emit('toggle', false)">Login</span>
    </button>
  </form>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useQuizStore } from "../../stores/store.js";

const store = useQuizStore();

const router = useRouter();
const loading = ref(false);

const props = defineProps({
  showSignupForm: Boolean,
});

const emit = defineEmits(["toggle"]);

const data = ref({
  username: "",
  email: "",
  password: "",
});

const handlesubmit = () => {
  if (validity()) {
    if (props.showSignupForm) {
      signupfunc();
    } else {
      loginfunc();
    }
  }
};

const signupfunc = async () => {
  try {
    loading.value = false;
    const payload = { ...data.value };
    await store.signup(payload);

    router.push({ name: "Dashboard" });

    clearData();
  } catch (error) {
    const msg = error.message.split(":")[1];
    alert(msg);
  } finally {
    loading.value = false;
  }
};

const loginfunc = async () => {
  try {
    loading.value = true;
    const payload = { ...data.value };
    await store.login(payload);

    router.push({ name: "Dashboard" });

    clearData();
  } catch (error) {
    const msg = error.message.split(" ")[2];
    alert(msg);
  } finally {
    loading.value = false;
  }
};

const clearData = () => {
  data.value.username = "";
  data.value.email = "";
  data.value.password = "";
};

const validity = () => {
  if (data.value.username.trim() == "" && props.showSignupForm == true) {
    alert("username is required");
    return false;
  } else if (data.value.email.trim() == "") {
    alert("email is required");
    return false;
  } else if (data.value.password.trim() == "") {
    alert("password is required");
    return false;
  } else {
    return true;
  }
};
</script>
