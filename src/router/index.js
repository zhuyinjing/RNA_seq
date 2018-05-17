import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import about from '@/components/about'
import project_list from '@/components/project_list'
import create_experiment from '@/components/create_experiment'
import upload_file from '@/components/upload_file'
import run_task from '@/components/run_task'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '*',
    //   name: 'home',
    //   component: home
    // },
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/project_list',
      name: 'project_list',
      component: project_list,
    },
    {
      path: '/create_experiment',
      name: 'create_experiment',
      component: create_experiment
    },
    {
      path: '/upload_file',
      name: 'upload_file',
      component: upload_file
    },
    {
      path: '/run_task',
      name: 'run_task',
      component: run_task
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
