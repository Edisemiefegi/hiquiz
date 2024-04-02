import { defineStore } from "pinia";

import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  collection,
  doc,
  db,
  setDoc,
  getDoc,
  signOut,
  addDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  getDocs,
} from "../src/firebase.js";

export const useQuizStore = defineStore("quizstore", {
  state: () => ({
    users: [],
    scores: [],
    allScores: [],
    loggedInUser: null,
  }),

  getters: {
    getLoggedInUser: (state) => state.loggedInUser,
    getScores: (state) => state.scores,
    getallScores: (state) => state.allScores,
  },

  actions: {
    async signup(user) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          user.email,
          user.password
        );
        const userid = userCredential?.user?.uid;

        const userDetails = {
          password: user.password,
          username: user.username,
          email: user.email,
          id: userid,
        };

        await setDoc(doc(db, "users", userid), userDetails);
        this.loggedInUser = userDetails;
      } catch (error) {
        console.log(error.message);
        throw error;
      }
      // ...
    },

    async login(user) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          user.email,
          user.password
        );
        const userid = userCredential?.user?.uid;

        const docRef = doc(db, "users", userid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.loggedInUser = docSnap.data();
          console.log(this.loggedInUser);
          this.setScore();
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },

    async logout() {
      try {
        await signOut(auth);
        this.loggedInUser = null;
        this.users = [];
        this.scores = [];
        this.allScores = [];
      } catch (error) {
        console.log(error.message);

        throw error;
      }
    },

    async addScore(data) {
      try {
        //get the new score details
        const userScoreDetails = {
          score: data.score,
          subject: data.subject,
          userid: this.loggedInUser.id,
          username: this.loggedInUser.username,
          id: "",
        };

        //check the subject already exist
        const existingSubject = this.scores.find(
          (e) => e.subject === userScoreDetails.subject
        );

        //if it exsit update it
        console.log(userScoreDetails);

        if (existingSubject) {
          const scoreRef = doc(db, "results", existingSubject.id);
          console.log(existingSubject.id);

          await updateDoc(scoreRef, {
            score: data.score,
          });
        } else {
          //if it doesn, create a new one
          const docRef = await addDoc(
            collection(db, "results"),
            userScoreDetails
          );
          await updateDoc(docRef, {
            id: docRef.id,
          });
        }

        this.setScore();
      } catch (error) {
        console.error("Error updating score: ", error);
      }
    },

    setScore() {
      const q = query(
        collection(db, "results"),
        where("userid", "==", this.loggedInUser.id)
      );

      onSnapshot(q, (querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push(doc.data());
        });

        this.scores = results;
        // console.log(this.scores);
      });
    },

    async leaders() {
      const q = query(collection(db, "results"));

      const querySnapshot = await getDocs(q);
      let results = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });
      console.log(results);

      let math = results.filter((el) => el.subject == "mathematics");
      let eng = results.filter((el) => el.subject == "english");
      console.log(math, eng, "sub");

      math = math.sort((a, b) => b.score - a.score).slice(0, 5);
      eng = eng.sort((a, b) => b.score - a.score).slice(0, 5);

      let result = [...math, ...eng];

      results = result.sort((a, b) => a.subject.localeCompare(b.subject));

      this.allScores = results;
      console.log(this.allScores);
    },
  },

  persist: true,
});
