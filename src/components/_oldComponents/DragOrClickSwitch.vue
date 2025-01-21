<script setup>
import { reactive, watch, computed } from 'vue'
/////////////////////////// variables /////////////////////////////
const props = defineProps({
    states: {
        type: Array,
        default: () => ['off', 'on'],
    },
    small: {
        type: Boolean,
        default: false,
    }
})

const switchState = reactive({
  mouseIsDown: false,
  mouseDownX: null,
  mouseDownTime: null,
  clientX: null,
  leftBound: null,
  rightBound: null,
  posX: null,
  state: 0,  // 0 or 1, lines up with props.states
})

const scale = props.small ? 0.8 : 1
const transition = 'left 0s linear, background-color .4s linear'
const switchDragStyle = computed(() => switchState.mouseIsDown ? { left: `${switchState.posX}px`, transition } : {})
const smallClass = computed(() => props.small ? 'small' : '')
////////////////////////// methods /////////////////////////////
function setDefaultSwitchProps() {
  switchState.mouseDownX = null
  switchState.mouseDownTime = null
  switchState.clientX = null
  switchState.leftBound = null
  switchState.rightBound = null
  switchState.posX = switchState.state === 0 ? 0 : 68
}
function captureClick(e) {
  e.stopPropagation()
  window.removeEventListener('click', captureClick, true)
}
function handleMousedown(e) {
  switchState.mouseDownTime = new Date()
    let { clientX } = e
    let { offsetWidth } = e.target
  if (state.pageType === 'audio') {
      switchState.leftBound = clientX
      switchState.rightBound = clientX + offsetWidth - 3
    }
    else {
        switchState.rightBound = clientX
        switchState.leftBound = clientX - offsetWidth + 3
    }
    switchState.mouseIsDown = true
    switchState.mouseDownX = clientX
    window.addEventListener('mousemove', handleMousemove)
    window.addEventListener('mouseup', handleMouseup)
}
function handleMousemove(e) {
  let { clientX } = e
  if (!switchState.clientX) {
    switchState.clientX = clientX
  }
  if (clientX > switchState.leftBound && clientX < switchState.rightBound) {
    switchState.posX = switchState.posX + (clientX - switchState.clientX)
    switchState.clientX = clientX
  }
}
function handleMouseup(e) {
  const { clientX } = e
  if (new Date() - switchState.mouseDownTime > 150) {
    window.addEventListener('click', captureClick, true)
    const crosspoint = (switchState.rightBound + switchState.leftBound) / 2 // midpoint of area listening to mousemove
    if (state.pageType === 'audio') {
      if (clientX >= crosspoint) {
          switchPageType()
      }
    }
    else {
      if (clientX <= crosspoint) {
          switchPageType()
      }
    }
  }
  setDefaultSwitchProps()
  switchState.mouseIsDown = false
  window.removeEventListener('mousemove', handleMousemove)
  window.removeEventListener('mouseup', handleMouseup)
}
////////////////////////// watchers /////////////////////////////
watch(() => state.pageType, (newPageType) => {
    if (newPageType) { setDefaultSwitchProps() }
    resetSelector()
})
</script>

<template>
    <div :class="`pageTypeSwitch prevent-select ${smallClass} ${state.scrolledClass}`" @click="switchPageType">
        <div :class="`switch-indicator ${state.pageType}`" 
            @mousedown="handleMousedown" :style="switchDragStyle">
        </div>
        <div class="switch-text">audio</div>
        <div class="switch-text">web</div>
    </div>
</template>

<style lang="scss">
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
      // left: calc(50% - 6px);
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
</style>