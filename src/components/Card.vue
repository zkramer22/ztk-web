<script setup>
import x from '@/assets/icon/x.svg?raw'

import { computed, onMounted, reactive } from 'vue';
import MediaItem from './MediaItem.vue';

    const props = defineProps({
        long: Boolean,
        animation: Boolean,
        drawer: Boolean,
        images: Array[Object],
        getS3Object: Function,
    })
    const state = reactive({
        drawerOpen: false,
        fullscreenImage: null,
        loadedImages: [],
    })
    const longClass = computed(() => props.long ? 'long' : '')
    const animationClass = computed(() => props.animation ? 'animation' : '')

    function handleCardClick() {
        if (props.drawer) toggleDrawer()

    }
    function toggleDrawer() {
        state.drawerOpen = !state.drawerOpen
    }

    function fullscreenHandler(index) {
        state.fullscreenImage = index
        toggleKeys()
        toggleScroll()
    }
    function switchFullscreenImage(dir) {
        let newIndex = state.fullscreenImage + dir
        if (newIndex >= state.loadedImages.length) newIndex = 0
        else if (newIndex < 0) newIndex = state.loadedImages.length - 1
        state.fullscreenImage = newIndex
    }

    function disableScroll(e) { 
        e.preventDefault()   // this allows trackpad zoom, but then you cant shift the viewport around. use e.ctrlKey to detect zoom
    }
    function enableKeys(e) {
        if (e.code === 'Escape') fullscreenHandler(null)
        else if (e.code === 'ArrowLeft') switchFullscreenImage(-1)
        else if (e.code === 'ArrowRight') switchFullscreenImage(1)
    }
    function toggleKeys() {
        if (state.fullscreenImage !== null) document.body.addEventListener('keydown', enableKeys)
        else document.body.removeEventListener('keydown', enableKeys)
    }
    function toggleScroll() {
        if (state.fullscreenImage !== null) document.body.addEventListener('wheel', disableScroll, { passive: false })
        else document.body.removeEventListener('wheel', disableScroll)
    }

    onMounted(() => {
        if (!props.images) return
        props.images.map((imageSrc, i) => {
            const image = new Image()
            image.onload = () => {
                state.loadedImages.push(image)
            }
            image.src = props.getS3Object('work', imageSrc)
        })
    })
</script>

<template>
    <div :class="`card ${longClass} ${animationClass}`" @click="handleCardClick">
        <div class="preview">
            <slot name="preview"></slot>
        </div>
    
        <div class="description">
            <slot name="description"></slot>
        </div>
    </div>

    <Transition name="expandDrawer" v-if="drawer">
        <div class="drawer-wrapper" v-show="state.drawerOpen">
            <div class="drawer">
                <MediaItem v-for="(image, index) in state.loadedImages" :key="image" 
                    @click="fullscreenHandler(index)"
                    :mediaSrc="image.src" 
                    :index
                    fullscreenAble rounded 
                />
            </div>
        </div>
    </Transition>

    <div v-if="state.fullscreenImage !== null" class="modal fullscreen">
        <MediaItem :mediaSrc="state.loadedImages[state.fullscreenImage].src"
            :class="`img`"
        />
        <div class="x" v-html="x" @click="fullscreenHandler(null)"></div>
        <div class="bg"></div>
    </div>
</template>


<style lang="scss">
    @import '@/assets/variables.scss';
    
    .card {
        position: relative;
        background-color: #222222;
        border-radius: 10px;
        overflow: hidden;
        animation: fadein .5s linear forwards;
        height: min-content;
        margin: 7px 0;
        &.animation {
            opacity: 0;
            animation: fadein .5s linear forwards, slideFromLeft ease .5s forwards;
        }
        .preview {
            border-right: 0px solid white;
            overflow: hidden;
            img, video {
                transition: scale .15s ease;
                scale: 1;
                object-position: 0 0;
            }
        }
        h4 {
            margin-bottom: 10px;
        }
        @media (hover:hover) {
            &:hover {
                background-color: #3b3b3b;
                .preview {
                    img, video {
                        scale: 1.1;
                    }
                }
            }
        }

    }
    .description {
        padding: 20px 15px;
        p {
            margin: 0;
        }
    }

    .drawer-wrapper {
        position: relative;
        overflow: hidden;
        height: 40vh;
        min-height: 300px;
        // padding: 0 10px 10px;
        padding: 3px 10px 10px;
        border: 5px solid #333333;
        border-top: none;
        // border-radius: 0 0 10px 10px;
        border-radius: 0 0 20px 20px;
        margin: 0 0 7px;
        // ::-webkit-scrollbar {
        //     height: 10px;
        //     width: 10px;
        //     background-color: black;
        // }
        // ::-webkit-scrollbar-track {
        //     background-color: black;
        // }
        // ::-webkit-scrollbar-track-piece {
        //     background-color: black;
        // }
        // ::-webkit-scrollbar-thumb:vertical {
        //     background-color: $primary-color-web;
        //     border-radius: 0px;
        // }    
        // ::-webkit-scrollbar-thumb:horizontal {
        //     background-color: $primary-color-audio;
        //     border-radius: 0px;
        // }
    }
    .drawer {
        display: flex;
        gap: 10px;
        height: 100%;
        overflow: scroll hidden;
        border-radius: 10px;
    }

    .modal {
        animation: fadein .4s linear, slideFromBottom .4s ease;
        position: fixed;
        z-index: 1000;
    }
    .fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-width: 100%;
        .img {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1500;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        .bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 900;
            background-color: rgba(0,0,0,.9);
        }
        .x {
            position: absolute;
            top: 15px;
            right: 15px;
            left: unset;
            bottom: unset;
            height: 75px;
            width: 75px;
            border-radius: 50%;
            border: 2px solid;
            z-index: 1500;
            justify-items: center;
            align-content: center;
            background-color: #222222;
            padding: 15px;
            svg {
                path {
                    stroke: #fff;
                }
            }
        }
    }
    
    @media screen and (min-width: 768px) {
        .card {
            &.long {
                display: grid;
                grid-template-columns: 1fr 2fr;
                grid-auto-rows: 180px;
            }
            .preview {
                img {
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
    }
    @media screen and (min-width: 1200px) {
        .card {
            &.long {
                grid-auto-rows: 250px;
            }
        }
    }

    .expandDrawer-enter-active,
    .expandDrawer-leave-active {
        transition: opacity .4s linear, 
                    height .4s ease, 
                    padding .4s ease,
                    margin .4s ease;
    }
    .expandDrawer-enter-from,
    .expandDrawer-leave-to {
        opacity: 0;
        height: 0;
        min-height: unset;
        padding: 0 10px;
        margin: 0;
    }
    .expandDrawer-enter-to,
    .expandDrawer-leave-from {
        opacity: 1;
        min-height: unset;
        height: 40vh;
        padding: 3px 10px 10px;
        margin: 0 0 7px;
    }

</style>