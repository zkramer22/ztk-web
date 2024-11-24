<script setup>
    import { ref } from 'vue'
    import { loaderMethods } from '@/store.js'
    const { getS3Object } = loaderMethods

    import Chip from './Chip.vue'
    import Card from './Card.vue'
    import MediaItem from './MediaItem.vue'

    const props = defineProps({
        title: String,
        short: String,
        previewImg: String,
        chips: Array,
    })
    
    const gallery = ref(null)
    const galleryHeight = ref(null)
    const galleryContainer = ref(null)
    const galleryActive = ref(false)

    const isVideo = (mediaStr) => mediaStr.split('.')[1] === 'mov'

    // function loadImage(imageSrc) {
    //     return new Promise(resolve => {
    //         const image = new Image();
    //         image.onload = () => {
    //             const { width, height } = image;
    //             resolve({ width, height });
    //         };
    //         image.src = imageSrc;
    //     })
    // }
    
    // function loadAllMedia() {
    //     const images = media.filter(item => !isVideo(item))
    //     const videos = Array.from(document.querySelectorAll('video'))

    //     const imagePromises = images.map(mediaStr => {
    //         const fullPath = getS3Object('work', mediaStr)
    //         return new Promise(resolve => {
    //             const image = new Image();
    //             image.src = fullPath;
    //             image.onload = () => {
    //                 const { width, height } = image;
    //                 resolve({ src: image.src, width, height });
    //             };
    //         })
    //     })
    //     const videoPromises = videos.map(video => {
    //         return new Promise(resolve => {
    //             video.addEventListener('loadedmetadata', () => {
    //                 const { videoWidth, videoHeight } = video
    //                 resolve({ src: video.src, videoWidth, videoHeight })
    //             })
    //         })
    //     })

    //     return Promise.all([...imagePromises, ...videoPromises])
    // }
    
    // onMounted(() => {
    //     loadAllMedia().then(() => {
    //         nextTick(() => {
    //             state.loaded = true
    //         })
    //     })
    // })

    //////////////////////// methods ////////////////////////
    // function switchGallery() {
    //     galleryActive.value = !galleryActive.value
    // }

    // watch(galleryActive, (newVal) => {
    //     if (newVal) {
    //         galleryHeight.value = gallery.value.clientHeight
    //         galleryContainer.value.style.height = `${galleryHeight.value}px`
    //     }
    //     else {
    //         galleryContainer.value.style.height = ''
    //     }
    // })
</script>

<template>
    <Card>
        <template v-slot:preview>
            <MediaItem :mediaSrc="getS3Object('work', previewImg)" />
        </template>
        <template v-slot:description>
            <h4>{{ title }}</h4>
            <p>{{ short }}</p>
        </template>
    </Card>
</template>

<style lang="scss" scoped>
    @import '@/assets/variables.scss';
    
    .description {
        padding: 20px 15px;
        p {
            margin: 0;
        }
    }
    
    h3 {
        margin-bottom: 5px;
    }
    
    .gallery {
        columns: 1;
        .media-item {
            img, video {
                width: 100%;
                height: 100%;
                aspect-ratio: auto;
                // object-fit: contain;
            }
        }
    }

    .gallery-spacer {
        margin: 10px auto;
        width: 100%;
        height: 25px;
        // border-top: 2px solid;
        // border-bottom: 2px solid;
    }

    @media screen and (min-width: 768px) {
        .gallery {
            columns: 2;
        }
    }
    
    @media screen and (min-width: 1024px) {
        .gallery {
            columns: 3;
        }
    }
    
    @media screen and (min-width: 1440px) {
        .gallery {
            columns: 4;
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
        @media (hover:hover) {
            &:hover {
                background-color: rgba(0,0,0,.3);
                opacity: 1;
            }
        }
    }
    .button {
        width: fit-content;
        border-radius: 35px;
        &.see-more {
            background-color: $primary-gray;
            padding: 10px 20px;
            font-size: 24px;
        }
    }
</style>