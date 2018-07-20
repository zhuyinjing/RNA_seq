import 'es6-promise/auto'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    username: '',
    projectId: '',
    projectName: '',
    geneList: [],
    heatmapJson: null,
    ppiJson: null,
    leftMenuIndex: '0-0',
    info: {
      rnaSeqReportSummary: {
        geneNum: null,
        transcriptNum: null
      },
      experimentDesign: {
        experiments: []
      }
    },
    _case: '',
    _control: '',
    species: '', // 物种信息
    checked: [],
  },
  mutations: {
    setusername: (state, data) => {
      sessionStorage.setItem('username', data)
      state.username = data
    },
    setprojectId: (state, data) => {
      sessionStorage.setItem('projectId', data)
      state.projectId = data
    },
    setprojectName: (state, data) => {
      sessionStorage.setItem('projectName', data)
      state.projectName = data
    },
    setgeneList: (state, data) => {
      sessionStorage.setItem('geneList', JSON.stringify(data))
      state.geneList = data
    },
    setheatmapJson: (state, data) => {
      sessionStorage.setItem('heatmapJson', JSON.stringify(data))
      state.heatmapJson = data
    },
    setppiJson: (state, data) => {
      sessionStorage.setItem('ppiJson', JSON.stringify(data))
      state.ppiJson = data
    },
    setleftMenuIndex: (state, data) => {
      sessionStorage.setItem('leftMenuIndex', data)
      state.leftMenuIndex = data
    },
    setinfo: (state, data) => {
      sessionStorage.setItem('info', JSON.stringify(data))
      state.info = data
    },
    set_case: (state, data) => {
      sessionStorage.setItem('_case', data)
      state._case = data
    },
    set_control: (state, data) => {
      sessionStorage.setItem('_control', data)
      state._control = data
    },
    setspecies: (state, data) => {
      sessionStorage.setItem('species', data)
      state.species = data
    },
    setchecked: (state, data) => {
      state.checked = data
    },
  }
})
