<template>
    <div class="timezones-select">
        <input v-model="filterTimezone" v-on:keyup="filterTimezones"/>
        <select v-model="selectedTimezone">
            <option v-for="timezone in filteredTimezones" v-bind:key="timezone.title">
                {{ timezone.zoneName }}
            </option>
        </select>  
        <span>Selected: {{ selectedTimezone }}</span>
        <button v-on:click="selectTimezone">Select</button>  

        <TimezoneCard v-for="timezone in selectedTimezones" v-bind:key="timezone.timestamp" :timezone="timezone"/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TimezoneCard from './TimezoneCard.vue'
import {
    SET_TIMEZONES,
    SET_SELECTED_TIMEZONES,
    SELECT_TIMEZONE
} from '../constants/mutations'

export default {
    name: 'TimezonesSelect',
    components: {
        TimezoneCard
    },
    data() {
        return {
            selectedTimezone: '',
            filteredTimezones: [],
            filterTimezone: ''
        }
    },
    computed: mapGetters({
        timezones: 'allTimezones',
        selectedTimezones: 'selectedTimezones'
    }),
    methods: mapActions({
        selectTimezone() {
            const { selectedTimezone } = this;
            this.$store.dispatch(SELECT_TIMEZONE, { field: 'zone', value: selectedTimezone});
        },
        updateSelectedClocks() {
            setInterval(()=> {
                const { selectedTimezones } = this;
                for (let i = 0; i < selectedTimezones.length; i++) {
                    let timezone = selectedTimezones[i];
                    let timestamp = parseInt(timezone.timestamp);
                    timestamp += 1;
                    timezone.timestamp = timestamp.toString();
                }  
                this.$store.dispatch(SET_SELECTED_TIMEZONES, {selectedTimezones})    
            }, 1000)
        },
        filterTimezones() {
            const {timezones} = this;
            this.filteredTimezones = timezones.filter(item => item.zoneName.toLowerCase().includes(this.filterTimezone.toLowerCase()));
        }
    }),
    created() {
        this.$store.dispatch(SET_TIMEZONES);
        this.filteredTimezones = this.timezones;
        this.updateSelectedClocks();
    }
}
</script>

<style scoped>

</style>