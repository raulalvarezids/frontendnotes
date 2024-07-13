import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { MdDeleteforever } from "oh-vue-icons/icons";

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()

addIcons(MdDeleteforever);

pinia.use(piniaPluginPersistedstate)
app.component("v-icon",OhVueIcon)
app.use(pinia)
app.use(router)
app.mount('#app')
