<script setup>
    import { computed } from 'vue';
    const props = defineProps({
        title: String,
        body: String,
        img: String,
    })

    function getS3Img(path) {
        return `https://ztk-web.s3.us-west-1.amazonaws.com/exp/${path}`
    }
</script>

<template>
    <div :class="`img-text-grid`">
        <h3>{{ title }}</h3>
        <div class="img-container screenshot rounded">
            <img :src="getS3Img(img)" alt="wetscott multimedia landing page"/>
        </div>
        <p>{{ body }}</p>
    </div>
</template>

<style lang="scss" scoped>
    h3 {
        margin-bottom: 10px;
    }
    .img-container {
        margin: 10px 0;
    }

    .img-text-grid {
        margin: 20px 0;
    }

    @media screen and (min-width: 500px) {
        .img-text-grid {
            .img-container {
                max-width: 50%;
                float: right;
                margin: 10px;
            }
        }
    }

    @media screen and (min-width: 768px) {
        .img-text-grid {
            display: grid;
            grid-gap: 0 15px;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto 1fr;
            grid-auto-flow: row dense;
            .img-container {
                float: none;
                margin: 0;
                max-width: unset;
                grid-column: 2 / 3;
                grid-row: 1 / 3;
                align-self: start;
            }
            p {
                grid-column: 1 / 2;
                grid-row: 2 / 3;
            }

            &:nth-of-type(2n - 1) {
                .img-container {
                    grid-column: 1 / 2;
                }
                p, h3 {
                    grid-column: 2 / 3;
                }
            }
            &:nth-of-type(2n) {
                p, h3 {
                    text-align: right;
                }
            }
        }
    }
</style>