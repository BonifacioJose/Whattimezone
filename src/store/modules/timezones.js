import timezoneApi from '../../api/timezone'

const state = {
    allTimezones: [],
    selectedTimezones: []
}

const getters = {
    allTimezones: state => state.allTimezones,
    selectedTimezones: state => state.selectedTimezones
}

const actions = {
    getTimezones({commit}) {
        timezoneApi.getTimezones(timezones => {
            commit('setTimezones', timezones);
        })
    },
    setSelectedTimezones({commit}, {selectedTimezones}) {
        commit('setSelectedTimezones', selectedTimezones)
    },
    selectTimezone({commit}, { field, value }) {
        timezoneApi.getTimezoneByFieldAndValue({field, value}, timezone => {
            commit('selectTimezone', timezone)
        })
    },
    removeTimezone({commit}, { timezone }) {
        commit('removeTimezone', timezone)
    }
}

const mutations = {
    setTimezones(state, timezones) {
        state.allTimezones = timezones;
    },
    setSelectedTimezones(state, selectedTimezones) {
        state.selectedTimezones = selectedTimezones;
    },
    selectTimezone(state, timezone) {
        state.allTimezones = state.allTimezones.filter(item => item.zoneName !== timezone.zoneName)
        state.selectedTimezones.push(timezone);
    },
    removeTimezone(state, timezone) {
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