<script setup>
    import ExpBlock from '../components/ExpBlock.vue'
    import { expItems } from '@/data/expItems.js'
</script>

<template>
    <div class="grid img-text-grid">
        <ExpBlock v-for="({ title, body, img }, i) in expItems"
          :key="`exp-${i}`"
          :title="title"
          :body="body"
          :img="img"
      />
    </div>
</template>


<style lang="scss">
    .img-text-grid {
        gap: 20px 30px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        align-items: center;
        grid-auto-flow: row dense;
        & > .exp-block-img {
            justify-self: start;
            &:nth-child(4n - 2) {
                grid-column-start: 1;
                justify-self: end;
            }
        }
        & > .exp-block-text {
            text-align: right;
            justify-self: end;
            &:nth-child(4n - 3) {
                grid-column-start: 2;
                text-align: left;
            }
        }
    }
</style>