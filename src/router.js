import { createRouter, createWebHistory } from 'vue-router';

// Import your Vue components that you want to use as pages
import Auth from './views/Auth.vue'
import Dashboard from './views/Dashboard.vue'
import Questions from './views/Questions.vue'
import leadersboard from './views/leadersboard.vue'




const routes = [
  {
    path: '/',
    component: Auth,
    name: 'auth'
  },
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'dashboard'
  },
  {
    path: '/questions',
    component: Questions,
    name: 'Questions'
  },
  {
    path: '/leaders',
    component: leadersboard,
    name: 'leadersboard'
  },





];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
