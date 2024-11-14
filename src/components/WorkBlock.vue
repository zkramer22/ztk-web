<script setup>
    import Chip from './Chip.vue'

    const props = defineProps({
        title: String,
        body: String,
        imgs: Array,
        chips: Array,
    })
</script>

<template>
    <div class="work-block-text">
        <h3>{{ title }}</h3>
        <!-- <p>{{ body }}</p> -->
        <div class="chips flex">
            <Chip v-for="(text, i) in chips"
                :text="text"
            />
        </div>
    </div>
    <div class="work-block-img">
        <img :src="imgs[0]" alt="">
        <!-- <img v-for="img in imgs" :src="img"/> -->
    </div>
</template>

<style lang="scss">

</style>