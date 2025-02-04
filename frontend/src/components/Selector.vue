<script setup>
import SelectorOption from './SelectorOption.vue'
import backArrow from '@/assets/icon/backarrow.svg?raw'
import home from '@/assets/icon/home.svg?raw'

const props = defineProps({
  selectorActive: String,
  selectorActiveClass: String,
})

const emit = defineEmits(['selectorClick', 'backButtonClick'])

/////////////////////////// variables /////////////////////////////
const selector = ['me', 'exp', 'work', 'msg']

////////////////////////// methods /////////////////////////////
function selectorClick(option) {
    emit('selectorClick', option)
}
function backButtonClick() {
    emit('backButtonClick')
}
</script>

<template>
    <!-- <div :class="`selector-wrapper ${selectorActiveClass}`"> -->
    <div class="selector-wrapper">
        <div :class="`selector-back-button home ${selectorActiveClass}`"            
            @click="selectorClick(null)" v-html="home"
        ></div>
        <div :class="`selector-back-button ${selectorActiveClass}`"
            @click="backButtonClick" v-html="backArrow"
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
        position: relative;
        height: min-content;
        grid-row: -2 / -1;
        // grid-row: 2 / 3;
        grid-column: 1 / -1;
        transition: $selector-transitions;
        animation: fadein 1s linear, translateFromRight 1s ease;
    }

    .selector-grid {
        display: flex;
        grid-gap: 10px;
        margin: auto;
        width: 100%;
        max-width: 400px;
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
        left: -50vw;
        bottom: 0;
        border: 2px solid;
        border-radius: 10px;
        opacity: 0;
        transition: $selector-transitions, scale .1s linear;
        scale: 1;
        align-items: center;
        justify-items: center;
        align-content: center center;
        background-color: $primary-black;
        &.active {
            &.home {
                // left: 55px;
                bottom: 55px;
                svg {
                    width: 80%;
                    height: 100%;
                    aspect-ratio: 1;
                    margin: 0 auto;
                }
                @media screen and (min-width: 500px) {
                    bottom: 0;
                    left: 55px;
                }
            }
            left: 0;
            opacity: 1;
            pointer-events: all;
        }
        @media (hover:hover) {
            &:hover {
                scale: 1.1;
            }
        }
    }

    @media screen and (max-height: 415px) and (aspect-ratio >= 16 / 9) { // phone landscape

    }

    ////////////////////////////////
    
    @media screen and (min-width: 600px) and (min-height: 600px) {
        .selector-grid {
            max-width: 600px;
        }
    }

    @media screen and (min-width: 1024px) and (min-height: 600px) {
        .selector-grid {
            max-width: 700px;
        }
    }

    

    
</style>
