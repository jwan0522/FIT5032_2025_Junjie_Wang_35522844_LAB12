import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FireRegisterView from '../views/FirebaseRegisterView.vue'
import FirebaseLogoutView from '../views/FirebaseLogoutView.vue'
import AddBookView from '../views/AddBookView.vue';
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookApi.vue'
import GetAllBookAPI from '../views/GetAllBookAPI.vue'

const routes = [
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
    {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path:'/FireRegister',
    name:'FireRegister',
    component:FireRegisterView
  },
  {
    path:'/FireLogin',
    name:'FireLogin',
    component:FirebaseSigninView
  },
  {
    path:'/FireLogout',
    name:'FireLogout',
    component:FirebaseLogoutView
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router