<script setup>
import { computed, h } from 'vue'
import home from '@/assets/icon/home3.svg?raw'
import me from '@/assets/icon/me3.svg?raw'
import exp from '@/assets/icon/exp3.svg?raw'
import work from '@/assets/icon/work3.svg?raw'
import info from '@/assets/icon/info3.svg?raw'

const selectorItems = [
    { name: 'me', path: '/me', icon: me }, 
    { name: 'exp', path: '/exp', icon: exp }, 
    { name: 'work', path: '/work', icon: work }, 
    { name: 'info', path: '/info', icon: info },
]

import { selector } from '@/store'
const selectorActive = computed(() => !!selector.activeRoute)

</script>

<template>
    <div class="selector-wrapper hidenav-trans" :class="[{ selectorActive }]" id="selector">
        <div class="selector-grid">
            <RouterLink v-for="({ name, path, icon }) of selectorItems" :to="path" :key="name"
                class="selector-link selector-option" tabindex="10"
            >
                <div class="button-selector hover-grow grid gap-[5px] content-center">
                    <div class="selector-icon" v-html="icon" />
                    <div class="selector-text text-center">{{ name }}</div>
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<style lang="scss">
    #selector {
        pointer-events: all;
    }

    .selector-icon {
        width: 40%;
        margin: 0 auto;
    }

    .selector-wrapper {
        user-select: none;
        position: relative;
        height: min-content;
        grid-row: -2 / -1;
        grid-column: 1 / -1;
        // animation: fadein 1s ease, slideFromRight 1s ease;

        &.selectorActive {
            .selector-grid {
                width: 15rem;
                grid-gap: 5px;
            } 
            .back-buttons {
                pointer-events: all;
                transform: translateX(0);
            }
            .selector-text {
                font-size: 1rem;
            }
        }
    }

    .selector-grid {
        display: flex;
        grid-gap: 10px;
        margin: auto;
        width: 100%;
        max-width: 600px;
        transition: var(--selector-transitions);
    }

    .back-buttons {
        position: absolute;
        aspect-ratio: 1;
        pointer-events: none;
        transform: translateX(-50vw);
        transition: transform var(--selector-trans-time) ease;
    }

    .selector-link {
        display: block;
        width: 25%;

        &.router-link-active {
            .button-selector {
                background: transparent;
                background: white;
                color: var(--color-1-vibrant);
                // border-color: var(--color-1-vibrant);
            }
        }
    }

    .selector-option {
        pointer-events: all;
        position: relative;
        width: 25%;
        height: 100%;
        aspect-ratio: 1;
        z-index: 1;
    }
    .button-selector {
        position: relative;
        z-index: 1;
        overflow: hidden;
        width: 100%;
        height: 100%;
        background: var(--color-black);
        // background-image: var(--grad-complex-dark);
        color: white;
        // border: 2px solid var(--color-darker);
        // border: 2px solid var(--color-dark);
        border: 2px solid #eeeeee;
        border-radius: var(--button-radius);
        line-height: 1;
        transition: scale .1s linear, background .4s linear;
        p {
            margin: 0 auto;
        }
    }

    .selector-text {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        transition: scale var(--selector-trans-time) ease;
    }

    
</style>
