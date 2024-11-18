<script setup>

    const props = defineProps({
        chip: String,
        icon: String,
    })

    function getS3Path(name) {
        return `https://ztk-web.s3.us-west-1.amazonaws.com/chips/${name.toLowerCase()}.png`
    }
</script>

<template>
    <div class="chip-wrapper">
        <div class="chip-icon svg" v-if="icon" v-html="icon"></div>
        <div class="chip-icon" v-else>
            <img :src="getS3Path(chip)" alt="">
        </div>
        <div class="chip-text">
            {{ chip }}
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
        height: 50px;
        padding: 10px 15px;
        border-radius: 50px;
        margin: 4px;
        user-select: none;
        pointer-events: none;
        width: fit-content;
        .chip-icon {
            margin-right: 10px;
            display: flex;
            &.svg {
                width: 30px;
            }
        }
        img {
            width: 35px;
        }
    }
</style>