import Vue from 'vue'
import Vuex from 'vuex'
import timezoneStore from './modules/timezones'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        timezoneStore
    }
})