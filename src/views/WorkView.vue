hip<script setup>
    import WorkBlock from '../components/WorkBlock.vue'
    import Chip from '../components/Chip.vue'
    import { chips, workItems } from '@/data/workItems.js'


</script>

<template>
    <div class="container">
        <h4 class="text-center">work</h4>
        <WorkBlock v-for="(workItem, i) in workItems"
            :key="`work-${i}`"
            :workItem
            :num="i"
        />
    </div>
    <!-- <div class="flex wrap">
        <Chip v-for="(chip, i) in chips" :chip/>
    </div> -->
</template>


<style lang="scss">

</style>