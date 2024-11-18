<script setup>
    import { ref, onMounted, watch } from 'vue'

    import Chip from './Chip.vue'
    import Gallery from './Gallery.vue'
    import MediaItem from './MediaItem.vue'

    const props = defineProps({
        workItem: Object,
        num: Number
    })

    const { title, body, short, media, chips } = props.workItem
    
    const gallery = ref(null)
    const galleryHeight = ref(null)
    const galleryContainer = ref(null)
    const galleryActive = ref(false)
    
    onMounted(() => {
        galleryHeight.value = gallery.value.clientHeight
    })

    //////////////////////// methods ////////////////////////
    function switchGallery() {
        galleryActive.value = !galleryActive.value
    }

    watch(galleryActive, (newVal) => {
        if (newVal) {
            galleryHeight.value = gallery.value.clientHeight
            console.log(galleryContainer.value.style);
            galleryContainer.value.style.height = `${galleryHeight.value}px`
        }
        else {
            galleryContainer.value.style.height = ''
        }
    })
</script>

<template>
    <div class="work-block z-mb-1">
        <h3>{{ title }}</h3>
        <p>{{ short }}</p>
        <div class="button see-more flex-centered" @click="switchGallery">
            <span v-if="galleryActive">see less</span>
            <span v-else>see more</span>
        </div>
    </div>

    <div ref="galleryContainer" class="gallery-container z-mb-1">
        <div ref="gallery" class="gallery">
            <MediaItem v-for="mediaStr in media" :mediaStr />
        </div>
    </div>


    <!-- <div class="work-block-text">
        <h3>{{ title }}</h3>
        <p>{{ short }}</p>
    </div>
    <div class="work-block-img">
        <div class="img-container rounded">
            <img :src="getS3Path(groups[0])" alt="">
        </div>
        <div class="button-overlay" @click="showGallery">
            <div class="button see-more">
                <span>see more</span>
            </div>
        </div>
    </div> -->

    <!-- <Gallery navigation pagination fullscreen :imgs="imgs" v-show="galleryActive"/> -->
</template>

<style lang="scss">
    @import '@/assets/variables.scss';
    .gallery-container {
        height: calc(45vh + 10px);
        overflow: hidden;
        transition: height 1s ease;
    }
    .gallery {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        // display: grid;
        // grid-template-columns: repeat(auto-fill, minmax(375px, 1fr));

        .media-item {
            flex: 1 1 auto;
            border-radius: 15px;
            overflow: hidden;
            height: 45vh;
            img, video {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: 0 0;
            }
    }
    }
    .work-block-img {
        position: relative;
    }
    .button-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        cursor: pointer;
        &:hover {
            background-color: rgba(0,0,0,.3);
            opacity: 1;
        }
    }
    .button {
        width: fit-content;
        border-radius: 35px;
        cursor: pointer;
        &.see-more {
            background-color: $primary-gray;
            padding: 10px 20px;
            font-size: 24px;
        }
    }
</style>