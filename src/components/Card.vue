<script setup>
import { computed } from 'vue';

    const props = defineProps({
        long: {
            type: Boolean,
            default: false,
        },
    })

    const longClass = computed(() => props.long ? 'long' : '')
    const animationClass = computed(() => props.animation ? 'animate' : '')
</script>

<template>
    <div :class="`card ${longClass} ${animationClass}`">
        <div class="preview">
            <slot name="preview"></slot>
        </div>
    
        <div class="description">
            <slot name="description"></slot>
        </div>
    </div>
</template>


<style lang="scss">
    .card {
        background-color: #222222;
        border-radius: 10px;
        overflow: hidden;
        animation: fadein 1s linear forwards;
        height: min-content;
        &.animate {
            opacity: 0;
            animation: fadein 1s linear forwards;
        }
        .preview {
            overflow: hidden;
            img, video {
                transition: scale .15s ease;
                scale: 1;
                object-position: 0 0;
            }
        }
        h4 {
            margin-bottom: 10px;
        }
        @media (hover:hover) {
            &:hover {
                background-color: #3b3b3b;
                .preview {
                    img, video {
                        scale: 1.1;
                    }
                }
            }
        }

    }
    .description {
        padding: 20px 15px;
        p {
            margin: 0;
        }
    }
</style>