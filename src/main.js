import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import '@/plugins/axios.js'
import router from '@/router'

const app = createApp(App)

app.use(router)

app.mount('#app')
