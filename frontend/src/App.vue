<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'
import Navi from './components/Navi.vue'
import Selector from './components/Selector.vue'

import { state } from './store.js'

/////////////////////////// variables /////////////////////////////
const router = useRouter()
const route = useRoute()
const bgImgPath = 'https://ztk-web.s3.us-west-1.amazonaws.com/general/coding-screen-1.jpg'
const cursor = ref(null)
const cursorX = ref(0)
const cursorY = ref(0)
const scrollY = ref(0)
const scrollDir = ref('')

const scrolledClass = computed(() => scrollY.value > 0 ? 'scrolled' : '')
////////////////////////// methods /////////////////////////////
function disableMouseEvents() {
    document.onmousemove = null
    document.onmousemove = null
}
function enableMouseEvents() {
    document.onmousemove = mouseMove
    document.onscroll = mouseScroll
    document.onmousedown = mouseDown
    document.onmouseup = mouseUp
}
function selectorClick(option) {
    if (option === state.selectorActive) window.scrollTo({ top: 0 })

    if (option) {
        state.selectorActive = option
        router.push(`/${option}`)
    }
    else {
        state.selectorActive = null
        router.push(`/`)
    }
}
function updateMouse() {
    cursor.value.style.left = `${cursorX.value}px`
    cursor.value.style.top = `${cursorY.value}px`
}
function mouseDown() {
    cursor.value.classList.add('mousedown')
}
function mouseUp() {
    cursor.value.classList.remove('mousedown')
}
function mouseMove(e) {
    cursorX.value = e.clientX
    cursorY.value = e.clientY + scrollY.value
    updateMouse()
}
function mouseScroll(e) {
    const scroll = document.documentElement.scrollTop
    // deteremine any change in scroll direction
    if (scroll > scrollY.value && scrollDir.value !== 'down') scrollDir.value = 'down'  // scroll has changed to down
    else if (scroll < scrollY.value && scrollDir.value !== 'up') scrollDir.value = 'up'  // scroll has changed to up

    // update cursorY value based on scroll direction and scroll delta
    if (scrollDir.value === 'down') cursorY.value += scroll - scrollY.value
    else if (scrollDir.value === 'up') cursorY.value -= scrollY.value - scroll
    
    // update cursor style with new cursorY value
    updateMouse()

    // update , safeguard against values < 0
    scrollY.value = scroll <= 0 ? 0 : scroll
}
function preventLandscape() {
  if (window.screen.orientation && screen.orientation.lock) {
    screen.orientation.lock("portrait-primary")
      .catch((error) => {});
  }
}
function watchScreenOrientation() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (isMobile) {
        preventLandscape()

        window.addEventListener("orientationchange", () => {
            if (window.screen.orientation.type.includes("landscape")) {
                preventLandscape()
            }
        })
    }
}
function backButtonClick() {
    router.go(-1)
}

///////////////////////// lifecycle //////////////////////////////
onMounted(() => {
    enableMouseEvents()
    watchScreenOrientation()
})

onUnmounted(() => {
    disableMouseEvents()
})

</script>

<template>
    <div :class="`shade-overlay ${state.selectorActiveClass}`"></div>
    <img :src="bgImgPath" alt="closeup view of coding text editor"
        class="bgImg"/>
    <div ref="cursor" id="invertedcursor"></div>
    
    <div id="mainView" :class="`fullscreen-wrapper grid ${state.selectorActiveClass}`">
        <Navi @selector-click="selectorClick"
            :scrolledClass="scrolledClass" 
            :selectorActiveClass="state.selectorActiveClass"
        >
            <Selector @selector-click="selectorClick" 
                      @back-button-click="backButtonClick"
                      :selectorActive="state.selectorActive"
                      :selectorActiveClass="state.selectorActiveClass"
            />
        </Navi>
        
        <RouterView />
    </div>

    <div id="windowSmall">
        <h4>Oops. The window is too small!</h4>
        <h4>Please resize to improve viewing experience.</h4>
    </div>
</template>

<style lang="scss">
@import '@/assets/variables.scss'; 

.container {
    position: relative;
    align-self: start;
    margin: 0 auto;
    margin-top: 55px;
    width: 100%;
    max-width: 1000px;
    animation: fadein .7s linear, slideFromBottom .7s ease;
}

.spacer {
    margin-bottom: 100px;
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
        z-index: 100;
        mix-blend-mode: difference;
        transition: transform .2s, width .2s ease, height .2s ease;
        &.mousedown {
            width: 20px;
            height: 20px;
            transition: width .05s ease, height .05s ease;
        }
    }
}
#windowSmall {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 100;
    align-content: center;
    text-align: center;
}

.router-wrapper {
    position: relative;
    top: 0;
    margin-top: 15px;
}
.fade-enter-active, 
.fade-leave-active {
  transition: top .4s ease;
}
.fade-enter-from,
.fade-leave-to {
    top: 100vh;
}
.shade-overlay {
  pointer-events: none;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  background-color: rgba(0,0,0,0.8);
  transition: background-color .3s linear;
  &.active {
      background-color: rgba(0,0,0,0.9);
  }
}
.fullscreen-wrapper {
    height: 100%;
    position: relative;
    z-index: 1;
    padding: 10px;
    &.grid {
        display: grid;
        grid-template-rows: 0px 2fr 250px 0fr 4fr;

        // grid-template-rows: 50px 1fr 0fr 1fr;
        
        grid-gap: 15px;
        transition: grid-template-rows .4s ease;
        &.active {
            grid-template-rows: 0px 2fr 250px 4fr 0fr;
        }
    }
}

// @media screen and (aspect-ratio > .667) {

// }

.bgImg {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

p {
    font-size: 16px;
}


// @media screen and (aspect-ratio > 9 / 16) and (max-height: 500px) {
@media screen and (max-height: 300px) {
    #mainView {
        display: none;
    }
    #windowSmall {
        display: block;
    }
}

@media screen and (max-width: 500px) and (max-height: 499px) {
    #mainView {
        display: none;
    }
    #windowSmall {
        display: block;
    }
}

@media screen and (max-height: 499px) {
    .fullscreen-wrapper.grid {
        grid-template-rows: 0px 1fr 150px 0fr 3fr;
    }
    nav {
        grid-template-rows: 0px 1fr 150px 0fr 3fr;
    }
}

h4 {
    margin-bottom: 35px;
}

@media screen and (min-width: 768px) {
    p {
        font-size: 18px;
    }
    .fullscreen-wrapper {
        padding: 16px;
    }
}

@media screen and (min-width: 1440px) {
    p {
        font-size: 22px;
    }
}

</style>