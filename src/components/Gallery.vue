<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import chevron from '@/assets/icon/chevron.svg?raw'

const props = defineProps({
    imgs: Array,
    navigation: Boolean,
    pagination: Boolean,
    fullscreen: Boolean,
})
const fullscreenEnabled = ref(props.fullscreen === undefined ? true : props.fullscreen)
const navEnabled = ref(props.navigation === undefined ? true : props.navigation)
const paginationEnabled = ref(props.pagination === undefined ? true : props.pagination)

const slideCount = props.imgs.length
const currentSlide = ref(0)

////////////////////////// methods /////////////////////////////
function nextSlide() {
    if (currentSlide.value === slideCount - 1) {
        currentSlide.value = 0
        return
    }
    currentSlide.value += 1
}
function prevSlide() {
    if (currentSlide.value === 0) {
        currentSlide.value = slideCount - 1
        return
    }
    currentSlide.value -= 1
}

function goToSlide(index) {
    currentSlide.value = index
}

</script>

<template>
    <div class="gallery-wrapper">
        <Slide v-for="(img, i) in imgs" 
            :isActive="currentSlide === i"
            :img="img"
        />

        <!-- Navigation -->
        <!-- <div v-if="navEnabled" class="navigation">
            <div class="toggle-page left" v-html="chevron" @click="prevSlide"></div>
            <div class="toggle-page right" v-html="chevron" @click="nextSlide"></div>
        </div> -->

        <!-- Pagination -->
        <!-- <div v-if="paginationEnabled" class="pagination">
            <span v-for="(img, i) in imgs"
                @click="goToSlide(i)"
                :key="`pagination-${i}`"
                :class="{ active: i === currentSlide }">
            </span>
        </div> -->
    </div>
</template>


<style lang="scss">
@import '@/assets/variables.scss';
    .gallery-wrapper {
        position: relative;
        width: 100%;
        grid-column: 1 / 3;
        display: grid;
        gap: 30px 0;
       
        
        .img-container {
            min-width: 100%;
            border-radius: 10px;
            overflow: hidden;
        }

        .navigation {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
            height: 100%;
            width: 100%;
            padding: 0 16px;
        }

        .toggle-page {
            width: 50px;
            height: 50px;
            padding: 7px;
            background-color: $primary-gray;
            border-radius: 50%;
            // opacity: .5;
            svg {
                transform: translateY(-2px);
            }
            &.left {
                transform: rotate(-90deg);
            }
            &.right {
                transform: rotate(90deg);
            }
        }

        .pagination {
            span {
                width: 5px;
                height: 5px;
                background-color: white;
                border-radius: 50%;
            }
        }
    }
</style>