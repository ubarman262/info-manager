// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import SuiVue from 'semantic-ui-vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import firebase from 'firebase/compat/app'
import 'semantic-ui-css/semantic.min.css'
import VueMasonry from 'vue-masonry-css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import store from './store/store.js'

Vue.use(VueMasonry)

Vue.use(SuiVue)

Vue.use(VueAxios, axios)

library.add(faPlus)

Vue.component('font-awesome-icon', FontAwesomeIcon)

const firebaseConfig = {
  apiKey: 'AIzaSyDzqSr0GBO_tYecobsKH9ovVbCjfaTdxkg',
  authDomain: 'info-manager-b5f9b.firebaseapp.com',
  projectId: 'info-manager-b5f9b',
  storageBucket: 'info-manager-b5f9b.appspot.com',
  messagingSenderId: '844087424895',
  appId: '1:844087424895:web:11804238561a35ab924c4a'
}

firebase.initializeApp(firebaseConfig)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
