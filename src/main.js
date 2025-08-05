import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'


const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyClMIrFeIVnO4QpHacjZdqBXsbpT-5Y6iU",
//   authDomain: "week7-junjie.firebaseapp.com",
//   projectId: "week7-junjie",
//   storageBucket: "week7-junjie.firebasestorage.app",
//   messagingSenderId: "3233738554",
//   appId: "1:3233738554:web:c22d237936b2eadc2d6a03"
// };
// // Initialize Firebase
// initializeApp(firebaseConfig);