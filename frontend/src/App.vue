<script setup>
import { onMounted } from 'vue'
import { useRouter, RouterView, useRoute } from 'vue-router'
import Nav from './components/Nav.vue'
import Selector from './components/Selector.vue'
import Home from './components/Home.vue'

import { state } from './store.js'
import { useCustomMouse } from './utils/mouse'

/////////////////////////// variables /////////////////////////////
const router = useRouter()
const route = useRoute()

const bgImgPath = 'https://ztk-web.s3.us-west-1.amazonaws.com/general/coding-screen-1.jpg'

const {         
    cursor,
    cursorX,
    cursorY,
    scrollY,
    scrollDir, 
} = useCustomMouse()

////////////////////////// methods /////////////////////////////
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
function preventLandscape() {
  if (window.screen.orientation && screen.orientation.lock) {
    screen.orientation.lock("portrait-primary")
      .catch((error) => {});
  }
}
function watchScreenOrientation() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(Navigator.userAgent)
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
    
    
    watchScreenOrientation()
})

</script>

<template>
    <div :class="`shade-overlay ${state.selectorActiveClass}`"></div>
    <img :src="bgImgPath" alt="closeup view of coding text editor"
        class="bgImg"/>
    <div ref="cursor" id="invertedcursor"></div>
    
    <main>
        <Nav @selector-click="selectorClick"
            :selectorActiveClass="state.selectorActiveClass"
            :path="route.path"
        >
            <Home :show="!state.selectorActive" />

            <Selector @selector-click="selectorClick" 
                      @back-button-click="backButtonClick"
                      :selectorActive="state.selectorActive"
                      :selectorActiveClass="state.selectorActiveClass"
            />
        </Nav>
        <RouterView />
    </main>
</template>

<style lang="scss">
body, html {
    cursor: none !important;
}

#app {
    position: relative;
    margin: 0 auto;
    min-height: 100%;
    display: flex;
    flex-flow: column;
}

main {
    position: relative;
    flex-grow: 1;
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
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.shade-overlay {
//   pointer-events: none;
  width: 100%;
  height: 100%;
  z-index: 0;
  position: fixed;
  background-color: rgba(0,0,0,0.8);
  transition: background-color .3s linear;
  &.active {
      background-color: rgba(0,0,0,0.9);
  }
}


</style>