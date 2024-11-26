<script setup>
import { computed, reactive } from 'vue';
import MediaItem from './MediaItem.vue'
import Card from './Card.vue'

import { workBlocks } from '@/data/workItems.js'
import { loaderMethods } from '@/store.js';
const { getS3Object } = loaderMethods

const props = defineProps({
    category: String,  // received from RouterLink in WorkView
})

const state = reactive({
    workObj: computed(() => workBlocks[props.category]),
})

</script>

<template>
    <div class="work-details">
        <h3 class="text-center">{{ state.workObj.title }}</h3>

        <div class="grid">
            <Card v-for="({ name, description, images }, i) in state.workObj.items" :key="name"
                animation 
                long 
                drawer
                :images
                :getS3Object
            >
                <template v-slot:preview>
                    <MediaItem :mediaSrc="getS3Object(images[0].path)"/>
                </template>
                <template v-slot:description>
                    <h4>{{ name }}</h4>
                    <p>{{ description }}</p>
                </template>
            </Card>
        </div>

        <div class="spacer"></div>
    </div>
    
</template>

<style lang="scss" scoped>
    .grid {
        grid-gap: 0;
    }
    h3 {
        font-size: 2rem;
        margin-bottom: 50px;
    }

    .grid {
        grid-template-columns: 1fr;
    }

    @media screen and (min-width: 768px) {
        .grid {
            // grid-template-columns: 1fr 1fr;
        }
    }
</style>