import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '*',
    //   name: 'home',
    //   component: home
    // },
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/components/home'], resolve)
    },
    {
      path: '/about',
      name: 'about',
      component: resolve => require(['@/components/about'], resolve)
    },
    {
      path: '/project_list',
      name: 'project_list',
      component: resolve => require(['@/components/project_list'], resolve)
    },
    {
      path: '/create_experiment',
      name: 'create_experiment',
      component: resolve => require(['@/components/create_experiment'], resolve)
    },
    {
      path: '/upload_file',
      name: 'upload_file',
      component: resolve => require(['@/components/upload_file'], resolve)
    },
    {
      path: '/run_task',
      name: 'run_task',
      component: resolve => require(['@/components/run_task'], resolve)
    },
    {
      path: '/report',
      name: 'report',
      component: resolve => require(['@/components/report'], resolve)
    },
    {
      path: '/report_deg',
      name: 'report_deg',
      component: resolve => require(['@/components/report_deg'], resolve)
    },
    {
      path: '/heatmap',
      name: 'heatmap',
      component: resolve => require(['@/components/heatmap'], resolve)
    },
    {
      path: '/ppi_chord_plot',
      name: 'ppi_chord_plot',
      component: resolve => require(['@/components/ppi_chord_plot'], resolve)
    },
    {
      path: '/report_fastqc',
      name: 'report_fastqc',
      component: resolve => require(['@/components/report_fastqc'], resolve)
    },
    {
      path: '/report_mappingqc',
      name: 'report_mappingqc',
      component: resolve => require(['@/components/report_mappingqc'], resolve)
    },
    {
      path: '/report_new_trans',
      name: 'report_new_trans',
      component: resolve => require(['@/components/report_new_trans'], resolve)
    },
    {
      path: '/report_expr_matrix',
      name: 'report_expr_matrix',
      component: resolve => require(['@/components/report_expr_matrix'], resolve)
    },
    {
      path: '/report_volcano_plot',
      name: 'report_volcano_plot',
      component: resolve => require(['@/components/report_volcano_plot'], resolve)
    },
    {
      path: '/heatmapsvg',
      name: 'heatmapsvg',
      component: resolve => require(['@/components/heatmapsvg'], resolve)
    },
    {
      path: '/enrichment_analysis',
      name: 'enrichment_analysis',
      component: resolve => require(['@/components/enrichment_analysis'], resolve)
    },
    {
      path: '/plotCluster',
      name: 'plotCluster',
      component: resolve => require(['@/components/plotCluster'], resolve)
    },
    {
      path: '/keggbubble',
      name: 'keggbubble',
      component: resolve => require(['@/components/keggbubble'], resolve)
    },
    {
      path: '/plotPCA',
      name: 'plotPCA',
      component: resolve => require(['@/components/plotPCA'], resolve)
    },
    {
      path: '/app_heatmap_input',
      name: 'app_heatmap_input',
      component: resolve => require(['@/components/app_heatmap_input'], resolve)
    },
    {
      path: '/app_heatmap',
      name: 'app_heatmap',
      component: resolve => require(['@/components/app_heatmap'], resolve)
    },
    {
      path: '/app_ppi_input',
      name: 'app_ppi_input',
      component: resolve => require(['@/components/app_ppi_input'], resolve)
    },
    {
      path: '/app_ppi',
      name: 'app_ppi',
      component: resolve => require(['@/components/app_ppi'], resolve)
    },
    {
      path: '/report_ma_plot',
      name: 'report_ma_plot',
      component: resolve => require(['@/components/report_ma_plot'], resolve)
    },
    {
      path: '/app_heatmap_input_project',
      name: 'app_heatmap_input_project',
      component: resolve => require(['@/components/app_heatmap_input_project'], resolve)
    },
    {
      path: '/app_heatmap_project',
      name: 'app_heatmap_project',
      component: resolve => require(['@/components/app_heatmap'], resolve)
    },
    {
      path: '/ASprofile',
      name: 'ASprofile',
      component: resolve => require(['@/components/ASprofile'], resolve)
    },
    {
      path: '/ASprofilePercent',
      name: 'ASprofilePercent',
      component: resolve => require(['@/components/ASprofilePercent'], resolve)
    },
    {
      path: '/forceGraph',
      name: 'forceGraph',
      component: resolve => require(['@/components/forceGraph'], resolve)
    },
    {
      path: '/app_enrichment_input',
      name: 'app_enrichment_input',
      component: resolve => require(['@/components/app_enrichment_input'], resolve)
    },
    {
      path: '/app_enrichment',
      name: 'app_enrichment',
      component: resolve => require(['@/components/app_enrichment'], resolve)
    },
    {
      path: '/app_force_input',
      name: 'app_force_input',
      component: resolve => require(['@/components/app_force_input'], resolve)
    },
    {
      path: '/app_force',
      name: 'app_force',
      component: resolve => require(['@/components/app_force'], resolve)
    },
    {
      path: '/sc',
      component: resolve => require(['@/views/sc/index'], resolve),
      children: [
        {
          path: '',
          name: 'sc_report',
          component: resolve => require(['@/views/sc/report'], resolve)
        },
        {
          path: 'report_umi_count',
          name: 'report_umi_count',
          component: resolve => require(['@/views/sc/report_umi_count'], resolve)
        },
        {
          path: 'report_heterogeneous_gene', // 表达异质化基因筛选
          name: 'report_heterogeneous_gene',
          component: resolve => require(['@/views/sc/report_heterogeneous_gene'], resolve)
        },
        {
          path: 'report_pc_3d', // pc 3D
          name: 'report_pc_3d',
          component: resolve => require(['@/views/sc/report_pc_3d'], resolve)
        },
        {
          path: 'report_pc', // pc
          name: 'report_pc',
          component: resolve => require(['@/views/sc/report_pc'], resolve)
        },
        {
          path: 'report_pc_elbow', // 肘图
          name: 'report_pc_elbow',
          component: resolve => require(['@/views/sc/report_pc_elbow'], resolve)
        },
        {
          path: 'report_tSNE', // tSNE
          name: 'report_tSNE',
          component: resolve => require(['@/views/sc/report_tSNE'], resolve)
        }
      ]
    },
    // {
    //   path: '/admin',
    //   name: 'admin',
    //   component: resolve => require(['@/views/admin/project_list'], resolve),
    //   meta: {
    //     role: 'admin'
    //   },
    // },
  ]
})
