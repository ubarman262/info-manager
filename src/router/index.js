import Vue from 'vue'
import Router from 'vue-router'
import InfoAdder from '@/components/InfoManager'
import Login from '@/components/Login'
import InfoViewer from '@/components/InfoViewer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'InfoViewer',
      component: InfoViewer,
      meta: { requiredAuth: true }
    },
    {
      path: '/infoadder',
      name: 'InfoAdder',
      component: InfoAdder
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
