<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'
import 'waypoints/lib/noframework.waypoints.min.js'
import Navi from './components/Navi.vue'
import Home from './components/Home.vue'
import Selector from './components/Selector.vue'
import AudioPlayer from './components/AudioPlayer.vue'
import { state, BG_IMG } from './store.js'

/////////////////////////// variables /////////////////////////////
const router = useRouter()
const route = useRoute()
const selectView = ref(null)

////////////////////////// methods /////////////////////////////
function setWaypoints() {
  // var waypoint1 = new Waypoint({
  //   element: selectView.value,
  //   handler: (direction) => pinItemsToNav(direction, 1),
  //   offset: 100,
  // })

  var timeId = null
  window.addEventListener('resize', () => {
    clearTimeout(timeId)
    timeId = setTimeout(() => {
      Waypoint.destroyAll()
      setWaypoints()
    }, 1000)
  })
}
function pinItemsToNav(direction, num) {
  state[`scrolled${num}`] = direction === 'down' ? true : false
}
function checkEntryRoute() {
  state.pageType = route.path.split('/')[1]
}
function selectorClick(option) {
  if (option) {
    state.selectorActive = option
    router.push(`/${state.pageType}/${option}`)
  }
  else {
    state.selectorActive = null
    router.push(`/${state.pageType}`)
  }
}

///////////////////////// lifecycle //////////////////////////////
onMounted(() => {
  setWaypoints()
  // setTimeout(() => checkEntryRoute(), 0)
})

///////////////////////// watchers //////////////////////////////
// watch(() => state.pageType, (pageType) => {
//   router.push(`/${pageType}`)
//   state.selectorActive = null
// })
</script>

<template>
  <div id="top"></div>
  <div :class="`shade-overlay ${state.scrolledClass}`"></div>
  <Transition name="fade">
    <img
      :src="BG_IMG['web']" alt="closeup view of coding text editor"
      class="bgImg"/>
  </Transition>
  
  <Navi 
    :pageType="state.pageType" 
    :scrolledClass="state.scrolledClass"
  />

  <div class="fullscreen-wrapper grid">
    <div class="container">
      <Home :pageType="state.pageType" />
      <Selector @selector-click="selectorClick"
                :selectorActive="state.selectorActive"
                :selectorActiveClass="state.selectorActiveClass" />
    </div>
  </div>

  <div ref="selectView" class="fullscreen-wrapper">
    <h2 :class="`selector text-center ${state.selectorActiveClass}`">{{ state.pageType }}</h2>
    <Selector @selector-click="selectorClick"
              :selectorActive="state.selectorActive"
              :pageType="state.pageType"
              :selectorActiveClass="state.selectorActiveClass"
    />

    <Transition name="fade">
      <div v-if="state.selectorActive" class="mx-12 router-view-section">
        <RouterView></RouterView>
      </div>
    </Transition>
  </div>

  <AudioPlayer />
</template>

<style lang="scss">
@import '@/assets/variables.scss';

.fade-enter-active, 
.fade-leave-active {
  transition: opacity .5s linear;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.shade-overlay {
  pointer-events: none;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 0;
  background-color: rgba(0,0,0,0.7);
  transition: background-color .3s linear;
  &.scrolled {
    background-color: rgba(0,0,0,0.85);
  }
}
.fullscreen-wrapper {
  min-height: 100%;
  position: relative;
  z-index: 1;
  padding: 15px 15px 0;
  &.grid {
    align-content: center;
    display: grid;
  }
}
.container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}
.studioZTK {
  position: relative;
  text-align: right;
  animation: fadein 1s linear, slideFromLeft 1s ease;
}

h2.selector {
  margin-bottom: 32px;
  font-size: 4rem;
  transition: font-size .3s ease, margin .3s ease;
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
  border: 1px solid #1f1f1f;
  border-radius: 30px;
  background-color: #313532;
  animation: slideFromBottom 1s ease, fadein 1s ease;
  cursor: pointer;
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
    &:hover {
      filter: brightness(1.2);
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

#pageTypeText {
  position: relative;
  margin: 20px calc(50% - 301px);
  animation: slideFromBottom 1s ease;
  transition: margin .3s ease;
  p {
    font-size: 22px;
  }
  .pageTypeText {
    &.active {
      animation: fadein 1s linear;
    }
  }
}


.bgImg {
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

@media (min-width: 1024px) {
  #home-grid {
    display: grid;
    grid-template-columns: 10fr 2fr 10fr;
    align-items: center;
    min-height: 25vh;
    margin-bottom: 45px;
  }
  #home-divider {
    min-height: 200px;
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
    position: relative;
    animation: fadein 1s linear, slideFromRight 1s ease;
  }
}

</style>