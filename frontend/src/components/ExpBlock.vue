<script setup>
import MediaItem from '@/components/MediaItem.vue'
import { computed } from 'vue';

const props = defineProps({
    title: String,
    role: Array[String],
    description: Array[String],
    link: String,
    time: Array[String],
    img: { type: [String, Object] },
})

const rolesAndTimes = computed(() => props.role.concat(props.time))
</script>

<template>
<div class="bg-darkest card-item rounded">
    <div class="img-container relative">
        <MediaItem :item="img" :isSanityImage="false" :aspectRatio="22/9" />
    </div>
    <div class="job px-[1rem] pt-[1rem]">
        <h3 class="title font-bold mb-3">{{ title }}</h3>
        <div class="flex gap-2 flex-wrap">  
            <div class="chip role font-accent lowercase" v-for="item of rolesAndTimes">{{ item }}</div>
        </div>
        <div class="h-[1px] bg-[var(--color-dark)] w-full my-[1rem]"></div>
    </div>
    <div class="description px-[1rem] pb-[1rem] text-lg lg:text-base">
        <p v-for="description of description">
            {{ description }}
        </p>
    </div>
</div>
</template>

<style lang="scss" scoped>
    p:last-of-type {
        margin-bottom: 0;
    }
</style>