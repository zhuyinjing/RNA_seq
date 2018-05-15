import 'es6-promise/auto'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    username: 'test',
    projectId: '',
    projectName: ''
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
  }
})
