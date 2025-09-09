<script setup>
import { computed } from 'vue'

import ztk from '@/assets/icon/ztk.svg?raw'

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import { selector } from '@/store'

import { useIsScrolled } from '@/composables/isScrolled'
const { scrollDown } = useIsScrolled()

const selectorActive = computed(() => !!selector.activeRoute)

const props = defineProps({
    hideNav: { type: Boolean, default: false }
})
</script>

<template>
    <nav :class="{ selectorActive, hideNav: props.hideNav }">
        <!-- <div id="nav-curtain"></div> -->

        <div id="logo-wrapper" class="flex items-center fadein hidenav-trans">
            <div id="monologo" @click="() => router.push('/')" v-html="ztk" />
            <!-- <div :key="routeMetaName" id="routeMetaName" class="fade-slide-from-left font-accent font-bold">{{ routeMetaName }}</div> -->
        </div>

        <slot></slot>
    </nav>
</template>

<style lang="scss">
nav {
    user-select: none;
    position: fixed;
    inset: 0;
    z-index: 100;
    overflow-y: scroll;
    display: grid;
    grid-gap: 15px 0;
    grid-template-rows: 0px 1fr auto 0fr 2fr;
    grid-template-columns: 1fr auto 1fr;
    
    align-items: start;
    transition: grid-template-rows var(--selector-trans-time) ease;

    padding: var(--container-padding);

    // #nav-curtain {
    //     position: fixed;
    //     top: 0;
    //     left: 0;
    //     right: 0;
    //     height: 0;
    //     width: 100vw;
    //     transition: height .2s ease;
    //     background-color: var(--color-black);
    // }

    #settings-toggle {
        width: 3rem;
        grid-column: -1;
        transition: scale .1s ease;
        @media(hover:hover) {
            &:hover {
                scale: 1.1;
            }
        }
        &:active {
            scale: 1;
        }
    }
    
    .hidenav-trans {
        transition: transform .2s ease;
    }

    &.selectorActive {
        grid-template-rows: 0px 2fr auto 4fr 0fr;
        pointer-events: none;
    }
    &.isScrolled {
        // --logo-size: 2rem;
        // #nav-curtain {
        //     height: var(--nav-height);
        // }
    }
    &.hideNav {
        .selector-wrapper {
            transform: translateY(20vh);
        }
        #logo-wrapper {
            transform: translateX(-20vw);
        }
        #settings-toggle {
            transform: translateX(20vw);
        }
    }
}

#logo-wrapper {
    grid-column: 1 / -1;
    grid-row: 1;
    display: flex;
    justify-content: start;
    align-items: center;
}
#monologo {
    z-index: 100;
    pointer-events: all;
    width: var(--logo-size);
    height: var(--logo-size);
    aspect-ratio: 1;
    transition: 
        scale .1s ease;
    ;
    @media(hover:hover) {
        &:hover {
            scale: 1.1;
        }
    }
    &:active {
        scale: 1;
    }

    &.mini {
        width: 2rem;
        height: 2rem;
    }
}
// #routeMetaName {
//     z-index: 99;
//     transition: font-size .2s ease, margin-left .2s ease;
//     font-size: calc(var(--logo-size) / 2);
//     margin-left: calc(var(--logo-size) / 4);
// }
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
</style>
