<script setup>
import { loaderMethods } from '@/store.js'

const { getS3Object } = loaderMethods
const props = defineProps({
    mediaStr: String,
})

const isVideo = props.mediaStr.split('.')[1] === 'mov'
</script>

<template>
    <div class="media-item">
        <video autoplay loop v-if="isVideo" :src="getS3Object('work', mediaStr)" />
        <img v-else :src="getS3Object('work', mediaStr)" />
    </div>
</template>

<style lang="scss">
    @media (hover:hover) {
        .media-item {
            &:hover {
                // scale: 1.05;
                // box-shadow: 0px 2px 7px -2px #222222;
            }
        }
    }
</style>