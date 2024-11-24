<script setup>
import { computed } from 'vue'

const props = defineProps({
    option: String,
    num: Number,
    isActive: Boolean,
})

/////////////////////////// variables /////////////////////////////
const activeClass = computed(() => props.isActive ? 'active' : '')

</script>

<template>
    <div :class="`selector-option ${activeClass}`">
        <div :class="`button-selector ${activeClass}`">
            <div :class="`button-selector-icon text-center`">0{{ num + 1 }}</div>
            <p class="option-text text-center">{{ option }}</p>
        </div>
        <p :class="`option-selected text-center ${activeClass}`">{{ option }}</p>
    </div>
</template>

<style lang="scss">
    @import '@/assets/variables.scss';
    .selector-grid.active {
        .button-selector-icon {
            bottom: 0;
            font-size: 24px;
        }
        p.option-text {
            scale: 0;
        }
        p.option-selected {
            scale: 1;
        }
    }

    .selector-option {
        pointer-events: all;
        position: relative;
        width: 25%;
        height: 100%;
        aspect-ratio: 1;
        border-radius: 6px;
        z-index: 1;
    }
    .button-selector {
        position: relative;
        width: 100%;
        height: 100%;
        border: 2px solid;
        border-radius: 10px;
        overflow: hidden;
        line-height: 1;
        transition: scale .1s linear, background-color .4s linear;
        background-color: $primary-black;
        z-index: 1;
        @media (hover:hover) {
            &:hover {
                scale:1.05;
            }
        }
        &:active {
            scale: 1;
        }
        &.active {
            background-color: white;
            color: $primary-black;
        }
        p {
            margin: 0 auto;
        }
    }
    
    .button-selector-icon {
        position: absolute;
        align-content: center;
        top: 0;
        left: 0;
        right: 0;
        bottom: 25%;
        width: 100%;
        font-size: 2.4rem;
        transition: $selector-transitions;
    }
    p.option-text {
        position: absolute;
        align-content: center;
        top: 42%;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        scale: 1;
        font-size: 1.5rem;
        transition: $selector-transitions;
    }
    p.option-selected {
        position: absolute;
        left: -10px;
        right: -10px;
        bottom: 0;
        z-index: 0;
        opacity: 0;
        margin: auto;
        font-size: 15px;
        font-weight: 500;
        width: min-content;
        padding: 0 7px 2px;
        color: $primary-black;
        background-color: white;
        border: 2px solid $primary-black;
        border-radius: 15px;
        transition: $selector-transitions;
        &.active {
            opacity: 1;
            bottom: calc(100% + 2px);
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
