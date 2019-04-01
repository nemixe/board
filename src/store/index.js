import 'es6-promise/auto'
import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    curTodo: {},
    board: {
        name: 'Project',
        lists: []
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
