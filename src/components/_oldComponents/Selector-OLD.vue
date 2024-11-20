<script setup>
import { ref } from 'vue'
import SelectorOption from './SelectorOption.vue'
import voiceover from '@/assets/icon/voiceover.svg?raw'
import music from '@/assets/icon/music.svg?raw'
import engineering from '@/assets/icon/engineering.svg?raw'
import education from '@/assets/icon/education.svg?raw'
import design from '@/assets/icon/design.svg?raw'
import development from '@/assets/icon/development.svg?raw'
import charting from '@/assets/icon/charting.svg?raw'
import consulting from '@/assets/icon/consulting.svg?raw'
import backArrow from '@/assets/icon/backarrow.svg?raw'

const props = defineProps({
  selectorActive: String,
  pageType: String,
  selectorActiveClass: String,
})

const selectorBackButton = ref(null)
const emit = defineEmits(['selectorClick'])

/////////////////////////// variables /////////////////////////////
const selector = {
  audio: ['voiceover', 'music', 'engineering', 'education'],
  web: ['design', 'development', 'charting', 'consulting'],
}
const svgs = {
  voiceover,
  music,
  engineering,
  education,
  design,
  development,
  charting,
  consulting,
}
const buttonColors = {
  audio: ['#6A66A3', '#9895C1'],
  web: ['#8FBC94', '#B8CEBA'],
}
const buttonColorMap = [0,1,1,0]

////////////////////////// methods /////////////////////////////
function selectorClick(option) {
  emit('selectorClick', option)
  if (option) setTimeout(() => selectorBackButton.value.classList.add('active'), 500)
  else selectorBackButton.value.classList.remove('active')
}
</script>

<template>
  <div class="flex-centered column">
    <div :class="`selector-grid ${selectorActiveClass}`">
      <div ref="selectorBackButton" v-if="props.selectorActive" class="selector-back-button" @click="selectorClick(null)">
        <div v-html="backArrow"></div>
      </div>
      <SelectorOption v-for="(option, i) in selector[props['pageType']]" @click="selectorClick(option)"
          :key="`opt-${i}`"
          :option="option"
          :num="i" 
          :svg="svgs[option]"
          :pageType="props.pageType"
          :buttonColor="buttonColors[props['pageType']][buttonColorMap[i]]"
          :isActive="props.selectorActive === option" 
      />
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/variables.scss';
  .selector-grid {
    position: relative;
    display: grid;
    z-index: 4;
    margin: 0 auto;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    width: 500px;
    height: 500px;
    grid-gap: 20px;
    transition: width .4s ease, height .4s ease, grid-gap .4s ease;
    transition: $selector-transitions;
    svg {
      position: relative;
      transition: bottom .4s ease;
      bottom: 20px;
    }
    p.option-text {
      position: absolute;
      top: 60%;
      transition: $selector-transitions;
      // transition: font-size .4s ease, left .4s ease, right .4s ease;
    }
    p.option-selected {
      position: absolute;
      opacity: 0;
      transition: opacity .4s ease, left .4s ease, right .4s ease;
    }
    &.active {
      width: 100px;
      height: 100px;
      grid-gap: 5px;
      svg {
        bottom: 0px;
      }
      p.option-text {
        opacity: 0;
      }
      p.option-selected {
        opacity: 1;
        font-size: 22px;
      }
      // svg path {
      //   stroke: normal;
      // }
    }
  }
  .selector-back-button {
    position: absolute;
    z-index: 5;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 8px;
    opacity: 0;
    transition: opacity .2s linear;
    background-color: rgba(49, 53, 50, .9);
    &.active {
      &:hover {
        opacity: .9;
        ;
      }
    }
  }
</style>
