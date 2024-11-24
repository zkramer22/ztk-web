<script setup>
    import { nextTick, reactive } from 'vue';
    import Chip from '../components/Chip.vue'
    import WorkBlock from '../components/WorkBlock.vue'
    
    import { chips, workBlocks } from '@/data/workItems.js'

    //////////////////// methods //////////////////////

</script>

<template>
    <!-- <div class="flex wrap">
        <Chip v-for="(chip, i) in chips" :chip/>
    </div> -->
    <div class="container">
        <h2 class="text-center">:: work ::</h2>
        <RouterView></RouterView>

        <h4>Projects By Type:</h4>
        <div class="work-view">
            <RouterLink v-for="({ previewImg, title, short, chips }, key) in workBlocks"
                :to="`/work/${key}`"
            >
                <WorkBlock
                    :key="`work-${key}`"
                    :previewImg :title :short :chips
                />
            </RouterLink>
        </div>
        <div class="spacer"></div>
    </div>
</template>


<style lang="scss" scoped>
    .container {
        max-width: 1440px;
    }

    .work-view {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        grid-gap: 15px;
    }
    
    @media screen and (min-width: 768px) {
        .work-view {
            grid-template-columns: 1fr 1fr;
        }
    }
</style>