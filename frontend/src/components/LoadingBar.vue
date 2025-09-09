<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    loading: {
        type: Boolean,
        required: true
    }
})

const loadingBar = ref(null)

function getTranslateX(el) {
    const t = getComputedStyle(el).getPropertyValue('transform')
    if (!t || t === 'none') return 0
    // matrix(a,b,c,d,e,f) or matrix3d(..., m41, m42, m43, m44)
    const match = t.match(/matrix(3d)?\((.+)\)/)
    if (!match) return 0
    const nums = match[2].split(',').map(v => parseFloat(v))
    return match[1] ? nums[12] : nums[4] // 3d -> m41, 2d -> e
}

let finishing = false

async function finishFromCurrent() {
    if (finishing) return
    finishing = true

    const x = getTranslateX(loadingBar.value)
    loadingBar.value.style.transform = `translate(${x}px, 0px)`
    loadingBar.value.classList.remove('loading-active')

    loadingBar.value.offsetWidth

    loadingBar.value.classList.add('loading-finish')

    
    loadingBar.value.addEventListener('transitionend', (e) => {
        if (e.propertyName !== 'transform') return
        loadingBar.value.classList.add('loading-slide-up')
        
        loadingBar.value.addEventListener('transitionend', (e2) => {
            if (e2.propertyName !== 'transform') return
            finishing = false
        }, { once: true })
    }, { once: true})
}

watch(() => (props.loading), (val) => {
    if (val === false) finishFromCurrent()
})
</script>

<template>
    <div v-show="loading || finishing"
        ref="loadingBar"
        class="loading-bar loading-active"
    />
</template>

<style scoped>
.loading-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: .6rem;
    background: var(--color-1-light);
    will-change: transform;
    transform: translate(-100%, 0px);
}

.loading-active {
    animation: load 10s cubic-bezier(0.1, 0.05, 0.25, 1);
}

@keyframes load {
    from {
        transform: translate(-100%, 0px);
    }
    to {
        transform: translate(-10%, 0px);
    }
}

.loading-finish {
    transition: transform 300ms ease-out;
    transform: translate(0%, 0px) !important;
}

.loading-slide-up {
    transition: transform 350ms ease;
    transform: translate(0%, -.6rem) !important;
}
</style>