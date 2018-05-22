import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
import about from '@/components/about'
import project_list from '@/components/project_list'
import create_experiment from '@/components/create_experiment'
import upload_file from '@/components/upload_file'
import run_task from '@/components/run_task'
import report from '@/components/report'
import report_deg from '@/components/report_deg'
import heatmap_input from '@/components/heatmap_input'
import heatmap from '@/components/heatmap'
import ppi_chord_plot_input from '@/components/ppi_chord_plot_input'
import ppi_chord_plot from '@/components/ppi_chord_plot'

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
    },
    {
      path: '/report',
      name: 'report',
      component: report
    },
    {
      path: '/report_deg',
      name: 'report_deg',
      component: report_deg
    },
    {
      path: '/heatmap_input',
      name: 'heatmap_input',
      component: heatmap_input
    },
    {
      path: '/heatmap',
      name: 'heatmap',
      component: heatmap
    },
    {
      path: '/ppi_chord_plot_input',
      name: 'ppi_chord_plot_input',
      component: ppi_chord_plot_input
    },
    {
      path: '/ppi_chord_plot',
      name: 'ppi_chord_plot',
      component: ppi_chord_plot
    }
  ]
})
