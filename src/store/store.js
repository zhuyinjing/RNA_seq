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
    heatmapJson: null
  },
  mutations: {
    setusername: (state, data) => {
      state.username = data
    },
    setprojectId: (state, data) => {
      state.projectId = data
    },
    setprojectName: (state, data) => {
      state.projectName = data
    },
    setgeneList: (state, data) => {
      state.geneList = data
    },
    setheatmapJson: (state, data) => {
      state.heatmapJson = data
    },
  }
})
