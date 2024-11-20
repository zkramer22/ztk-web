<script setup>
import menu from '@/assets/icon/menu.svg?raw'
import x from '@/assets/icon/x.svg?raw'
import phone from '@/assets/icon/phone.svg?raw'
import email from '@/assets/icon/email.svg?raw'
import calendar from '@/assets/icon/calendar.svg?raw'
import { computed, ref } from 'vue'
/////////////////////////// variables /////////////////////////////
const props = defineProps({
  pageType: String,
  scrolledClass: String,
})

const navOpen = ref(false)
const accordion = ref(null)
const accordionWrapper = ref(null)

const top = document.getElementById('top')
const navActive = computed(() => navOpen.value ? 'active' : '')
/////////////////////////// variables /////////////////////////////
function expandAccordion() {
    navOpen.value = !navOpen.value
}
</script>

<template>
  <nav class="">
    <div class="flex-centered relative">
      <img id="monologo" :class="`grow-animation ${scrolledClass}`" src="@/assets/img/ztk-logo.png"/>
      <!-- <h1 :class="`site-title-text small ${scrolledClass}`"><span>ztk</span> <span style="font-weight: 500">web</span></h1> -->
    </div>
    <div class="slide-from-top menu-list">
        <div class="nav-button transparent icon menu" @click="expandAccordion">
            <div v-if="navOpen" class="button-icon-svg" v-html="x"></div>
            <div v-else class="button-icon-svg" v-html="menu"></div>
        </div>
        <div :class="`button-text-2 ${navActive}`">contact</div>
        <div ref="accordion" class="accordion">
            <div :class="`nav-button icon option web ${navActive}`">
                <div class="button-text web">calendar</div>
                <div class="button-icon-svg" v-html="calendar"></div>
            </div>
            <div :class="`nav-button icon option audio ${navActive}`">
                <div class="button-text audio">call</div>
                <div class="button-icon-svg" v-html="phone"></div>
            </div>
            <div :class="`nav-button icon option black ${navActive}`">
                <div class="button-text black">email</div>
                <div class="button-icon-svg" v-html="email"></div>
            </div>
        </div>
    </div>
  </nav>
</template>

<style lang="scss">
@import '@/assets/variables.scss';
    .menu-list {
        display: flex;
        flex-flow: column;
        position: relative;
        gap: 7px;
    }
    .accordion {
        display: flex;
        flex-flow: column;
        gap: 7px;
    }
    nav {
        pointer-events: none;
        display: flex;
        justify-content: space-between;
        align-items: start;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding: 7px;
        z-index: 2;
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
        .pageTypeSwitch {
            &.small {
                scale: .8;
                top: -100px;
                transition: top .2s ease;
            }
            &.scrolled {
                top: 0px;
            }
        }
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
        background-color: $primary-gray;
        // &.transparent {
        //     background-color: transparent;
        // }
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
            padding: 3px;
            width: 45px;
            height: 45px;
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

    @media (hover:hover) {
        .nav-button.option:hover {

        }
    }
</style>
