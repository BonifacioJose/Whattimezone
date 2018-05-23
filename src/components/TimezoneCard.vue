<template>
    <div v-if="timezone.countryCode" class="timezone-card">
        {{timezone.timestamp}}
        <div>countryCode: {{timezone.countryCode}}</div>
        <div>countryName: {{timezone.countryName}}</div>
        <div>zoneName: {{timezone.zoneName}}</div>
        <div>abbreviation: {{timezone.abbreviation}}</div>
        <div>formatted: <RealTimeClock v-bind:key="timezone.zoneName" :time="new Date(timezone.timestamp * 1000)"/></div>
        <button v-on:click="remoteTimezone()">Remove</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import RealTimeClock from './RealTimeClock.vue'
import { REMOVE_TIMEZONE } from '../constants/mutations'

export default {
    name: 'TimezoneCard',
    components: {
        RealTimeClock
    },
    data() {
        const { timezone } = this;
        return {
            currentDate: new Date(timezone.timestamp * 1000)
        }
    },
    props: {
        timezone: Object,
    },
    methods: mapActions({
        remoteTimezone() {
            const { timezone } = this;
            this.$store.dispatch(REMOVE_TIMEZONE, { timezone });
        }
    })
}
</script>

<style scoped>

</style>
