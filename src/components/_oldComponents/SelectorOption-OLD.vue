<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  option: String,
  num: Number,
  svg: String,
  buttonColor: String,
  isActive: Boolean,
  pageType: String,
})

/////////////////////////// variables /////////////////////////////
const imgURL = computed(() => new URL(`../assets/icon/${props.option}.svg`, import.meta.url).href)
const selectorStyle = computed(() => {
  if (props.isActive) return { activeClass: 'active ' + props.pageType, button: '#fff' }
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

</script>

<template>
    <div :class="`selector-option ${selectorStyle.activeClass}`">
      <Transition name="fade">
        <p v-if="props.isActive" class="option-selected" :style="rightOrLeft">{{ props.option }}</p>
      </Transition>
      <div class="button-selector" :style="{ backgroundColor: selectorStyle.button }">
        <div :class="`button-selector-icon ${selectorStyle.activeClass}`" v-html="svg"></div>
        <p class="option-text text-center" :style="activeLabelStyle">{{ props.option }}</p>
      </div>
    </div>
</template>

<style lang="scss">
  .selector-option {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 250px;
    max-height: 250px;
    border: 1px solid;
    border-radius: 6px;
    background-color: #1f1f1fcc;
  }
  .button-selector {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
    transition: scale .1s linear, background-color .1s linear;
    cursor: pointer;
    &:hover {
      scale:1.05;
    }
    &:active {
      scale: 1;
    }
    .button-selector-icon {
      display: flex;
      width: 40%;
      max-width: 130px;
      height: auto;
      margin: 0 auto;
      svg {
        path {
          stroke: #fff;
        }
      }
      &.active {
        &.audio {
          path {
            stroke: #6A66A3;
          }
        }
        &.web {
          path {
            stroke: #8FBC94;
          }
        }
      }
    }
    p {
      margin: 0 auto;
      font-size: 30px;
    }
  }
</style>
