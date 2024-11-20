<script setup>
import { ref } from 'vue'
import SelectorOption from './SelectorOption.vue'
import backArrow from '@/assets/icon/backarrow.svg?raw'

const props = defineProps({
  selectorActive: String,
  selectorActiveClass: String,
})

const selectorBackButton = ref(null)

const emit = defineEmits(['selectorClick'])

/////////////////////////// variables /////////////////////////////
const selector = ['me', 'exp', 'work', 'msg']

////////////////////////// methods /////////////////////////////
function selectorClick(option) {
    emit('selectorClick', option)
}
</script>

<template>
    <div :class="`selector-wrapper ${selectorActiveClass}`">
        <div ref="selectorBackButton"
            @click="selectorClick(null)" v-html="backArrow"
            :class="`selector-back-button ${selectorActiveClass}`"
        ></div>
        <div ref="selectorGrid" :class="`selector-grid ${selectorActiveClass}`">
            <SelectorOption v-for="(option, i) in selector" 
                @click="selectorClick(option)"
                :key="`opt-${i}`"
                :option="option"
                :num="i"
                :isActive="selectorActive === option" 
            />
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/variables.scss';
    .selector-wrapper {
        position: fixed;
        bottom: 25vh;
        width: calc(100% - 20px);
        left: 10px;
        right: 10px;
        transition: $selector-transitions;
        animation: fadein 1s linear, translateFromRight 1s ease;
        &.active {
            // top: 0;
            bottom: 10px;
        }
        @media screen and (height < 600px) {

            border: 1px solid green;
        }
    }


    .selector-grid {
        z-index: 10;
        bottom: 30vh;
        // right: 10px;
        display: flex;
        align-content: center;
        grid-gap: 10px;
        margin: auto;
        width: 100%;
        max-width: 600px;
        transition: $selector-transitions;
        &.active {
            width: 220px;
            grid-gap: 5px;
        } 
    }
    .selector-back-button {
        position: absolute;
        pointer-events: none;
        z-index: 5;
        aspect-ratio: 1 / 1;
        height: 100%;
        left: 0;
        bottom: -100vh;
        border: 2px solid;
        border-radius: 10px;
        opacity: 0;
        transition: $selector-transitions;
        background-color: #1f1f1f;
        &.active {
            // left: 0;
            bottom: 0;
            opacity: 1;
            pointer-events: all;
        }
    }

    @media screen and (min-width: 1024px) {
        .selector-grid {
            max-width: 700px;
        }
    }

    
</style>
