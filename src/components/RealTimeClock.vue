<template>
    <div class="realtimeclock">
        <div>{{time}}</div>
    </div>
</template>

<script>
export default {
    name: "RealTimeClock",
    props: {
        time: Date
    }
}
</script>

<style scoped>

</style>