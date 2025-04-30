<script setup>
import MediaItem from './MediaItem.vue'
// import Card from './Card.vue'
// import Chip from './Chip.vue'
import { state } from '@/store';

const props = defineProps({
    project: String,  // received from RouterLink in WorkView
})


</script>

<template>
    <div class="work-details">
        <section class="">
            <h3 class="">{{ state?.projectsObj?.[project].title }}</h3>
            
        </section>
    </div>
    
</template>

<style lang="scss" scoped>

    // .component-preview {
    //     min-height: 150px;
    //     background-color: #eeeeee;
    //     // color: $primary-black;
    // }
    // .extra-wrapper {
    //     margin-top: 20px;
    // }
    // .link {
    //     margin-right: 5px;
    // }
    // .grid {
    //     grid-gap: 0;
    // }
    // h3 {
    //     margin-bottom: 50px;
    // }

    // .grid {
    //     grid-template-columns: 1fr;
    // }

    // @media screen and (min-width: 768px) {
    //     .grid {
    //         // grid-template-columns: 1fr 1fr;
    //     }
    // }
</style>