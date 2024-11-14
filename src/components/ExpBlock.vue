<script setup>
    const props = defineProps({
        title: String,
        body: String,
        img: String,
    })
</script>

<template>
    <div class="exp-block-text">
        <h3>{{ title }}</h3>
        <p>{{ body }}</p>
    </div>
    <div class="exp-block-img img-container screenshot">
        <img :src="img" alt="wetscott multimedia landing page"/>
    </div>
</template>

<style lang="scss">

</style>