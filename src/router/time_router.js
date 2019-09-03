let router = [
  {
    path: '/time_series_table',
    name: 'time_series_table',
    component: resolve => require(['@/views/time_series/time_series_table'], resolve)
  },
  {
    path: '/time_series_lineChart',
    name: 'time_series_lineChart',
    component: resolve => require(['@/views/time_series/time_series_lineChart'], resolve)
  }
]
export default router
