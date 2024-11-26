<script setup>
import { ref, onMounted, computed } from 'vue'
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

</script>

<template>
    <div id="top"></div>
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
    <!-- <div id="noMobileLandscape">
        <h4>It'll be much better</h4>
    </div> -->
</template>

<style lang="scss">
@import '@/assets/variables.scss'; 

.container {
    position: relative;
    align-self: start;
    margin: 0 auto;
    margin-top: 15px;
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
        transition: transform .2s;
    }
}
#mainView {
    // display: initial;
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
        // grid-template-rows: 2fr 250px 0fr 4fr;
        grid-gap: 15px;
        transition: grid-template-rows .4s ease;
        &.active {
            grid-template-rows: 0px 2fr 250px 4fr 0fr;
        }
    }
}

.site-title-text {
  position: relative;
  text-align: center;
  animation: fadein 1s linear, slideFromLeft 1s ease;
}

h2.selector {
  margin-bottom: 32px;
  font-size: 4rem;
  transition: font-size .4s ease, margin .4s ease;
  margin-top: 55px;
  &.active {
    margin-top: 15px;
    font-size: 2.75rem;
    margin-bottom: 15px;
  }
}

.pageTypeSwitch {
  position: relative;
  z-index: 20;
  width: 150px;
  height: 40px;
  display: grid;
  margin: 0 auto;
  grid-template-columns: 1fr 1fr;
  border: 1px solid $primary-black;
  border-radius: 30px;
  background-color: #313532;
  animation: slideFromBottom 1s ease, fadein 1s ease;
  ;
  .switch-indicator {
    position: absolute;
    margin: 3px;
    width: 50%;
    height: calc(100% - 6px);
    border-radius: 30px;
    transition: left .4s ease, background-color .4s linear;
    &.audio {
      left: 0;
      background-color: #6A66A3;
    }
    &.web {
      left: 68px;
      background-color: #8FBC94;
    }
    @media (hover:hover) {
        &:hover {
          filter: brightness(1.2);
        }
    }
  }
  .switch-text {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 10;
    pointer-events: none;
  }
}

.keywords {
  position: relative;
  margin: 20px calc(50% - 301px);
  animation: slideFromBottom 1s ease;
  transition: margin .3s ease;
  animation: fadein 1s linear;
  p {
    font-size: 22px;
  }
}


.bgImg {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.portfolio-section {
  background-color: $primary-black-trans;
  text-align: justify;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0px 0px 7px -2px black;
  overflow: hidden;
  &.side-border {
    border-left: 5px solid white;
  }
  &.title {
    margin-bottom: 15px;
  }
}

.z-card {
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 0 10px;
  font-size: 1rem;
  border-radius: 5px;
  font-weight: 500;
  background-color: $primary-color-audio;
  &.min-height-1 {
    min-height: 70px;
  }
  &.max-width-1 {
    max-width: 300px;
  }
}

.audio-items-title {
  h4 {
    font-weight: 500;
  }
  padding: 10px 16px;
  height: 100%;
  width: 100%;
  position: relative;
}

.searchbar {
  padding: 5px 10px;
  border: 1px solid;
  border-radius: 25px;
  &:focus-within {
    border: 1px solid $secondary-color-audio;
  }
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

@media screen and (max-width: 500px) and (max-height: 500px) {
    #mainView {
        display: none;
    }
    #windowSmall {
        display: block;
    }
}

@media screen and (max-height: 500px) {
    .fullscreen-wrapper.grid {
        grid-template-rows: 0px 1fr 150px 0fr 3fr;
    }
    nav {
        grid-template-rows: 0px 1fr 150px 0fr 3fr;
    }
}

@media (min-width: 768px) and (min-height: 500px) {
    #home-grid {
        display: grid;
        grid-template-columns: 10fr 2fr 10fr;
        align-items: center;
    }
    .site-title-text {
        text-align: right;
    }
    #home-divider {
        height: 100%;
        max-height: 300px;
        width: 4px;
        border-radius: 5px;
        background-color: white;
        justify-self: center;
        position: relative;
        animation: fadein 1s linear, slideFromTop 1s ease;
    }
    #welcome-text {
        text-align: left;
    }
}

h4 {
    margin-bottom: 35px;
}

@media screen and (min-width: 768px) {
    h4 {
        font-size: 1.75rem;
    }
    p {
        font-size: 18px;
    }
    .fullscreen-wrapper {
        padding: 16px;
    }
}

@media screen and (min-width: 1440px) {
    h4 {
        font-size: 2rem;
    }
    p {
        font-size: 22px;
    }
}

</style>