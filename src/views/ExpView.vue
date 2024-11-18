<script setup>
    import ExpBlock from '../components/ExpBlock.vue'
    import { expItems } from '@/data/expItems.js'
</script>

<template>
    <div class="container">
        <ExpBlock v-for="({ title, body, img }, i) in expItems"
            :key="`exp-${i}`"
            :title="title"
            :body="body"
            :img="img"
        />
    </div>
</template>


<style lang="scss" scoped>
    .container {
        max-width: 1000px;
    }
</style>