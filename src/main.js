import Vue from 'vue'
import router from './router/blog-router'
import store from './store'
import blog from './views/blog-container'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(blog)
}).$mount('#app')
