<script async setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
    mediaSrc: String,
    num: Number,
})

const imgRef = ref(null)
const videoRef = ref(null)
const videoWrapper = ref(null)
const fullscreen = ref(false)
const fullscreenClass = computed(() => fullscreen.value ? 'fullscreen' : '')
const isVideo = computed(() => {
    const split = props.mediaSrc.split('.')
    return split[split.length - 1] === 'mov'
})

// function loadVideo(videoSrc) {
//     return new Promise(resolve => {
//         const video = videoRef.value
//         video.oncanplaythrough = () => {
//             const { videoWidth, videoHeight } = video
//             resolve({ videoWidth, videoHeight })
//         }
//     })
// }

// async function processVideo() {
//     const fullPath = getS3Object('work', props.mediaSrc)
//     const { videoWidth, videoHeight } = await loadVideo(fullPath)
//     state.loaded = true
//     return { videoWidth, videoHeight }
// }

// onMounted(async () => {
onMounted(() => {
    // let delay = .1 * props.num
    // if (isVideo) {
    //     // videoRef.value.style.animationDelay = `${delay}s`
    // }
    // else {
    //     imgRef.value.style.animationDelay = `${delay}s`
    // }
    
    // if (isVideo) {
    //     const { videoWidth, videoHeight } = await processVideo()
    //     videoWrapper.value.style.maxWidth = `${videoWidth}px`
    // }
    // else {
    //     const { width, height } = await processImage()
    //     imgRef.value.style.maxWidth = `${width}px`
    //     imgRef.value.addEventListener('contextmenu', (e) => e.preventDefault())
    // }
})
</script>

<template>
    <video v-if="isVideo" ref="videoRef" class="media"
        :src="mediaSrc"
        autoplay loop playsinline controls 
        controlslist="nodownload" 
        oncontextmenu="return false" />
    
    <img v-else ref="imgRef" class="media"
        :src="mediaSrc"
        oncontextmenu="return false" draggable="false" />
</template>

<style lang="scss">
    .media {
        position: relative;
    }
    .media-item {
        user-select: none;
    }
</style>