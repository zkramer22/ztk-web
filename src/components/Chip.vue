<script setup>
    import { chipsObj } from '@/data/workItems.js'
    const props = defineProps({
        text: String,
    })
</script>

<template>
    <div class="chip-wrapper">
        <div class="chip-icon">
            <img :src="chipsObj[text].icon" alt="">
        </div>
        <div class="chip-text">
            {{ chipsObj[text].text }}
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/variables.scss';
    .chip-wrapper {
        background-color: $primary-gray;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 15px;
        border-radius: 50px;
        margin: 4px;
        .chip-icon {
            margin-right: 10px;
        }
        img {
            width: 35px;
        }
    }
</style>