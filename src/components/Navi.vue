<script setup>
import phone from '@/assets/icon/phone.svg?raw'
import email from '@/assets/icon/email.svg?raw'

/////////////////////////// variables /////////////////////////////
const props = defineProps({
  pageType: String,
  scrolledClass: String,
})

const top = document.getElementById('top')
</script>

<template>
  <nav class="">
    <div class="flex-centered relative">
      <img id="monologo" :class="`grow-animation ${props.scrolledClass}`" src="@/assets/img/ztk-logo.png"/>
      <h1 :class="`studioZTK small ${props.scrolledClass}`"><span>studio</span> <span style="font-weight: 500">ztk</span></h1>
    </div>
    <div class="flex-centered slide-from-top">
      <div :class="`nav-button ${props.pageType}`">
        <span>book a meeting</span>
      </div>
      <div class="nav-button icon">
        <div class="button-icon-svg" v-html="phone"></div>
      </div>
      <div class="nav-button icon">
        <div class="button-icon-svg" v-html="email"></div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 15px;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    #monologo {
      cursor: pointer;
      width: 80px;
      height: 80px;
      padding: 3px;
      background-color: white;
      border-radius: 5px;
      transition: transform .1s linear, width .2s linear, height .2s linear, padding .2s linear;
      &.scrolled {
        width: 45px;
        height: 45px;
        padding: 2px;
      }
      &:hover {
        transform: scale(1.1);
      }
    }
    .studioZTK {
      &.small {
        font-size: 34px;
        margin: 0 0 0 15px;
        top: -100px;
        transition: top .2s ease;
      }
      &.scrolled {
        top: 0px;
      }
    }
    .pageTypeSwitch {
      &.small {
        scale: .8;
        top: -100px;
        transition: top .2s ease;
      }
      &.scrolled {
        top: 0px;
      }
    }
  }
  .nav-button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin: 0 5px;
    padding: 7px 10px;
    height: 45px;
    cursor: pointer;
    background-color: $primary-gray;
    transition: background-color .2s linear;
    &.icon {
      padding: 3px;
      width: 45px;
      height: 45px;
    }
    &.audio {
      background-color: $primary-color-audio;
    }
    &.web {
      background-color: $primary-color-web;
    }
    &:hover {
      filter: brightness(1.2);
    }
  }
  #contact-buttons {
    position: relative;
  }
  .button-icon-svg {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    max-width: 70%;
    margin: 0 auto;
  }
</style>
