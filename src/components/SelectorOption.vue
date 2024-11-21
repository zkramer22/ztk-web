<script setup>
import { computed } from 'vue'

const props = defineProps({
    option: String,
    num: Number,
    isActive: Boolean,
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
const isSelected = computed(() => props.isActive ? 'active' : '')

</script>

<template>
    <div :class="`selector-option ${selectorStyle.activeClass}`">
        <div :class="`button-selector ${selectorStyle.activeClass}`">
            <div :class="`button-selector-icon flex-centered`">0{{ num + 1 }}</div>
            <p class="option-text text-center" :style="activeLabelStyle">{{ option }}</p>
        </div>
        <p :class="`option-selected ${isSelected}`">{{ option }}</p>
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

    .selector-option {
        pointer-events: all;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 100%;
        height: auto;
        aspect-ratio: 1 / 1;
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
        transition: scale .1s linear, background-color .4s linear;
        background-color: #1f1f1f;
        z-index: 1;
        ;
        &:hover {
            scale:1.05;
        }
        &:active {
            scale: 1;
        }
        &.active {
            background-color: white;
            color: #1f1f1f;
        }
        p {
            margin: 0 auto;
        }
    }
    
    .button-selector-icon {
        font-size: 2.4rem;
        transition: $selector-transitions;
    }
    p.option-text {
        font-size: 1.7rem;
        transition: $selector-transitions;
    }
    p.option-selected {
        position: absolute;
        z-index: 0;
        opacity: 0;
        margin: auto;
        bottom: 0;
        transition: $selector-transitions;
        &.active {
            opacity: 1;
            bottom: 90%;
        }
    }

    @media screen and (min-width: 600px) and (min-height: 600px) {
        .button-selector-icon {
            font-size: 3.2rem;
        }
        p.option-text {
            font-size: 2rem;
        }
    }

    @media screen and (min-width: 1024px) and (min-height: 600px) {
        .button-selector-icon {
            font-size: 4rem;
        }
        p.option-text {
            font-size: 2.5rem;
        }
    }
</style>
