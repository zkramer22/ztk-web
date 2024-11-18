hip<script setup>
    import WorkBlock from '../components/WorkBlock.vue'
    import Chip from '../components/Chip.vue'
    import { chips, workItems } from '@/data/workItems.js'


</script>

<template>
    <!-- <div class="flex wrap">
        <Chip v-for="(chip, i) in chips" :chip/>
    </div> -->

    <!-- <div class="grid img-text-grid"> -->
    <div class="z-mb-1">
        <WorkBlock v-for="(workItem, i) in workItems"
            :key="`work-${i}`"
            :workItem
            :num="i"
        />
    </div>
</template>


<style lang="scss">

</style>