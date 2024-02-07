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
        class="p-2 w-full border border-primary rounded-lg text-xs text-primary-light placeholder:text-primary-light outline-primary"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label for="" class="text-primary font-medium text-sm">Password</label>
      <input
        v-model="data.password"
        type="password"
        placeholder="Password"
        class="p-2 w-full border border-primary rounded-lg text-xs text-primary-light placeholder:text-primary-light outline-primary"
      />
    </div>
    <button
      class="text-white text-sm w-full p-1.5 bg-primary cursor-pointer rounded-lg"
    >
      <span v-if="!showSignupForm"> Login </span>
      <span v-else>Sign Up</span>
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

const users = ref([]);

const router = useRouter();

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

const setlocalstorage = () => {
  const userdata = localStorage.getItem("users");
  users.value = userdata ? JSON.parse(userdata) : [];
};
onMounted(() => {
  setlocalstorage();
});

const signupfunc = () => {
  if (checkEmail()) {
    const payload = { ...data.value };
    users.value.push(payload);
    localStorage.setItem("users", JSON.stringify(users.value));
    localStorage.setItem("loginUser", JSON.stringify(payload));
    console.log(data.value);
    clearData();
    router.push({ name: "dashboard" });
  }
  console.log("signup");
};

const clearData = () => {
  (data.value.username = ""),
    (data.value.email = ""),
    (data.value.password = "");
};

const checkEmail = () => {
  let result = true;

  users.value.find((e) => {
    if (e.email.trim().toLowerCase() == data.value.email.trim().toLowerCase()) {
      alert("email already exist");
      result = false;
    } else {
      result = true;
    }
  });

  return result;
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

const loginfunc = () => {
  // console.log(users.value);
  const logginuser = users.value.find((e) => {
    if (e.email.trim().toLowerCase() == data.value.email.trim().toLowerCase()) {
      return e;
    }
  });

  if (logginuser) {
    if (data.value.password.trim() !== logginuser.password.trim()) {
      alert("incorrect password");
    } else {
      localStorage.setItem("loginUser", JSON.stringify(logginuser));
      router.push({ name: "dashboard" });
    }
  } else {
    alert("user does not exist");
  }

  clearData();
};
</script>
