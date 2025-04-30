<script setup>
import { ref, onMounted } from 'vue'
import ExpBlock from '../components/ExpBlock.vue'
import { fetchDocuments } from '@/utils/sanity'

import { state } from '@/store'

const loaded = ref(false)

onMounted(async() => {
    if (!state.exp) {
        const data = await fetchDocuments({ type: 'experience' })
        state.exp = data
    }
    loaded.value = true
})

</script>

<template>
    <section class="container fade-slide-from-bottom">
        <h2 class="font-accent">EXPERIENCE</h2>
        <ExpBlock v-for="({ title, role, description, link, media }, i) of state.exp"
            :key="`exp-${i}`"
            :title
            :role
            :description
            :link
            :media
        />
        <div class="spacer"></div>
    </section>
</template>


<style lang="scss" scoped>
    .container {
        // max-width: 1024px;
    }
</style>