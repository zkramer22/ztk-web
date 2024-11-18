<script setup>
import { computed } from 'vue'

const props = defineProps({
  option: String,
  num: Number,
  isActive: Boolean,
  pageType: String,
})

/////////////////////////// variables /////////////////////////////
const selectorStyle = computed(() => {
  if (props.isActive) return { activeClass: 'active ', button: '#fff' }
  else return { activeClass: '', button: props.buttonColor }
})
const activeLabelStyle = computed(() => {
  let style = { opacity: '', fontSize: '', left: '', right: '', pointerEvents: 'none' }
  return style
})
const rightOrLeft = computed(() => {
  if (props.num % 2 === 0) return { right: '60px' }
  else return { left: '60px' }
})
const isSelected = computed(() => props.isActive ? 'active' : '')

</script>

<template>
    <div :class="`selector-option ${selectorStyle.activeClass}`">
        <div :class="`button-selector ${selectorStyle.activeClass}`">
            <div :class="`button-selector-icon flex-centered`">0{{ num + 1 }}</div>
            <p class="option-text text-center" :style="activeLabelStyle">{{ option }}</p>
        </div>

        <p :class="`option-selected ${isSelected}`" :style="rightOrLeft">{{ option }}</p>
    </div>
</template>

<style lang="scss">
    @import '@/assets/variables.scss';
    .selector-grid.active {
        .button-selector-icon {
            font-size: 24px;
        }
        p.option-text {
            font-size: 0px;
        }
        p.option-selected {
            font-size: 22px;
        }
    }
    .button-selector-icon {
        transition: $selector-transitions;
        font-size: 64px;
    }
    p.option-text {
        transition: $selector-transitions;
        font-size: 36px;
        transition: font-size .4s ease;
    }
    p.option-selected {
        position: absolute;
        z-index: 0;
        opacity: 0;
        transition: opacity .4s ease, left .4s ease, right .4s ease;
        &.active {
            opacity: 1;
        }
    }
    .selector-option {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 100%;
        height: 100%;
        max-width: 250px;
        max-height: 250px;
        border-radius: 6px;
        z-index: 1;
    }
    .button-selector {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 100%;
        height: 100%;
        border: 2px solid;
        border-radius: 10px;
        overflow: hidden;
        line-height: 1;
        transition: scale .1s linear, background-color .1s linear;
        background-color: #1f1f1f;
        z-index: 1;
        cursor: pointer;
        &:hover {
            scale:1.05;
        }
        &:active {
            scale: 1;
        }
        p {
            margin: 0 auto;
        }
    }
</style>
