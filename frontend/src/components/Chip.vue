<script setup>

const props = defineProps({
    iconText: String,
    text: String,
    icon: String,
    url: String,
})

function getS3Path(text) {
    return `https://ztk-web.s3.us-west-1.amazonaws.com/chips/${text.toLowerCase()}.png`
}
</script>

<template>
    <a :href="url" target="_blank" @click="(e) => e.stopPropagation()">
        <div class="chip-wrapper">
            <div class="chip-icon svg" v-if="icon" v-html="icon"></div>
            <div class="chip-icon" v-else-if="iconText">
                <img :src="getS3Path(iconText)" alt="">
            </div>
            <div class="chip-text">
                {{ text }}
            </div>
        </div>
    </a>
</template>

<style lang="scss" scoped>

    a {
        display: block;
        width: min-content;
        white-space: nowrap;
        @media (hover:hover) {
            &:hover {
                .chip-wrapper {
                    // background-color: #666666;
                    background-color: #9490c9;
                }
            }
        }
    }
    
    .chip-wrapper {
        // background-color: var(--color-dark);
        background-color: var(--color-1-vibrant);
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
        height: 50px;
        // margin: 4px;
        margin: 4px 4px 4px 0;
        padding: 10px 15px;
        border-radius: 50px;
        user-select: none;
        pointer-events: none;
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