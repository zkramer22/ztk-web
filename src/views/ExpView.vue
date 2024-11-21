<script setup>
    import ExpBlock from '../components/ExpBlock.vue'
    import { expItems } from '@/data/expItems.js'
</script>

<template>
    <div class="container">
        <h4 class="text-center">experience</h4>
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
.container {
    position: relative;
    align-self: start;
    margin-top: 15px;
    max-width: 1000px;
    animation: fadein .7s linear, slideFromBottom .7s ease;
}
</style>