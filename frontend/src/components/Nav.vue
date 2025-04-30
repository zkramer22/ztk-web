<script setup>
import { computed, onMounted, ref, watch } from 'vue'

import development from '@/assets/icon/development.svg?raw'
import design from '@/assets/icon/design.svg?raw'
import download from '@/assets/icon/download.svg?raw'

import menu from '@/assets/icon/menu.svg?raw'
import x from '@/assets/icon/x.svg?raw'
import phone from '@/assets/icon/phone.svg?raw'
import email from '@/assets/icon/email.svg?raw'
import text from '@/assets/icon/text.svg?raw'
import calendar from '@/assets/icon/calendar.svg?raw'
import ztk from '@/assets/icon/ztk.svg?raw'

/////////////////////////// variables /////////////////////////////
const props = defineProps({
    selectorActiveClass: String,
    path: String,
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

const transitionDelays = computed(() => {
    const delays = []
    const count = 4 // you have 4 accordion buttons
    for (let i = 0; i < count; i++) {
        delays.push({
            forward: `${i * 0.15}s`,
            reverse: `${(count - 1 - i) * 0.15}s`
        })
    }
    return delays
})
const contactLinks = [
    {
        href: "https://calendar.app.google/FUNjeUv5JkLDPYES8",
        target: "_blank",
        color: "purple2",
        icon: calendar
    },
    {
        href: "tel:2677603054",
        target: "_self",
        color: "purple1",
        icon: phone
    },
    {
        href: "mailto:zkramer22@gmail.com",
        target: "_blank",
        color: "gray2",
        icon: email
    },
    {
        href: "sms:+12677603054",
        target: "_self",
        color: "gray1",
        icon: text
    }
]

watch(() => props.path, (newval) => {
    console.log(newval);
})

</script>

<template>
    <nav class="container" :class="selectorActiveClass">
        <div class="flex-centered logo-wrapper">
            <div id="monologo" @click="selectorClick(null)" 
                 class="fade-grow-from-zero" v-html="ztk">
            </div>

            <h5 class="nav-title fade-slide-from-left">
                <span>ztk</span> 
                <span class="font-semibold">
                    web
                </span>
            </h5>
        </div>
        
        <div class="slide-from-top menu-list">
            <div class="nav-button icon menu" @click="expandAccordion">
                <div v-if="navOpen" class="button-icon-svg" v-html="x"></div>
                <div v-else class="button-icon-svg" v-html="menu"></div>
            </div>
            <div :class="`button-text-2 ${contactActive}`">contact</div>
            
            <div ref="accordion" class="accordion">
                <a tabindex="-1"
                    v-for="(link, i) in contactLinks"
                    :key="i"
                    :href="link.href"
                    :target="link.target"
                    :class="`nav-button icon option ${link.color} ${contactActive}`"
                    :style="{
                        transitionDelay: navOpen ? transitionDelays[i].forward : transitionDelays[i].reverse
                    }"
                >
                    <div class="button-icon-svg" v-html="link.icon"></div>
                </a>
            </div>
        </div>

        <slot></slot>
    </nav>
</template>

<style lang="scss">
#home-section {
    grid-row: 3 / 4;
    grid-column: 1 / -1;
    justify-items: center;
}

nav {
    user-select: none;
    position: fixed;
    min-height: 550px;
    overflow-y: scroll;
    z-index: 100;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: var(--container-padding);
    display: grid;
    grid-gap: 15px 0;
    grid-template-rows: 0px 1fr auto 0fr 2fr;
    grid-template-columns: 1fr auto 1fr;


    align-items: start;
    transition: grid-template-rows .4s ease;
    &.active {
        grid-template-rows: 0px 2fr auto 4fr 0fr;
    }
    .nav-title {
        position: relative;
        font-size: 24px;
        margin: 0 0 0 15px;
    }
}

.logo-wrapper {
    grid-column: 1 / -1;
    grid-row: 1;
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
.menu-list {
    grid-column: -2 / -1;
    grid-row: 1;
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
        // background-color: $secondary-gray;
    }
    &.gray1 {
        // background-color: var(--color-dark);
    }
    &.purple1 {
        // background-color: var(--color-1-vibrant);
    }
    &.purple2 {
        // background-color: var(--color-1-light);
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
            // background-color: var(--color-1-vibrant);
        }
        &.purple2 {
            // background-color: var(--color-1-light);
        }
        &.black {
            // background-color: var(--color-dark);
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

// @media screen and (min-width: 768px) {
//     nav {
//         grid-template-rows: 0px 2fr 250px 0fr 4fr;
//     }
// }
</style>
