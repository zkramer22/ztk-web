<script setup>
    import ExpBlock from '../components/ExpBlock.vue'
    import { expItems } from '@/data/expItems.js'
</script>

<template>
    <div class="container">
        <h2 class="text-center">:: experience ::</h2>
        <ExpBlock v-for="({ title, body, img }, i) in expItems"
            :key="`exp-${i}`"
            :title="title"
            :body="body"
            :img="img"
        />
        <div class="spacer"></div>
    </div>
</template>


<style lang="scss" scoped>
    @media screen and (min-width: 1440px) {
        .container {
            max-width: 1260px;
        }
    }
</style>