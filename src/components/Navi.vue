<script setup>
import menu from '@/assets/icon/menu.svg?raw'
import x from '@/assets/icon/x.svg?raw'
import phone from '@/assets/icon/phone.svg?raw'
import email from '@/assets/icon/email.svg?raw'
import calendar from '@/assets/icon/calendar.svg?raw'
import { computed, ref } from 'vue'
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
const navActive = computed(() => navOpen.value ? 'active' : '')
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
            <img id="monologo" @click="selectorClick(null)"
                :class="`grow-animation ${scrolledClass}`" 
                src="@/assets/img/ztk-logo.png"
            />
        <!-- <h1 :class="`site-title-text small ${scrolledClass}`"><span>ztk</span> <span style="font-weight: 500">web</span></h1> -->
        </div>
        <div class="slide-from-top menu-list">
            <div :class="`nav-button icon menu ${scrolledClass}`" @click="expandAccordion">
                <div v-if="navOpen" class="button-icon-svg" v-html="x"></div>
                <div v-else class="button-icon-svg" v-html="menu"></div>
            </div>
            <div :class="`button-text-2 ${navActive}`">contact</div>
            <div ref="accordion" class="accordion">
                <div :class="`nav-button icon option web ${navActive} ${scrolledClass}`">
                    <!-- <div class="button-text web">calendar</div> -->
                    <div class="button-icon-svg" v-html="calendar"></div>
                </div>
                <div :class="`nav-button icon option audio ${navActive} ${scrolledClass}`">
                    <!-- <div class="button-text audio">call</div> -->
                    <div class="button-icon-svg" v-html="phone"></div>
                </div>
                <div :class="`nav-button icon option black ${navActive} ${scrolledClass}`">
                    <!-- <div class="button-text black">email</div> -->
                    <div class="button-icon-svg" v-html="email"></div>
                </div>
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
        padding: 10px;
        display: grid;
        grid-template-rows: 0px 2fr 250px 0fr 4fr;
        grid-gap: 15px;
        grid-template-columns: 75px auto 75px;
        align-items: start;
        transition: grid-template-rows .4s ease;
        &.active {
            grid-template-rows: 0px 2fr 250px 4fr 0fr;
        }
        .site-title-text {
            &.small {
                font-size: 34px;
                margin: 0 0 0 15px;
                top: -100px;
                transition: top .2s ease;
            }
            &.scrolled {
                top: 0px;
            }
        }
    }
    
    .logo-wrapper {
        grid-column: 1 / 1;
        grid-row: 1 / 1;
        display: flex;
        justify-content: start;
        align-items: center;
    }
    #monologo {
        pointer-events: auto;
        width: 70px;
        height: 70px;
        padding: 3px;
        background-color: white;
        border-radius: 5px;
        transition: scale .1s linear, width .2s linear, height .2s linear, padding .2s linear;
        &.scrolled {
            width: 45px;
            height: 45px;
            padding: 2px;
        }
        @media(hover:hover) {
            &:hover {
                scale: 1.1;
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
        &:active {
            filter: brightness(1.3);
        }
        @media (hover:hover) {
            &:hover {
                filter: brightness(1.2);
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
            padding: 10px;
            width: 70px;
            height: 70px;
            &.scrolled {
                width: 45px;
                height: 45px;
                padding: 3px;
            }
        }
        &.black {
            background-color: $primary-gray;
        }
        &.audio {
            background-color: $primary-color-audio;
        }
        &.web {
            background-color: $primary-color-web;
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
            &.audio {
                background-color: $primary-color-audio;
            }
            &.web {
                background-color: $primary-color-web;
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
        right: 0;
        scale: 1;
        z-index: -1;
        transition: top .2s ease .4s, scale .2s ease .4s;
        &.active {
            top: 20px;
            transition-delay: 0s;
            scale: 0.5;
            transition: top .2s ease, scale .2s ease;
        }
    }
    @for $i from 0 through 2 {
        .nav-button.option.active:nth-of-type(#{$i + 1}) {
            transition-delay: #{$i * 0.15}s;
        }
        .nav-button.option:nth-of-type(#{3 - $i}) {
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
</style>
