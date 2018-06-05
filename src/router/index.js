import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
// import login from '@/components/login'
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
import report_fastqc from '@/components/report_fastqc'
import report_mappingqc from '@/components/report_mappingqc'
import report_new_trans from '@/components/report_new_trans'
import report_expr_matrix from '@/components/report_expr_matrix'
import report_volcano_plot from '@/components/report_volcano_plot'
import heatmapsvg from '@/components/heatmapsvg'
import heatmapsvg_input from '@/components/heatmapsvg_input'

Vue.use(Router)

export default new Router({
  // mode: 'history',
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
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: login
    // },
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
    },
    {
      path: '/report_fastqc',
      name: 'report_fastqc',
      component: report_fastqc
    },
    {
      path: '/report_mappingqc',
      name: 'report_mappingqc',
      component: report_mappingqc
    },
    {
      path: '/report_new_trans',
      name: 'report_new_trans',
      component: report_new_trans
    },
    {
      path: '/report_expr_matrix',
      name: 'report_expr_matrix',
      component: report_expr_matrix
    },
    {
      path: '/report_volcano_plot',
      name: 'report_volcano_plot',
      component: report_volcano_plot
    },
    {
      path: '/heatmapsvg_input',
      name: 'heatmapsvg_input',
      component: heatmapsvg_input
    },
    {
      path: '/heatmapsvg',
      name: 'heatmapsvg',
      component: heatmapsvg
    }
  ]
})
