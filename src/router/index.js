import Vue from 'vue'
import Router from 'vue-router'
const home = resolve => require(['@/components/home'], resolve)
const about = resolve => require(['@/components/about'], resolve)
const project_list = resolve => require(['@/components/project_list'], resolve)
const create_experiment = resolve => require(['@/components/create_experiment'], resolve)
const upload_file = resolve => require(['@/components/upload_file'], resolve)
const run_task = resolve => require(['@/components/run_task'], resolve)
const report = resolve => require(['@/components/report'], resolve)
const report_deg = resolve => require(['@/components/report_deg'], resolve)
const heatmap_input = resolve => require(['@/components/heatmap_input'], resolve)
const heatmap = resolve => require(['@/components/heatmap'], resolve)
const ppi_chord_plot_input = resolve => require(['@/components/ppi_chord_plot_input'], resolve)
const ppi_chord_plot = resolve => require(['@/components/ppi_chord_plot'], resolve)
const report_fastqc = resolve => require(['@/components/report_fastqc'], resolve)
const report_mappingqc = resolve => require(['@/components/report_mappingqc'], resolve)
const report_new_trans = resolve => require(['@/components/report_new_trans'], resolve)
const report_expr_matrix = resolve => require(['@/components/report_expr_matrix'], resolve)
const report_volcano_plot = resolve => require(['@/components/report_volcano_plot'], resolve)
const heatmapsvg = resolve => require(['@/components/heatmapsvg'], resolve)
const heatmapsvg_input = resolve => require(['@/components/heatmapsvg_input'], resolve)
const enrichment_analysis_input = resolve => require(['@/components/enrichment_analysis_input'], resolve)
const enrichment_analysis = resolve => require(['@/components/enrichment_analysis'], resolve)

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
    },
    {
      path: '/enrichment_analysis_input',
      name: 'enrichment_analysis_input',
      component: enrichment_analysis_input
    },
    {
      path: '/enrichment_analysis',
      name: 'enrichment_analysis',
      component: enrichment_analysis
    },
  ]
})
