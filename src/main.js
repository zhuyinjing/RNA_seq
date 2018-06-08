// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import vueAxios from 'vue-axios'
import store from './store/store'
import $ from 'jquery'
import 'datatables/media/css/jquery.dataTables.min.css'
import 'datatables/media/js/jquery.dataTables.min.js'
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import Highmaps from 'highcharts/modules/map';

HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
Highmaps(Highcharts);

Vue.use(ElementUI)
// 请求发送前
// axios.interceptors.request.use((config) => {
//   return config
// })

if (sessionStorage.username) {
  store.state.username = sessionStorage.username
}
if (sessionStorage.projectId) {
  store.state.projectId = sessionStorage.projectId
}
if (sessionStorage.projectName) {
  store.state.projectName = sessionStorage.projectName
}
// 侧边栏li的点击颜色
if (sessionStorage.leftMenuIndex) {
  store.state.leftMenuIndex = sessionStorage.leftMenuIndex
}
// 侧边栏动态内容
if (sessionStorage.info) {
  store.state.info = JSON.parse(sessionStorage.info)
}
// heatmap,ppi, geneList 输入
if (sessionStorage.geneList) {
  store.state.geneList = JSON.parse(sessionStorage.geneList)
}
// heatmap json
if (sessionStorage.heatmapJson) {
  store.state.heatmapJson = JSON.parse(sessionStorage.heatmapJson)
}
// ppi json
if (sessionStorage.ppiJson) {
  store.state.ppiJson = JSON.parse(sessionStorage.ppiJson)
}
if (sessionStorage._case) {
  store.state._case = sessionStorage._case
}
if (sessionStorage._control) {
  store.state._control = sessionStorage._control
}

axios.get('/getUser').then((res) => {
  store.commit('setusername', res.data)
})

Vue.use(vueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
