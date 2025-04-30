<script setup>

import { ref, onMounted } from 'vue'
import { fetchSingleDocument } from '@/utils/sanity'
import MediaItem from '@/components/MediaItem.vue'
import { PortableText } from '@portabletext/vue'

import { state } from '@/store'

const loaded = ref(false)

onMounted(async() => {
    if (!state.about) {
        const data = await fetchSingleDocument({ type: 'about' })
        state.about = data
    }
    loaded.value = true
})

</script>

<template>
    <section class="container fade-slide-from-bottom">
        <h2 class="font-accent">ME</h2>
        <div class="img-text-grid">
            <div class="img-container headshot">
                <MediaItem v-if="state.about?.headshot" :media="state.about?.headshot" />
            </div>
            <div>
                <PortableText :value="state.about?.bio" />
            </div>
        </div>
        <div class="spacer"></div>
    </section>
</template>


<style lang="scss" scoped>
    .container {
        max-width: 400px;
        align-content: center;
    }
    .img-text-grid {
        gap: 10px;
        .img-container {
            margin: 0 auto;
            justify-self: center;
            max-width: 200px;
            margin-bottom: 20px;
        }
    }

    @media screen and (min-width: 768px) {
        .container {
            grid-row: 1 / 4;
            max-width: 600px;
        }
        .img-text-grid {
            .img-container {
                max-width: 300px;
            }
        }
    }

    @media screen and (min-width: 1024px) {
        .container {
            max-width: 1024px;
        }
        .img-text-grid {
            display: flex;
            gap: 0 25px;
            align-items: center;
            .img-container {
                justify-self: end;
                align-self: center;
                max-width: 450px;
                max-height: 450px;
            }
        }
    }

    @media screen and (min-width: 1440px) {
        .container {
            max-width: 1440px;
        }
    }
</style>