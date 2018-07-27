// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import vueAxios from 'vue-axios'
import store from './store/store'
import 'datatables/media/css/jquery.dataTables.min.css'
import 'datatables/media/js/jquery.dataTables.min.js'
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import Highmaps from 'highcharts/modules/map';

import {
  Dialog,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Alert,
  Icon,
  Progress,
  Card,
  Loading,
  MessageBox,
  Message,
  Slider,
  Row,
  Col,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Upload,
  Container,
  Header,
  Aside,
  Main,
} from 'element-ui';

HighchartsMore(Highcharts)
Highmaps(Highcharts);

Vue.use(Dialog);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(Tag);
Vue.use(Alert);
Vue.use(Icon);
Vue.use(Progress);
Vue.use(Card);
Vue.use(TabPane);
Vue.use(Slider);
Vue.use(Row);
Vue.use(Col);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Upload);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
// 请求发送前
// axios.interceptors.request.use((config) => {
//   return config
// })

  let timer
  function startTimer() {
    clearTimeout(timer)
    timer = setTimeout(function () {
      sessionStorage.clear()
      window.location.href = 'https://colorseq.com/logout'
    }, 1000*60*5)
   }
  startTimer()
  document.body.onclick  = startTimer
  document.body.onmouseup = startTimer
  document.body.onmousemove = startTimer
  document.body.onkeyup  = startTimer
  document.body.onclick  = startTimer
  document.body.ontouchend  = startTimer

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
if (sessionStorage.species) {
  store.state.species = sessionStorage.species
}
if (sessionStorage.degGeneSum) {
  store.state.degGeneSum = sessionStorage.degGeneSum
}
if (sessionStorage.degFilterArgs) {
  store.state.degFilterArgs = JSON.parse(sessionStorage.degFilterArgs)
}
if (sessionStorage.menuShow) {
  store.state.menuShow = JSON.parse(sessionStorage.menuShow)
}
if (sessionStorage.appmenuShow) {
  store.state.appmenuShow = JSON.parse(sessionStorage.appmenuShow)
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
