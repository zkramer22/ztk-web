<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Nav from './components/Nav.vue'
import Selector from './components/Selector.vue'
import Home from './components/Home.vue'
import gear from '@/assets/icon/gear.svg?raw'

const bgImgPath = 'https://ztk-web.s3.us-west-1.amazonaws.com/general/coding-screen-1.jpg'

// import { useFollowMouse } from './composables/followMouse'
// const { curX, curY, tgX, tgY, interactive, load, unload } = useFollowMouse()

import { selector } from './store.js'
const selectorActive = computed(() => !!selector.activeRoute)

import { useIsScrolled } from '@/composables/isScrolled'
const { scrollDown } = useIsScrolled()

import { useRoute } from 'vue-router'
const route = useRoute()

const hideNav = computed(() => scrollDown.value && route.path !== '/')
const showBlobs = ref(true)

function toggleBlobs() {
    if (showBlobs.value) {
        showBlobs.value = false
        unload()
    }
    else {
        showBlobs.value = true
        load()
    }
}

function toggleFxPaused(val) {
    document.documentElement.classList.toggle('fx-paused', val)
}

function handleWindowBlur() {
    toggleFxPaused(true)
}

// Function to run when the window gains focus
function handleWindowFocus() {
    toggleFxPaused(false)
}

function handleDocumentVisibility() {
    const val = document.hidden
    document.documentElement.classList.toggle('fx-paused', val)
}

// Add the event listeners

function addFocusListeners() {
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('visibilitychange', handleDocumentVisibility)
}

function removeFocusListeners() {
    window.removeEventListener('blur', handleWindowBlur);
    window.removeEventListener('focus', handleWindowFocus);
    document.removeEventListener('visibilitychange', handleDocumentVisibility)
}

onMounted(() => addFocusListeners())

onUnmounted(() => {

})
</script>

<template>
    <Transition>
        <div class="gradient-bg" v-if="showBlobs">
            <svg xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                    <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
            
            <div class="gradients-container">
                <div class="goo-scale">
                    <div class="goo">
                        <div class="blob g1"></div>
                        <div class="blob g2"></div>
                        <div class="blob g3"></div>
                        <div class="blob g4"></div>
                        <div class="blob g5"></div>
                        <!-- <div ref="interactive" class="interactive"></div> -->
                    </div>
                </div>
            </div>
        </div>
    </Transition>
    
    <div class="shade-overlay" :class="{ selectorActive, showBlobs }"></div>
    <img :src="bgImgPath" alt="closeup view of coding text editor" class="bgImg"/>
        
    <!-- <div ref="cursor" id="invertedcursor"></div> -->

    <Nav :hideNav>
        <!-- <button id="settings-toggle" class="hidenav-trans" @click="toggleBlobs">
            <div v-html="gear"></div>
        </button> -->
        <Home :show="!selector.activeRoute" />
        <Selector />
    </Nav>

    <main>
        <RouterView />
    </main>
</template>

<style lang="scss">
.v-enter-active, 
.v-leave-active {
    transition: opacity .5s linear;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

body, html {
    // // cursor: none !important;
    touch-action: manipulation;
}

#app {
    position: relative;
    margin: 0 auto;
    min-height: 100svh;
    min-height: 100dvh;
    display: flex;
    flex-flow: column;
}

@media (hover:hover) {
    #invertedcursor {
        position: absolute;
        pointer-events: none;
        width: 35px;
        height: 35px;
        background: #fff;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        mix-blend-mode: difference;
        transition: transform .2s, width .2s ease, height .2s ease;
        &.mousedown {
            width: 20px;
            height: 20px;
            transition: width .05s ease, height .05s ease;
        }
    }
}

.bgImg {
    position: fixed;
    z-index: -2;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
}

.shade-overlay {
    pointer-events: none;
    width: 100%;
    height: 100%;
    z-index: -1;
    position: fixed;
    background-color: black;
    opacity: 1;
    animation: fadeBack 2s linear forwards;
    transition: opacity 2s ease;
    &.showBlobs {
        opacity: .77 !important;
    }
}

.info-link {
    img, .icon {
        margin: 0 auto;
    }
    img {
        width: 2rem;
    }
    .icon {
        width: 1.5rem;
    }
}

.chip {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    white-space: nowrap;
    padding: .3rem .6rem;
    border: 1px solid;
    border-radius: 40px;
    &.home {
        position: relative;
        bottom: 2px;
        padding: 2px 7px;
        margin-right: 2px;
        background-color: var(--color-dark);
        border-width: 2px;
    }
    .icon {
        display: inline-block;
        width: 25px;
        height: 25px;
        svg {
            width: 100%;
            height: 100%;
        }
    }
}

.divider {
    height: 1px;
    background-color: white;
    border-radius: var(--button-radius);
    // border-radius: 20px;
    &.color-1 {
        height: 2rem;
        background-color: var(--color-1-vibrant);
    }
}

.hover-grow {
    scale: 1;
    filter: brightness(1);
    transition: var(--hover-grow-trans);
    @media (hover:hover) {
        &:hover {
            scale: 1.05;
            filter: brightness(1.1);
        }
        &:active {
            scale: 1;
            filter: brightness(1);
        }
    }
}

.hover-bright {
    filter: brightness(1);
    transition: filter .1s ease;
    @media (hover:hover) {
        &:hover {
            filter: brightness(1.4);
        }
        &:active {
            filter: brightness(1);
        }
    }
}

.card-item {
    border: 2px solid var(--color-black);
    border-radius: var(--button-radius);
    overflow: hidden;
    &.border {
        border: 2px solid var(--color-black);
    }
}

.card-item-hover {
    position: relative;
    transition: filter .2s ease;
    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background-color: white;
        z-index: 1;
        opacity: 0;
        transition: opacity .2s ease;
        pointer-events: none;
    }
    @media (hover:hover) {
        &:hover {
            &::after {
                opacity: .1;
            }
        }
    }
}

#blurb {
    p:last-of-type {
        margin-bottom: 0;
    }
}

.loading-spacer {
    height: calc(100svh - 15rem - var(--nav-height));
    margin-bottom: 100svh;
}

.custom-scroll::-webkit-scrollbar {
    width: 3px;
    height: 0px;
}

.custom-scroll::-webkit-scrollbar-track {
    // background: white;
}

.custom-scroll::-webkit-scrollbar-thumb {
    background: var(--color-1-vibrant);
    background-clip: content-box;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-1-light);
}

img {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
}


</style>