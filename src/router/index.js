import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/Home'
import Login from 'components/Login'
import Register from 'components/Register'
import Project from 'components/Project'
import Sample from 'components/Sample'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/project/:id',
      props: true,
      name: 'project',
      component: Project
    },
    {
      path: '/sample/:id',
      props: true,
      name: 'sample',
      component: Sample
    },
    {
      path: '*',
      redirect: { name: 'home' }
    }
  ]
})
