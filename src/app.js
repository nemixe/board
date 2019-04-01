import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './assets/app.styl'

new Vue({
    el: '#app',
    store,
    render: h => h(App)
})