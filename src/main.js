import Vue from 'vue'
import App from './App.vue'
import '@/assets/style/index.css'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

new Vue({
  render: (h) => h(App)
}).$mount('#app')
