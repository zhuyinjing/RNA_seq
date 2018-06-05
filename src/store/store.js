import 'es6-promise/auto'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    username: 'test',
    projectId: '',
    projectName: '',
    geneList: [],
    heatmapJson: null,
    ppiJson: null
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
      state.geneList = data
    },
    setheatmapJson: (state, data) => {
      state.heatmapJson = data
    },
    setppiJson: (state, data) => {
      state.ppiJson = data
    },
  }
})
