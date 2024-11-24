<script setup>

</script>

<template>
    <div class="loader"></div>
</template>

<style lang="scss" scoped>
    @import '@/assets/variables.scss'; 

.loader {
    border-radius: 15px;
    display: block;
    height: 200px;
    position: relative;
    overflow: hidden;
    background-color: #DDDBDD;
    margin: 0 0 15px 0;
    &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(
        90deg,
        rgba(#fff, 0) 0,
        rgba(#fff, 0.2) 20%,
        rgba(#fff, 0.5) 60%,
        rgba(#fff, 0)
        );
        animation: shimmer 3s ease infinite;
        content: '';
    }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>