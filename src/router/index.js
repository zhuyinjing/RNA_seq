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
const heatmap = resolve => require(['@/components/heatmap'], resolve)
const ppi_chord_plot = resolve => require(['@/components/ppi_chord_plot'], resolve)
const report_fastqc = resolve => require(['@/components/report_fastqc'], resolve)
const report_mappingqc = resolve => require(['@/components/report_mappingqc'], resolve)
const report_new_trans = resolve => require(['@/components/report_new_trans'], resolve)
const report_expr_matrix = resolve => require(['@/components/report_expr_matrix'], resolve)
const report_volcano_plot = resolve => require(['@/components/report_volcano_plot'], resolve)
const heatmapsvg = resolve => require(['@/components/heatmapsvg'], resolve)
const enrichment_analysis = resolve => require(['@/components/enrichment_analysis'], resolve)
const plotCluster = resolve => require(['@/components/plotCluster'], resolve)
const keggbubble = resolve => require(['@/components/keggbubble'], resolve)
const plotPCA = resolve => require(['@/components/plotPCA'], resolve)
const app_heatmap_input = resolve => require(['@/components/app_heatmap_input'], resolve)
const app_heatmap = resolve => require(['@/components/app_heatmap'], resolve)
const app_ppi_input = resolve => require(['@/components/app_ppi_input'], resolve)
const app_ppi = resolve => require(['@/components/app_ppi'], resolve)
const app_heatmap_input_project = resolve => require(['@/components/app_heatmap_input_project'], resolve)
const report_ma_plot = resolve => require(['@/components/report_ma_plot'], resolve)
const ASprofile = resolve => require(['@/components/ASprofile'], resolve)
const ASprofilePercent = resolve => require(['@/components/ASprofilePercent'], resolve)
const forceGraph = resolve => require(['@/components/forceGraph'], resolve)
const app_enrichment_input = resolve => require(['@/components/app_enrichment_input'], resolve)
const app_enrichment = resolve => require(['@/components/app_enrichment'], resolve)
const app_force_input = resolve => require(['@/components/app_force_input'], resolve)
const app_force = resolve => require(['@/components/app_force'], resolve)

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
      path: '/heatmap',
      name: 'heatmap',
      component: heatmap
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
      path: '/heatmapsvg',
      name: 'heatmapsvg',
      component: heatmapsvg
    },
    {
      path: '/enrichment_analysis',
      name: 'enrichment_analysis',
      component: enrichment_analysis
    },
    {
      path: '/plotCluster',
      name: 'plotCluster',
      component: plotCluster
    },
    {
      path: '/keggbubble',
      name: 'keggbubble',
      component: keggbubble
    },
    {
      path: '/plotPCA',
      name: 'plotPCA',
      component: plotPCA
    },
    {
      path: '/app_heatmap_input',
      name: 'app_heatmap_input',
      component: app_heatmap_input
    },
    {
      path: '/app_heatmap',
      name: 'app_heatmap',
      component: app_heatmap
    },
    {
      path: '/app_ppi_input',
      name: 'app_ppi_input',
      component: app_ppi_input
    },
    {
      path: '/app_ppi',
      name: 'app_ppi',
      component: app_ppi
    },
    {
      path: '/report_ma_plot',
      name: 'report_ma_plot',
      component: report_ma_plot
    },
    {
      path: '/app_heatmap_input_project',
      name: 'app_heatmap_input_project',
      component: app_heatmap_input_project
    },
    {
      path: '/app_heatmap_project',
      name: 'app_heatmap_project',
      component: app_heatmap
    },
    {
      path: '/ASprofile',
      name: 'ASprofile',
      component: ASprofile
    },
    {
      path: '/ASprofilePercent',
      name: 'ASprofilePercent',
      component: ASprofilePercent
    },
    {
      path: '/forceGraph',
      name: 'forceGraph',
      component: forceGraph
    },
    {
      path: '/app_enrichment_input',
      name: 'app_enrichment_input',
      component: app_enrichment_input
    },
    {
      path: '/app_enrichment',
      name: 'app_enrichment',
      component: app_enrichment
    },
    {
      path: '/app_force_input',
      name: 'app_force_input',
      component: app_force_input
    },
    {
      path: '/app_force',
      name: 'app_force',
      component: app_force
    },
  ]
})
