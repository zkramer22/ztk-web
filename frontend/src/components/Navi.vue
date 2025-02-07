<script setup>
import { computed, ref } from 'vue'

import menu from '@/assets/icon/menu.svg?raw'
import x from '@/assets/icon/x.svg?raw'
import phone from '@/assets/icon/phone.svg?raw'
import email from '@/assets/icon/email.svg?raw'
import text from '@/assets/icon/text.svg?raw'
import calendar from '@/assets/icon/calendar.svg?raw'
import ztk from '@/assets/icon/ztk.svg?raw'

/////////////////////////// variables /////////////////////////////
const props = defineProps({
  scrolledClass: String,
  selectorActiveClass: String,
})

const navOpen = ref(false)
const accordion = ref(null)
const accordionWrapper = ref(null)

const emit = defineEmits(['selectorClick'])

const top = document.getElementById('top')
const contactActive = computed(() => navOpen.value ? 'active' : '')
/////////////////////////// methods /////////////////////////////
function expandAccordion() {
    navOpen.value = !navOpen.value
}

function selectorClick(option) {
    emit('selectorClick', option)
}
</script>

<template>
    <nav :class="selectorActiveClass">
        <div class="flex-centered relative logo-wrapper">
            <div id="monologo" @click="selectorClick(null)" 
                 :class="`grow-animation ${scrolledClass}`" v-html="ztk">
            </div>

            <h5 :class="`nav-title ${scrolledClass}`">
                <span>ztk</span> 
                <span style="font-weight: 500">
                    web
                </span>
            </h5>
        </div>
        
        <div class="slide-from-top menu-list">
            <div :class="`nav-button icon menu ${scrolledClass}`" @click="expandAccordion">
                <div v-if="navOpen" class="button-icon-svg" v-html="x"></div>
                <div v-else class="button-icon-svg" v-html="menu"></div>
            </div>
            <div :class="`button-text-2 ${contactActive}`">contact</div>
            
            <div ref="accordion" class="accordion">
                <a tabindex="-1" :class="`nav-button icon option purple2 ${contactActive} ${scrolledClass}`" href="https://calendar.app.google/FUNjeUv5JkLDPYES8" target="_blank">
                    <!-- <div class="button-text purple2">meeting</div> -->
                    <div class="button-icon-svg" v-html="calendar"></div>
                </a>
                <a tabindex="-1" :class="`nav-button icon option purple1 ${contactActive} ${scrolledClass}`" href="tel:2677603054">
                    <!-- <div class="button-text purple1">call</div> -->
                    <div class="button-icon-svg" v-html="phone"></div>
                </a>
                <a tabindex="-1" :class="`nav-button icon option gray2 ${contactActive} ${scrolledClass}`" href="mailto:zkramer22@gmail.com" target="_blank">
                    <!-- <div class="button-text black">email</div> -->
                    <div class="button-icon-svg" v-html="email"></div>
                </a>
                <a tabindex="-1" :class="`nav-button icon option gray1 ${contactActive} ${scrolledClass}`" href="sms:+12677603054">
                    <!-- <div class="button-text black">text</div> -->
                    <div class="button-icon-svg" v-html="text"></div>
                </a>
                
            </div>
        </div>

        <slot></slot>
    </nav>
</template>

<style lang="scss">
@import '@/assets/variables.scss';
    nav {
        pointer-events: none;
        position: fixed;
        z-index: 2;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 16px;
        display: grid;
        grid-template-rows: 0px 2fr 250px 0fr 2fr;
        grid-gap: 15px;
        grid-template-columns: 75px auto 75px;
        align-items: start;
        transition: grid-template-rows .4s ease;
        &.active {
            grid-template-rows: 0px 2fr 250px 4fr 0fr;
        }
        .nav-title {
            position: relative;
            font-size: 24px;
            margin: 0 0 0 15px;
            transition: top .2s ease;
            animation: fadein 1s linear, slideFromTop 1s ease;
        }
    }
    
    .logo-wrapper {
        grid-column: 1 / 3;
        grid-row: 1 / 1;
        display: flex;
        justify-content: start;
        align-items: center;
    }
    #monologo {
        pointer-events: auto;
        width: 45px;
        height: 45px;
        transition: scale .1s ease, width .2s linear, height .2s linear, padding .2s linear;
        @media(hover:hover) {
            &:hover {
                scale: 1.1;
            }
        }
        &:active {
            scale: 1;
        }
    }
    #resume {
        .chip {
            display: inline-flex;
            align-items: center;
            background-color: $primary-gray;
            white-space: nowrap;
            padding: 5px 10px;
            border: 1px solid;
            border-radius: 40px;
            .text {
                margin-left: 6px;
                font-size: 1.2rem;
            }
            .icon {
                display: inline-block;
                width: 30px;
                height: 30px;
                svg {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .menu-list {
        grid-column: 3 / 4;
        grid-row: 1 / 1;
        display: flex;
        flex-flow: column;
        align-items: end;
        position: relative;
        gap: 7px;
    }
    .accordion {
        display: flex;
        flex-flow: column;
        gap: 7px;
    }
    .nav-button {
        position: relative;
        pointer-events: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        padding: 7px 10px;
        height: 45px;
        background-color: #eeeeee;
        transition: scale .1s ease;
        &:active {
            filter: brightness(1.3);
        }
        @media (hover:hover) {
            &:hover {
                filter: brightness(1.2);
                scale: 1.1;
            }
            &:active {
                scale: 1;
            }
        }
        &.menu {
            z-index: 1;
        }
        &.option {
            pointer-events: none;
            scale: 0;
            transition: scale .4s ease, transform .1s ease;
        }
        &.icon {
            padding: 5px;
            width: 45px;
            height: 45px;
        }
        &.gray2 {
            background-color: $secondary-gray;
        }
        &.gray1 {
            background-color: $primary-gray;
        }
        &.purple1 {
            background-color: $primary-color-audio;
        }
        &.purple2 {
            background-color: $secondary-color-audio;
        }
        &.active {
            &.option {
                scale: 1;
                pointer-events: all;
            }
        }
        .button-text {
            text-align: right;
            position: absolute;
            right: calc(100% + 10px);
            padding: 2px 7px;
            border-radius: 20px;
            &.purple1 {
                background-color: $primary-color-audio;
            }
            &.purple2 {
                background-color: $secondary-color-audio;
            }
            &.black {
                background-color: $primary-gray;
            }
        }
    }
    .button-text-2 {
        position: absolute;
        top: 45px;
        text-align: center;
        width: auto;
        scale: 1;
        z-index: -1;
        transition: top .2s ease .55s, scale .2s ease .6s;
        &.active {
            top: 20px;
            transition-delay: 0s;
            scale: 0.5;
            transition: top .2s ease, scale .2s ease;
        }
    }
    @for $i from 0 through 3 {
        .nav-button.option.active:nth-of-type(#{$i + 1}) {
            transition-delay: #{$i * 0.15}s;
        }
        .nav-button.option:nth-of-type(#{4 - $i}) {
            transition-delay: #{$i * 0.15}s;
        }
    }
    #contact-buttons {
        position: relative;
    }
    .button-icon-svg {
        display: flex;
        justify-content: center;
        align-items: center;
        height: auto;
        max-width: 70%;
        margin: 0 auto;
    }

    @media screen and (min-width: 768px) {
        nav {
            grid-template-rows: 0px 2fr 250px 0fr 4fr;
        }
    }
</style>
