<script setup>
import { ref } from 'vue'

const props = defineProps({
    src: { type: String, required: true },
    alt: { type: String, default: '' },
    imgClass: { type: String, default: '' },
    style: { type: [String, Object], default: '' },
    loading: { type: String, default: 'lazy' }
})

const loaded = ref(false)

function handleLoad() {
    loaded.value = true
}
</script>

<template>
    <img
        v-if="src"
        :src="src"
        :alt="alt"
        :class="[imgClass, { 'fade-image-loaded': loaded }]"
        :style="style"
        :loading="loading"
        @load="handleLoad"
    />
</template>

<style scoped>
img {
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
}

.fade-image-loaded {
    opacity: 1;
}
</style>
