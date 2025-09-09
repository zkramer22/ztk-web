<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import MediaItem from './MediaItem.vue';
import arrow from '@/assets/icon/arrow.svg?raw'
import fullscreen from '@/assets/icon/fullscreen.svg?raw'
import x from '@/assets/icon/x.svg?raw'

const props = defineProps({
    items: { type: Array[Object], required: true }
})

const carouselViewport = ref(null)
const showUI = ref(true)
const slideEls = ref([])
const currentSlide = ref(0)
const limit = ref(false)
let io = null
const isFullscreen = ref(false)

function setSlideEl(el, i) {
    if (!el) return
    slideEls.value[i] = el
}

function setFullscreen(val) {
    isFullscreen.value = val
}

function move(delta) {
    const vp = carouselViewport.value
    if (!vp) return
    vp.scrollTo({
        left: vp.scrollLeft + vp.clientWidth * delta,
        behavior: 'smooth'
    })
}

onMounted(async () => {
    await nextTick()
    io = new IntersectionObserver((entries) => {
        let bestIdx = currentSlide.value
        let bestRatio = 0
        for (const e of entries) {
            if (!e.isIntersecting) continue
            if (e.intersectionRatio > bestRatio) {
                bestRatio = e.intersectionRatio
                bestIdx = slideEls.value.indexOf(e.target)
            }
        }
        if (bestRatio >= 0.5 && bestIdx !== -1 && bestIdx !== currentSlide.value) {
            currentSlide.value = bestIdx
        }
    }, {
        root: carouselViewport.value,
        threshold: [0.25, 0.5, 0.75, 0.98]
    })

    slideEls.value.forEach(el => io.observe(el))
})

onBeforeUnmount(() => {
    io?.disconnect()
})

watch(isFullscreen, (v) => {
    const body = document.body
    body.classList.toggle('fullscreen-open', v)

    if (v) {
        body.dataset.prevOverflow = body.style.overflow || ''
        body.style.overflow = 'hidden'
    } else {
        body.style.overflow = body.dataset.prevOverflow || ''
        delete body.dataset.prevOverflow
    }
})

</script>


<template>
    <div v-if="isFullscreen" class="carousel-modal-bg" />
    
    <div 
        class="carousel-container rounded" 
        :class="{ isFullscreen }"
        @click="showUI = !showUI"
    >
        <div class="relative">
            <div ref="carouselViewport" class="flex items-center gap-4 overflow-x-auto snap-viewport">
                <figure class="snap-slide" v-for="(item, i) of items"
                    :key="item._key || i"
                    :ref="el => setSlideEl(el, i)"
                    role="group"
                    :aria-label="`Slide ${i + 1} of ${items.length}`"
                >
                    <MediaItem :item />
                </figure>
            </div>
            
            <div class="slide-count carousel-ui text-xs bg-black p-2 rounded"  :class="{ showUI, limit }">
                {{ currentSlide + 1 }} of {{ items.length }}
            </div>
            <div v-html="fullscreen" class="fullscreen-btn carousel-ui bg-black p-2 rounded"  :class="{ showUI }" 
                @click.stop="isFullscreen = !isFullscreen"
            />
    
            <button v-if="isFullscreen" @click.stop="setFullscreen(false)" class="close-btn carousel-ui bg-black p-2 rounded" :class="{ showUI }">
                <div v-html="x" />
            </button>
            <button v-if="currentSlide !== 0" @click.stop="move(-1)" class="prev-btn carousel-ui" :class="{ showUI }">
                <div v-html="arrow" />
            </button>
            <button v-if="currentSlide !== items.length - 1" @click.stop="move(1)" class="next-btn carousel-ui" :class="{ showUI }">
                <div v-html="arrow" style="rotate: 180deg"/>
            </button>
        </div>

        <figcaption class="p-2">
            <strong>{{ items[currentSlide].title }}: </strong><span class="opacity-85">{{ items[currentSlide].caption }}</span>
        </figcaption>
    </div>
</template>

<style lang="scss" scoped>
.carousel-modal-bg {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0,0,0,.95);
}

.carousel-container {
    --frame-h: clamp(360px, 75svh, 900px);
    overflow: hidden;

    border: 1px solid var(--color-darker);
    background: var(--color-black);

    figure { 
        border: none; 
        border-radius: 0; 
    }

    figcaption { 
        border-top: 1px solid var(--color-darker); 
    }

    .carousel-ui {
        position: absolute;
        z-index: 1;
        background: var(--color-black);
        opacity: 0;
        pointer-events: none;
        transition: opacity .2s linear;
        &.showUI { 
            opacity: .8; 
            pointer-events: all; 
        }
    }

    @media (hover:hover) {
        .carousel-ui.showUI { 
            opacity: .2; 
        }
        &:hover { 
            .carousel-ui.showUI { 
                opacity: .8; 
            } 
        }
    }

    .slide-count { 
        top: .5rem; 
        right: .5rem; 
    }
    button {
        width: 2rem;
        
        &.prev-btn, &.next-btn { top: 50%; transform: translateY(-50%); }
        &.prev-btn { left: .5rem; }
        &.next-btn { right: .5rem; }
        &.close-btn { left: .5rem; top: .5rem; }
    }
    .fullscreen-btn { bottom: .5rem; right: .5rem; }
}

.snap-viewport {
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
}

.snap-slide {
    margin: 0;
    flex: 0 0 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    scroll-snap-align: center;
    scroll-snap-stop: always;
}

.snap-slide :deep(img),
.snap-slide :deep(video) {
    max-height: var(--frame-h);
}

.snap-slide :deep(.media) {
    object-fit: contain;
    object-position: center;
}

.carousel-container.isFullscreen {
    position: fixed;
    inset: 0;
    z-index: 10000;
    border-radius: 0;
    width: 100vw;
    height: 100svh;
    margin: auto;
    
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;

    .snap-viewport { 
        height: 100%; 
    }
    .snap-slide {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .snap-slide :deep(img),
    .snap-slide :deep(video) {
        max-height: 90svh;
    }
}

</style>