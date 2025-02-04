<script async setup>
import { ref, computed } from 'vue';

const props = defineProps({
    mediaSrc: String,
    rounded: Boolean,
    fullscreenAble: Boolean,
    controls: Boolean,
})

const imgRef = ref(null)
const videoRef = ref(null)
const videoWrapper = ref(null)

const fullscreenAbleClass = computed(() => props.fullscreenAble ? 'fullscreen-able' : '')
const roundedClass = computed(() => props.rounded ? 'rounded' : '')

const isVideo = computed(() => {
    const split = props.mediaSrc.split('.')
    return split[split.length - 1] === 'mov'
})

</script>

<template>
    <video v-if="isVideo" ref="videoRef" :src="mediaSrc"
        :class="`media ${roundedClass}`"
        autoplay loop playsinline :controls="controls" 
        controlslist="nodownload" 
        oncontextmenu="return false" />
    
    <img v-else ref="imgRef" :src="mediaSrc"
        :class="`media ${roundedClass} ${fullscreenAbleClass}`"
        oncontextmenu="return false" draggable="false" />
</template>

<style lang="scss">
    .media {
        position: relative;
        // object-fit: cover;
        object-fit: contain;
        &.rounded {
            border-radius: 10px;
        }
        @media (hover:hover) {
            &.fullscreen-able {
                &:hover {
                    filter:brightness(.7);
                }
            }
            &.fullscreen.img {
                &:hover {
                    filter: none;
                }
            }
        }
    }
    
    .media-item {
        user-select: none;
    }
</style>