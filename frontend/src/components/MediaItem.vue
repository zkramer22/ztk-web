<script setup>
import { ref, computed, watch } from 'vue'
import { useSanityImage } from '../composables/sanityImage'

const props = defineProps({
    item: { required: true },   
    rounded: { type: Boolean, default: false },
    isSanityImage: { type: Boolean, default: true },
    aspectRatio: { type: Number },
    alt: { type: String, default: '' },
    fullHeight: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    autoplay: { type: Boolean, default: true },
    controls: { type: Boolean, default: false },
    playsinline: { type: Boolean, default: true },
    loop: { type: Boolean, default: true },
    muted: { type: Boolean, default: true },
})

const loaded = ref(false)
const emit = defineEmits(['imageLoaded'])

function getExtFromRef(ref) {
    if (typeof ref !== 'string') return ''
    const parts = ref.split('-')
    const maybeExt = parts[0] === 'file' ? parts[2] : parts[3]
    return (maybeExt || '').toLowerCase()
}

function isVideoUrl(str) {
    return typeof str === 'string' && /\.(mp4|webm)(\?.*)?$/i.test(str)
}

const canPlayWebM = computed(() => {
    if (typeof document === 'undefined') return true // SSR-safe default
    const v = document.createElement('video')
    return !!v.canPlayType && v.canPlayType('video/webm; codecs="vp9,vorbis"') !== ''
})

// -------------------- media type -------------------- //
const isVideo = computed(() => {
    if (typeof props.item === 'string') return isVideoUrl(props.item)
    // explicit dual-source object
    if (props.item?.mp4 || props.item?.webm) return true

    // file-like
    if (props.item?.mimeType) return props.item.mimeType.startsWith('video/')
    if (props.item?.asset?.mimeType) return props.item.asset.mimeType.startsWith('video/')

    // ref fallback
    const ref = props.item?.asset?._ref
    const ext = getExtFromRef(ref)
    if (ext) return ['mp4', 'webm', 'mov', 'm4v'].includes(ext)

    return false
})

// -------------------- image src -------------------- //
const imgSrc = computed(() => {
    if (!isVideo.value) {
        if (props.isSanityImage && props.item?.asset) {
            return useSanityImage(props.item).auto('format').url()
        }
        return typeof props.item === 'string' ? props.item : (props.item?.url || '')
    }
    return ''
})

// -------------------- video sources -------------------- //
// Accepts:
// 1) string (mp4/webm url)
// 2) object with { url } (your existing GROQ mapping from blockContent)
// 3) object with { webmUrl, mp4Url }
// 4) dereffed Sanity file { asset: { url, mimeType } }
const videoSources = computed(() => {
    if (!isVideo.value) return []

    const sources = []

    // dual-source fields (preferred)
    const webmUrl = props.item?.webmUrl
    const mp4Url = props.item?.mp4Url

    // legacy single url
    const singleUrl = typeof props.item === 'string'
        ? props.item
        : (props.item?.url || props.item?.asset?.url || '')

    // If dual sources provided:
    if (webmUrl || mp4Url) {
        if (canPlayWebM.value && webmUrl) sources.push({ src: webmUrl, type: 'video/webm' })
        if (mp4Url) sources.push({ src: mp4Url, type: 'video/mp4' })
        // if browser can't play webm, it will use mp4 (order above enforces this)
    } else if (singleUrl) {
        // infer type from extension
        const isWebm = /\.webm(\?.*)?$/i.test(singleUrl)
        const type = isWebm ? 'video/webm' : 'video/mp4'
        // if singleUrl is webm but browser doesn't support it, we still include it;
        // you can pass mp4Url to guarantee a fallback.
        sources.push({ src: singleUrl, type })
    }

    return sources
})

// poster handling (string URL or Sanity image)
const posterUrl = computed(() => {
    const p = props.item?.posterUrl || props.item?.poster
    if (!p) return undefined
    if (typeof p === 'string') return p
    if (p?.asset) return useSanityImage(p).width(1600).auto('format').url()
    return undefined
})

const computedStyles = computed(() => ({
    aspectRatio: props.aspectRatio
}))

function setLoaded() {
    loaded.value = true
    // for images we already have src, for video we can emit first usable source
    const firstSrc = !isVideo.value ? imgSrc.value : (videoSources.value[0]?.src || '')
    emit('imageLoaded', firstSrc)
}

watch(() => [imgSrc.value, JSON.stringify(videoSources.value)], () => {
    loaded.value = false
})
</script>

<template>
    <div class="media-wrapper" :class="{ fullHeight, rounded }" :style="computedStyles">
        <div v-if="!loaded" :style="computedStyles" class="loading-shimmer w-full h-full" />
        <!-- <div v-if="loaded" :style="computedStyles" class="loading-shimmer w-full h-full" /> -->

        <!-- Image -->
        <img v-if="!isVideo"
            :src="imgSrc"
            :alt="alt"
            @load="setLoaded"
            class="media"
            :class="[{ center }]"
            oncontextmenu="return false"
            draggable="false"
        />

        <!-- Video with source fallback (WebM -> MP4) -->
        <video v-else
            class="media"
            :poster="posterUrl"
            :autoplay
            :loop
            :muted
            :playsinline
            :controls
            controlslist="nodownload"
            oncontextmenu="return false"
            @loadeddata="setLoaded"
        >
            <source v-for="s in videoSources" :key="s.src" :src="s.src" :type="s.type" />
            Your browser does not support the video tag.
        </video>
    </div>
</template>

<style lang="scss">
.media-wrapper {
    overflow: hidden;
    position: relative;
    user-select: none;

    &.fullHeight {
        height: 100%;
    }
}

.media {
    display: block;
    width: 100%;
    height: 100%;
    object-position: top left;
    object-fit: cover;
    &.center {
        object-position: top center;
    }
}
</style>
