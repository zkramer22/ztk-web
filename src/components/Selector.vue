<script setup>
import { onMounted, ref } from 'vue'
import SelectorOption from './SelectorOption.vue'
import backArrow from '@/assets/icon/backarrow.svg?raw'

const props = defineProps({
  selectorActive: String,
  selectorActiveClass: String,
})

const selectorBackButton = ref(null)
const selectorGrid = ref(null)
const selectorTop = ref(null)

const emit = defineEmits(['selectorClick'])

/////////////////////////// variables /////////////////////////////
const selector = ['me', 'exp', 'work', 'msg']

////////////////////////// methods /////////////////////////////
function selectorClick(option) {
// change selector margin from 'auto' to pixel value for smooth transition.
    let selectorTransition
    if (option) {
        selectorTop.value = selectorGrid.value.getBoundingClientRect().top - 10
        selectorTransition = getComputedStyle(selectorGrid.value).transition
        selectorGrid.value.style.transition = ''
        requestAnimationFrame(() => {
            selectorGrid.value.style.margin = `${selectorTop.value}px auto auto`
            selectorGrid.value.style.transition = selectorTransition
            requestAnimationFrame(() => {
                selectorGrid.value.style.margin = '75px auto auto'
            })
        })
        setTimeout(() => selectorBackButton.value.classList.add('active'), 500)
    }
    else {
        selectorGrid.value.style.margin = `${selectorTop.value}px auto auto`
        selectorGrid.value.addEventListener('transitionend', function t(e) {
            console.log(e.propertyName);
            if (e.propertyName !== 'margin-top') return
            selectorGrid.value.removeEventListener('transitionend', t)
            selectorGrid.value.style.margin = 'auto auto'
            window.scrollTo(0, document.body.scrollHeight, { behavior: { smooth: true }})
        })
        selectorBackButton.value.classList.remove('active')
    }
    emit('selectorClick', option)
}

</script>

<template>
    <div ref="selectorGrid" :class="`selector-grid ${selectorActiveClass}`">
        <div ref="selectorBackButton" v-if="selectorActive" 
            @click="selectorClick(null)" v-html="backArrow"
            class="selector-back-button"
        ></div>
        <SelectorOption v-for="(option, i) in selector" 
            @click="selectorClick(option)"
            :key="`opt-${i}`"
            :option="option"
            :num="i"
            :isActive="selectorActive === option" 
        />
    </div>
</template>

<style lang="scss">
@import '@/assets/variables.scss';
    .selector-grid {
        position: relative;
        display: grid;
        align-content: center;
        z-index: 4;
        margin: auto;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr;
        width: 70vmin;
        height: 70vmin;
        max-width: 500px;
        max-height: 500px;
        grid-gap: 10px;
        transition: $selector-transitions;
        &.active {
            width: 100px;
            height: 100px;
            grid-gap: 5px;
            font-size: 20px;
            // margin-top: 75px;
        }
    }
    .selector-back-button {
        position: absolute;
        z-index: 5;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        border-radius: 8px;
        opacity: 0;
        transition: opacity .15s linear;
        background-color: rgba(49, 53, 50, .9);
        &.active {
            &:hover {
                opacity: .9;
                cursor: pointer;
            }
        }
    }
</style>
