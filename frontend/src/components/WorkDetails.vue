<script setup>
import { computed, reactive } from 'vue';
import MediaItem from './MediaItem.vue'
import Card from './Card.vue'
import Chip from './Chip.vue'

import { workBlocks } from '../data/workItems.js'
import { loaderMethods } from '../store.js';
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
            <Card v-for="({ name, description, images, links, isComponent }, i) in state.workObj.items" :key="name"
                animation 
                long
                :drawer="images.length > 1"
                :isComponent
                :images
            >
                <template v-slot:preview>
                    <MediaItem v-if="images" :mediaSrc="getS3Object(images[0].path)" />
                </template>
                <template v-slot:description>
                    <h4>{{ name }}</h4>
                    <p>{{ description }}</p>
                </template>
                <template v-slot:extra>
                    <div class="extra-wrapper">
                        <div class="links flex" v-if="links && links.length">
                            <Chip class="link" v-for="{ url, text } in links"
                                :url :text
                            />
                        </div>
                    </div>
                </template>
            </Card>
        </div>

        <div class="spacer"></div>
    </div>
    
</template>

<style lang="scss" scoped>
    @import '@/assets/variables.scss';

    .component-preview {
        min-height: 150px;
        background-color: #eeeeee;
        color: $primary-black;
    }
    .extra-wrapper {
        margin-top: 20px;
    }
    .link {
        margin-right: 5px;
    }
    .grid {
        grid-gap: 0;
    }
    h3 {
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