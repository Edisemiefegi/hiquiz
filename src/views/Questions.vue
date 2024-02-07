<template>
  <div v-if="!showScorePage" class="flex flex-col gap-8">
    <div class="bg-primary h-fit w-full px-10">
      <navbar :dark="true">
        <button
          @click="quitQuiz"
          type="button"
          class="text-sm w-24 p-1.5 cursor-pointer rounded-lg bg-white text-primary"
        >
          Quit
        </button>
      </navbar>

      <div v-if="questions.length" class="text-white flex flex-col gap-3">
        <p class="text-sm capitalize">
          {{ subject }} |
          <span class="text-primary-light">
            question {{ currentquest + 1 }}/ {{ questions.length }}</span
          >
        </p>
        <div>
          <p>
            {{ questions[currentquest].question }}
          </p>
        </div>
      </div>
    </div>

    <div v-if="questions.length" class="px-10 flex flex-col gap-4">
      <!-- <div class="flex gap-4 items-center">
        <button class="w-12 p-2 rounded-lg bg-primary text-white">A</button>
        <p class="text-primary-light text-sm">
          Lorem ipsum dolor sit amet consectetur.
        </p>
      </div> -->
      <div class="flex gap-4 items-center">
        <button
          @click="clickedAnsfunc('A')"
          :class="
            questions[currentquest].selected == 'A'
              ? 'text-white bg-primary'
              : 'text-primary-light'
          "
          class="p-2 w-12 rounded-lg border border-primary-light"
        >
          A
        </button>
        <p class="text-primary-light text-sm">
          {{ questions[currentquest].Option.A }}
        </p>
      </div>

      <div class="flex gap-4 items-center">
        <button
          @click="clickedAnsfunc('B')"
          :class="
            questions[currentquest].selected == 'B'
              ? 'text-white bg-primary'
              : 'text-primary-light'
          "
          class="p-2 w-12 rounded-lg border border-primary-light"
        >
          B
        </button>
        <p class="text-primary-light text-sm">
          {{ questions[currentquest].Option.B }}
        </p>
      </div>

      <div class="flex gap-4 items-center">
        <button
          @click="clickedAnsfunc('C')"
          :class="
            questions[currentquest].selected == 'C'
              ? 'text-white bg-primary'
              : 'text-primary-light'
          "
          class="p-2 w-12 rounded-lg border border-primary-light"
        >
          C
        </button>
        <p class="text-primary-light text-sm">
          {{ questions[currentquest].Option.C }}
        </p>
      </div>

      <div class="flex gap-4 items-center">
        <button
          @click="clickedAnsfunc('D')"
          :class="
            questions[currentquest].selected == 'D'
              ? 'text-white bg-primary'
              : 'text-primary-light'
          "
          class="p-2 w-12 rounded-lg border border-primary-light"
        >
          D
        </button>
        <p class="text-primary-light text-sm">
          {{ questions[currentquest].Option.D }}
        </p>
      </div>

      <div>
        <button
          @click="prevfunc"
          class="text-white text-sm w-24 p-1.5 bg-primary-light cursor-pointer rounded-lg"
        >
          Previous
        </button>
        <button
          @click="nextfunc"
          class="text-white text-sm w-24 p-1.5 ml-3 bg-primary cursor-pointer rounded-lg"
        >
          <span v-if="currentquest == questions.length - 1">Submit</span>
          <span v-else> Next</span>
        </button>
      </div>

      <div class="flex gap-2">
        <button
          @click="moveToQuestion(i)"
          v-for="(item, i) in questions.length"
          :key="i"
          :class="currentquest == i ? 'bg-primary' : 'bg-primary-light'"
          class="w-7 rounded-md text-xs p-1 text-white"
        >
          {{ item }}
        </button>
      </div>
    </div>
  </div>

  <Scoreboard
    v-else
    :score="score"
    :correctans="correctans"
    :wrongans="wrongans"
    :subject="subject"
  />
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import navbar from "../components/navbar.vue";
import Scoreboard from "../components/Scoreboard.vue";

const router = useRouter();
const route = useRoute();

const showScorePage = ref(false);
const score = ref(0);
const correctans = ref(0);
const wrongans = ref(0);
const subject = ref("");
const currentquest = ref(0);

const loginuser = computed(() => {
  const user = localStorage.getItem("loginUser");
  return user ? JSON.parse(user) : null;
});

const questions = ref([
  {
    question: "1 < __",
    Option: {
      A: 0,
      B: 1,
      C: 3,
      D: 4,
    },
    ans: "A",
    id: 1,
    selected: "",
    subject: "mathematics",
  },
  {
    question: "the product of 1 and 0 ",
    Option: {
      A: 0,
      B: 1,
      C: 3,
      D: 4,
    },
    ans: "A",
    id: 1,
    selected: "",
    subject: "mathematics",
  },

  {
    question: "the product of 3 and 0",
    Option: {
      A: 0,
      B: 1,
      C: 3,
      D: 4,
    },
    ans: "A",
    id: 1,
    selected: "",
    subject: "mathematics",
  },

  {
    question: "1 + 2",
    Option: {
      A: 0,
      B: 1,
      C: 3,
      D: 4,
    },
    ans: "C",
    id: 1,
    selected: "",
    subject: "mathematics",
  },

  {
    question: "which of the following is even",
    Option: {
      A: 9,
      B: 3,
      C: 1,
      D: 7,
    },
    ans: "A",
    id: 1,
    selected: "",
    subject: "mathematics",
  },

  {
    question: "which  of the following is odd",
    Option: {
      A: 9,
      B: 4,
      C: 6,
      D: 3,
    },
    ans: "D",
    id: 1,
    selected: "",
    subject: "mathematics",
  },

  {
    question: "4 - 3",
    Option: {
      A: 0,
      B: 1,
      C: 3,
      D: 4,
    },
    ans: "B",
    id: 1,
    selected: "",
    subject: "mathematics",
  },

  {
    question: "4 < __",
    Option: {
      A: 0,
      B: 6,
      C: 3,
      D: 2,
    },
    ans: "B",
    id: 1,
    selected: "",
    subject: "mathematics",
  },

  {
    question: "the product of 5 and 6 is",
    Option: {
      A: 30,
      B: 1,
      C: 25,
      D: 11,
    },
    ans: "A",
    id: 1,
    selected: "",
    subject: "mathematics",
  },

  {
    question: "1 + 3 =",
    Option: {
      A: 0,
      B: 1,
      C: 3,
      D: 4,
    },
    ans: "D",
    id: 1,
    selected: "",
    subject: "mathematics",
  },

  {
    question: "which is the correct spelling",
    Option: {
      A: "qusetion",
      B: "quesion",
      C: "question",
      D: "quetsion",
    },
    ans: "C",
    id: 1,
    selected: "",
    subject: "english",
  },
  {
    question: "which is of the following is a fruit",
    Option: {
      A: "apple",
      B: "chair",
      C: "bell",
      D: "red",
    },
    ans: "A",
    id: 2,
    selected: "",
    subject: "english",
  },
  {
    question: "one of these is a living thin",
    Option: {
      A: "Apple",
      B: "Joggers",
      C: "Dog",
      D: "pillow",
      subject: "english",
    },
    ans: "C",
    id: 3,
    selected: "",
    subject: "english",
  },
  {
    question: "__ is a verb",
    Option: {
      A: "emma",
      B: "walking",
      C: "house",
      D: "window",
      subject: "english",
    },
    ans: "B",
    id: 4,
    selected: "",
    subject: "english",
  },
  {
    question: "which is the correct spelling",
    Option: {
      A: "read",
      B: "raed",
      C: "rerd",
      D: "rard",
    },
    ans: "A",
    id: 5,
    selected: "",
    subject: "english",
  },
  {
    question: "which is the correct spelling",
    Option: {
      A: "church",
      B: "chorch",
      C: "shurch",
      D: "shorch",
    },
    ans: "A",
    id: 6,
    selected: "",
    subject: "english",
  },
  {
    question: "What is the opposite of old",
    Option: {
      A: "fine",
      B: "young",
      C: "ugly",
      D: "dirty",
    },
    ans: "B",
    id: 7,
    selected: "",
    subject: "english",
  },
  {
    question: "__ is a noun",
    Option: {
      A: "walking",
      B: "dancing",
      C: "singing",
      D: "house",
    },
    ans: "D",
    id: 8,
    selected: "",
    subject: "english",
  },
  {
    question: "__ is the plural of house",
    Option: {
      A: "house",
      B: "houses",
      C: "housees",
      D: "houes",
    },
    ans: "B",
    id: 9,
    selected: "",
    subject: "english",
  },
  {
    question: "which is the correct spelling",
    Option: {
      A: "famili",
      B: "famliy",
      C: "family",
      D: "famely",
    },
    ans: "C",
    id: 10,
    selected: "",
    subject: "english",
  },
]);

onMounted(() => {
  subject.value = route.query.subject;

  if (subject.value) {
    questions.value = questions.value.filter(
      (ques) => ques.subject.toLowerCase() == subject.value.toLowerCase()
    );
  }
});

const quitQuiz = () => {
  router.push({ name: "dashboard" });
};

const nextfunc = () => {
  if (currentquest.value < questions.value.length - 1) {
    currentquest.value++;
  } else {
    ScoreBoard();
  }
};

const prevfunc = () => {
  if (currentquest.value >= 1) {
    currentquest.value--;
  }
};

const clickedAnsfunc = (ans) => {
  questions.value[currentquest.value].selected = ans;
};

const ScoreBoard = () => {
  showScorePage.value = true;

  questions.value.forEach((ques) => {
    if (ques.selected == ques.ans) {
      correctans.value++;
      score.value = score.value + 2;
    } else {
      wrongans.value++;
    }
  });

  savedscore();
};

const savedscore = () => {
  //get the results from local storage
  let localscore = localStorage.getItem("results");
  let results = localscore ? JSON.parse(localscore) : [];

  const obj = {
    score: score.value,
    subject: subject.value,
    email: loginuser.value && loginuser.value.email,
    user: loginuser.value,
  };

  //filter results and remove the current subject from it

  results.find((el, index) => {
    if (el.email == loginuser.value.email && el.subject == obj.subject) {
      results.pop(index);
      return;
    }
  });

  console.log(results);

  // add the new score to the result
  results.push(obj);
  //udpdate the local storage

  localStorage.setItem("results", JSON.stringify(results));
  return;
};

console.log(loginuser.value, loginuser.value.email);
const moveToQuestion = (i) => {
  currentquest.value = i;
  // console.log(currentquest.value);
};
</script>
