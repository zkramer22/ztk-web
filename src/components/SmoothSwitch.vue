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
    state: 'off', // 'off' or 'on'
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
    switchState.posX = switchState.state === 'off' ? 0 : 68
}
function updateSwitch(isClick) {
    switchState.state = switchState.state === 'off' ? 'on' : 'off'
    if (isClick) setDefaultSwitchProps()
}
function captureClick(e) {
    e.stopPropagation()
    window.removeEventListener('click', captureClick, true)
}
function handleMousedown(e) {
    switchState.mouseDownTime = new Date()
    let { clientX } = e
    let { offsetWidth } = e.target
    if (switchState.state === 'off') {
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
    const timeElapsed = new Date() - switchState.mouseDownTime
    window.addEventListener('click', captureClick, true)
    if (timeElapsed > 150) {  // this is now a click and drag, so check if user drags past the midpoint
        const midpoint = (switchState.rightBound + switchState.leftBound) / 2 // midpoint of area listening to mousemove
        if (switchState.state === 'off') {
            if (clientX >= midpoint) updateSwitch()
        }
        else {
            if (clientX <= midpoint) updateSwitch()
        }
    }
    else { 
        updateSwitch()  // treat as a click, no need to check positions or timing
    }
    setDefaultSwitchProps()
    switchState.mouseIsDown = false
    window.removeEventListener('mousemove', handleMousemove)
    window.removeEventListener('mouseup', handleMouseup)
}

</script>

<template>
    <div :class="`smoothswitch prevent-select ${smallClass}`" @click="updateSwitch(true)">
        <div :class="`switch-indicator ${switchState.state}`" 
            @mousedown="handleMousedown" :style="switchDragStyle">
        </div>
        <div class="switch-text">{{ states[0] }}</div>
        <div class="switch-text">{{ states[1] }}</div>
    </div>
</template>

<style lang="scss">
.smoothswitch {
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
    // animation: slideFromBottom 1s ease, fadein 1s ease;
    .switch-indicator {
        position: absolute;
        margin: 3px;
        width: 50%;
        height: calc(100% - 6px);
        border-radius: 30px;
        transition: left .4s ease, background-color .4s linear;
        &.off {
            left: 0;
            background-color: #6A66A3;
        }
        &.on {
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