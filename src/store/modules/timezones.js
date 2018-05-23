import timezoneApi from '../../api/timezone'
import sessionStorageKeys from '../../constants/sessionStorageKeys'
import {
    SET_TIMEZONES,
    SET_SELECTED_TIMEZONES,
    SELECT_TIMEZONE,
    REMOVE_TIMEZONE
} from '../../constants/mutations'

const state = {
    allTimezones: [],
    selectedTimezones: []
}

const getters = {
    allTimezones: state => state.allTimezones,
    selectedTimezones: state => state.selectedTimezones
}

const actions = {
    [SET_TIMEZONES]({commit}) {
        const sessionTimezones = window.sessionStorage.getItem(sessionStorageKeys.TIMEZONES);
        if (!sessionTimezones) {
            timezoneApi.getTimezones(timezones => {
                commit(SET_TIMEZONES, timezones);
            })
        } else {
            commit(SET_TIMEZONES, JSON.parse(sessionTimezones));
        }   
    },
    [SET_SELECTED_TIMEZONES]({commit}, {selectedTimezones}) {
        commit(SET_SELECTED_TIMEZONES, selectedTimezones)
    },
    [SELECT_TIMEZONE]({commit}, { field, value }) {
        timezoneApi.getTimezoneByFieldAndValue({field, value}, timezone => {
            commit(SELECT_TIMEZONE, timezone)
        })
    },
    [REMOVE_TIMEZONE]({commit}, { timezone }) {
        commit(REMOVE_TIMEZONE, timezone)
    }
}

const mutations = {
    [SET_TIMEZONES](state, timezones) {
        if (!window.sessionStorage.getItem(sessionStorageKeys.TIMEZONES)) {
            window.sessionStorage.setItem(sessionStorageKeys.TIMEZONES, JSON.stringify(timezones));
        }
        state.allTimezones = timezones;
    },
    [SET_SELECTED_TIMEZONES](state, selectedTimezones) {
        state.selectedTimezones = selectedTimezones;
    },
    [SELECT_TIMEZONE](state, timezone) {
        state.allTimezones = state.allTimezones.filter(item => item.zoneName !== timezone.zoneName)
        state.selectedTimezones.push(timezone);
    },
    [REMOVE_TIMEZONE](state, timezone) {
        state.selectedTimezones = state.selectedTimezones.filter(item => item.zoneName !== timezone.zoneName)
        state.allTimezones.push(timezone);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}