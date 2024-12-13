<script setup>
import x from '@/assets/icon/x.svg?raw'
import chevron from '@/assets/icon/chevron.svg?raw'

import { computed, onMounted, reactive } from 'vue';
import MediaItem from './MediaItem.vue';
// import Chip from './Chip.vue'

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
        // loadedImages: [],
    })
    const longClass = computed(() => props.long ? 'long' : '')
    const animationClass = computed(() => props.animation ? 'animation' : '')
    const drawerOpenClass = computed(() => state.drawerOpen ? 'open' : '')
    const fullscreenClass = computed(() => state.fullscreenImage !== null ? 'active' : '')

    const fullscreenImageSrc = computed(() => {
        return state.fullscreenImage !== null 
            ? props.getS3Object(props.images[state.fullscreenImage].path)
            : ''
    })

    function handleCardClick(e) {
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
        // if (newIndex >= state.loadedImages.length) newIndex = 0
        // else if (newIndex < 0) newIndex = state.loadedImages.length - 1
        if (newIndex >= props.images.length) newIndex = 0
        else if (newIndex < 0) newIndex = props.images.length - 1
        state.fullscreenImage = newIndex
    }

    function disableScroll(e) { 
        // use e.ctrlKey to detect zoom
        e.preventDefault()   
    }
    function enableKeys(e) {
        if (e.metaKey || e.shiftKey || e.altKey || e.code === 'Space' || e.code === 'Tab') e.preventDefault()
        if (e.code === 'Escape' || e.code === 'Backspace') fullscreenHandler(null)
        else if (e.code.search('Arrow') + 1) {
            e.preventDefault()
            if (e.code === 'ArrowLeft') switchFullscreenImage(-1)
            else if (e.code === 'ArrowRight') switchFullscreenImage(1)
        }
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
        // if (!props.images) return
        // props.images.map((img, i) => {
        //     let imageObj
        //     if (img.path.split('.')[1] === 'mov') {
        //         imageObj = {
        //             alt: img.alt,
        //             src: props.getS3Object(img.path)
        //         }
        //         state.loadedImages.push(imageObj)
        //     }
        //     else {
        //         imageObj = new Image()
        //         imageObj.onload = () => {
        //             state.loadedImages.push(imageObj)
        //         }
        //         imageObj.alt = img.alt
        //         imageObj.src = props.getS3Object(img.path)
        //     }
        // })
    })
</script>

<template>
    <div :class="`card ${longClass} ${animationClass}`" @click="handleCardClick">
        <div class="preview">
            <slot name="preview"></slot>
        </div>
    
        <div class="description">
            <slot name="description"></slot>
            <slot name="extra"></slot>
            <div v-if="drawer" class="drawer-open">
                <div :class="`chevron ${drawerOpenClass}`" v-html="chevron"></div>
            </div>
        </div>
    </div>

    <Transition v-if="drawer" name="expandDrawer">
        <div class="drawer-wrapper" v-show="state.drawerOpen">
            <div class="drawer">
                <!-- <MediaItem v-for="(image, index) in state.loadedImages" :key="image" 
                    @click="fullscreenHandler(index)"
                    :mediaSrc="image.src" 
                    :index
                    fullscreenAble rounded
                /> -->
                <MediaItem v-for="(image, index) in images" :key="image" 
                    @click="fullscreenHandler(index)"
                    :mediaSrc="props.getS3Object(image.path)" 
                    :index
                    fullscreenAble rounded
                />
            </div>
        </div>
    </Transition>

    <div :class="`modal fullscreen ${fullscreenClass}`">
        <!-- <MediaItem :mediaSrc="state.loadedImages[state.fullscreenImage].src"
            :class="`img`"
        />
        <p v-if="state.loadedImages[state.fullscreenImage].alt" class="caption">{{ state.loadedImages[state.fullscreenImage].alt }}</p> -->
        <MediaItem :mediaSrc="fullscreenImageSrc"
            :class="`img`"
        />
        <p v-if="state.fullscreenImage !== null && images[state.fullscreenImage].alt" class="caption">{{ images[state.fullscreenImage].alt }}</p>
        <div class="modal-button x" v-html="x" @click="fullscreenHandler(null)"></div>
        <div class="bg"></div>
        <div @click="switchFullscreenImage(-1)" class="modal-button prev" v-html="chevron"></div>
        <div @click="switchFullscreenImage(1)" class="modal-button next" v-html="chevron"></div>
    </div>
</template>


<style lang="scss">
    @import '@/assets/variables.scss';

    .modal-button {
        position: absolute;
        z-index: 1500;
        top: 15px;
        bottom: 15px;
        width: 75px;
        height: 75px;
        margin: auto;
        border: 2px solid;
        border-radius: 50%;
        justify-items: center;
        justify-content: center;
        text-align: center;
        align-content: center;
        background-color: #222222;
        padding: 15px;
        transition: scale .1s ease;
        @media (hover:hover) {
            &:hover {
                background-color: #5a5a5a;
                scale: 1.1;
            }
            &:active {
                scale: 1;
            }
        }
        svg {
            position: relative;
            margin: auto;
            path {
                stroke: #fff;
            }
        }
    }
    
    .prev {
        rotate: -90deg;
        left: 15px;
        svg {
            top: -2px;
        }
    }

    .next {
        right: 15px;
        rotate: 90deg;
        svg {
            top: -2px;
        }
    }

    .x {
        top: 15px;
        right: 15px;
        left: unset;
        bottom: unset;
        svg {
            position: relative;
        }
    }
    
    .drawer-open {
        position: absolute;
        bottom: 20px;
        right: 20px;
        .chevron {
            width: 30px;
            height: 30px;
            rotate: 180deg;
            transform: rotateX(0);
            transition: transform .2s ease;
            &.open {
                transform: rotateX(180deg);
            }
        }
    }
    
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
    .caption {
        display: block;
        position: absolute;
        bottom: 7px;
        left: 0;
        right: 0;
        z-index: 1500;
        width: max-content;
        max-width: 95%;
        margin: 0 auto;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0px 2px 3px -1px black;
        background-color: #3a3a3a;
        text-align: center;
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
        padding: 3px 10px 10px;
        // border: 5px double $primary-color-web;
        // border: 5px double white;
        border: 3px solid white;
        border-top: none;
        border-radius: 0 0 20px 20px;
        // border-radius: 20px;
        margin: 0 0 7px;
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
        opacity: 0;
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
    }
    
    @media screen and (min-width: 768px) {
        .card {
            &.long {
                display: grid;
                grid-template-columns: 1fr 2fr;
                grid-auto-rows: minmax(180px, auto);
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
                grid-auto-rows: minmax(250px, auto);
            }
        }
        .caption {
            max-width: 1200px;
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