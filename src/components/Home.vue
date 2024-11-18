<script setup>
import sinewave2 from '@/assets/icon/sinewave2.svg?raw'
import development from '@/assets/icon/development.svg?raw'
import design from '@/assets/icon/design.svg?raw'
</script>

<template>
    <div id="home-grid">
      <h1 class="site-title-text">
        <span>ztk</span> <span style="font-weight: 500">web</span>
      </h1>

      <div id="home-divider"></div>

      <div id="welcome-text" class="">
        <strong>zach kramer </strong> is a 
        <div class="chip">
            <span class="icon" v-html="development"></span>
            <span>developer</span>
        </div> 
        and <div class="chip">
            <span class="icon" v-html="design"></span>
            <span>designer</span>
        </div>
        focused on bringing smooth, enjoyable, and memorable experiences to the web. 
        <span class="nobreak">He's currently based in San Diego.</span>
        </div>
    </div>

    <div class="sinewave-container absolute pulse delay" v-html="sinewave2"></div>
</template>

<style lang="scss">
@import '@/assets/variables.scss';

@keyframes paint {
  to {
    stroke-dashoffset: -3000;
  }
}
@keyframes pulse {
  0% {
    stroke: rgba(255,255,255,1);
  }

  100% {
    stroke: rgba(255,255,255,0);
  }
}

#welcome-text {
    user-select: none;
    position: relative;
    max-width: 500px;
    margin: 0 auto;
    margin-top: 15px;
    line-height: 2;
    font-size: 18px;
    text-align: center;
    font-weight: lighter;
    animation: fadein 1s linear, slideFromBottom 1s ease;
    .chip {
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        background-color: $primary-gray;
        white-space: nowrap;
        padding: 2px 5px;
        border: 1px solid;
        border-radius: 40px;
        position: relative;
        bottom: 3px;
        margin-right: 2px;
        font-weight: bolder;
        .icon {
            display: inline-block;
            width: 25px;
            height: 25px;
            svg {
                width: 100%;
                height: 100%;
            }
        }
    }
}

.sinewave-container {
  width: 100%;
  &.absolute {
    position: absolute;
    bottom: 60px;
    left: 0;
  }
  path.dashclass {
    stroke-dasharray: 3000;
    stroke-dashoffset: 3000;
    animation: paint 5s linear infinite;
  }
  &.shorter {
    path.dashclass {
      stroke-dasharray: 3000;
      stroke-dashoffset: 3000;
      animation: paint 5s linear infinite;
    }
  }
  &.pulse {
    path.dashclass {
      animation: paint 5s linear infinite, pulse 5s linear infinite;
    }
  }
  &.delay {
    path.dashclass {
      animation-delay: 2s;
    }
  }
}

</style>