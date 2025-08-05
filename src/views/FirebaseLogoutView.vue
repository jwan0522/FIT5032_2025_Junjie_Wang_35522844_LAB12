<template>
  <h1>Logout</h1>
  <p>Click the button below to sign out from your account.</p>
  <p><button @click="logout" class="btn btn-primary">Sign out</button></p>
  <p v-if="logoutMessage" class="alert" :class="messageClass">{{ logoutMessage }}</p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const logoutMessage = ref("");
const messageClass = ref("alert-info");
const router = useRouter();
const auth = getAuth();

const logout = () => {
  signOut(auth)
    .then(() => {
      logoutMessage.value = "Logout successful!";
      messageClass.value = "alert-success";
      console.log("Firebase Logout Successful!");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    })
    .catch((error) => {
      logoutMessage.value = "Logout failed: " + error.message;
      messageClass.value = "alert-danger";
      console.log(error.code);
    });
};
</script>