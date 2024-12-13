<script setup>
    import { useRoute } from 'vue-router';
    import WorkBlock from '../components/WorkBlock.vue'
    import { workBlocks } from '@/data/workItems.js'

    //////////////////// methods //////////////////////
    function scrollTop() {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }

</script>

<template>
    <div class="container">
        <h2 class="text-center">:: work ::</h2>
        <RouterView></RouterView>

        <h4>Projects By Type:</h4>
        <div class="work-view">
            <RouterLink v-for="({ previewImg, title, short, chips }, key) in workBlocks"
                :to="`/work/${key}`" 
                @click.native="scrollTop()"
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