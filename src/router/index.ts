import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import AddNoteView from '@/views/AddNoteView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        requireAuth: true
      }
    },  
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta:{
        requireAuth: false
      }
    }, 
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta:{
        requireAuth: false
      }
    },   
    {
      path:'/notas/:id?',
      name:'notas',
      component:AddNoteView,            
      meta:{
        requireAuth: true
      }
    }
  ]
})


router.beforeEach((to, from) => {
  let store = useUserStore()

  if (to.meta.requireAuth && store.token==null) {    
    return {
      path: '/login',
    }
  }
})

export default router
