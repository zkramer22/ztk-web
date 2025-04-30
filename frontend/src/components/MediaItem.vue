<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    media: {
        type: Object,
        required: true,
    },
    rounded: {
        type: Boolean,
        default: false,
    },
    fullscreenAble: {
        type: Boolean,
        default: false,
    },
    tailwind: {
        type: String,
    },
    aspectRatio: {
        type: Number,
    },
})

const loaded = ref(false)
const isVideo = computed(() => props.media?.type === 'video')

const roundedClass = computed(() => props.rounded ? 'rounded' : '')
const fullscreenAbleClass = computed(() => props.fullscreenAble ? 'fullscreenAble' : '')
const computedStyles = computed(() => (
    { 
        aspectRatio: props.aspectRatio,
    }
))

function onLoad() {
    loaded.value = true
}
</script>

<template>
    <div class="media-wrapper" 
        :class="tailwind"
        :style="computedStyles"
    >
        <video v-if="isVideo"
            autoplay loop playsinline
            controls controlslist="nodownload"
            oncontextmenu="return false"
            class="media">
            <source v-if="media.webm?.asset?.url" :src="media.webm.asset.url" type="video/webm" />
            <source v-if="media.mp4?.asset?.url" :src="media.mp4.asset.url" type="video/mp4" />
        </video>

        <picture v-else>
            <source v-if="media.avif?.asset?.url" :srcset="media.avif.asset.url" type="image/avif" />
            <source v-if="media.webp?.asset?.url" :srcset="media.webp.asset.url" type="image/webp" />
            <img v-if="media.webp?.asset?.url"
                :src="media.webp.asset.url"
                :alt="media.alt"
                :class="{ loaded }"
                class="media"
                draggable="false"
                oncontextmenu="return false"
                @load="onLoad"
            />
        </picture>
    </div>
</template>

<style scoped lang="scss">
.media-wrapper {
    overflow: hidden;
    object-fit: cover;
    position: relative;
    user-select: none;
    &.fullHeight {
        height: 100%;
    }
}
.media {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 0%;
    opacity: 0;
    transition: opacity .2s linear;
    transition-delay: .2s;
    &.loaded {
        opacity: 1;
    }
}

.rounded {
    border-radius: 12px;
    overflow: hidden;
}

.fullscreenAble {
    cursor: zoom-in;
}
</style>
