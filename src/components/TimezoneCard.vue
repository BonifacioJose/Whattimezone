<template>
    <div v-if="timezone.countryCode" class="timezone-card">
        {{timezone.timestamp}}
        <div>countryCode: {{timezone.countryCode}}</div>
        <div>countryName: {{timezone.countryName}}</div>
        <div>zoneName: {{timezone.zoneName}}</div>
        <div>abbreviation: {{timezone.abbreviation}}</div>
        <div>formatted: <RealTimeClock v-bind:key="timezone.timestamp" :time="new Date(timezone.timestamp * 1000)"/></div>
        <button v-on:click="removeTimezone">Remove</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import RealTimeClock from './RealTimeClock.vue'

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
        removeTimezone() {
            const { timezone } = this;
            this.$store.dispatch('removeTimezone', { timezone });
        }
    })
}
</script>

<style scoped>

</style>
