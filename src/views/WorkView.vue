hip<script setup>
    import WorkBlock from '../components/WorkBlock.vue'
    import { workItems, chipsObj } from '@/data/workItems.js'

</script>

<template>
    <div class="grid img-text-grid">

        <WorkBlock v-for="({ title, body, imgs, chips }, i) in workItems"
            :key="`work-${i}`"
            :title="title"
            :body="body"
            :imgs="imgs"
            :chips="chips"
        />
    </div>
</template>


<style lang="scss">

</style>