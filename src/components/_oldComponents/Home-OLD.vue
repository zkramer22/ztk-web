<script setup>
import sinewave from '@/assets/icon/sinewave.svg?raw'
import sinewave2 from '@/assets/icon/sinewave2.svg?raw'
// import DragOrClickSwitch from './DragOrClickSwitch.vue'
import { styleMethods } from '../store.js'
const { getPageTypeClass } = styleMethods

const props = defineProps({
    pageType: String,
})
</script>

<template>
    <div id="home-grid">
      <h1 class="studioZTK">
        <span>ztk</span> <span style="font-weight: 500">web</span>
      </h1>

      <div id="home-divider"></div>

      <div id="welcome-text" class="z-mr-4">
        <p>:: welcome ::</p>
        <!-- <p>
          At the core of <strong class="nobreak">Studio ZTK</strong> lies a deep love & 
          understanding of art & technology. We offer a variety of professional services 
          across our two areas of expertise: 
            <span class="boldish-underline nobreak">digital audio</span>
          and 
            <span class="boldish-underline nobreak">web development</span>.
        </p> -->
        <!-- <p>
          With my unique blend of talent, skill, and attention to detail, 
          I consistently work with my clients to get their projects done right, on time, every time.
        </p> -->
        <p>
          <!-- At the core of <strong class="nobreak">Studio ZTK</strong> lies a deep love & understanding of art & technology.  -->
          <!-- I'm Zach Kramer, and I'm passionate about merging art & technology. 
          I offer a variety of professional services across my two areas of expertise: 
          <span class="boldish-underline nobreak">digital audio</span> and <span class="boldish-underline nobreak">web development</span> –
          In both realms, my unique blend of talent, skill, and attention detail is the key to my success. -->
          I'm Zach Kramer, and I'm obsessed with combining art & technology. 
          As a creative, frontend-focused software developer, I believe that web experiences should be smooth, enjoyable, and memorable for every visitor. 
          With a unique blend of skill, curiosity, and attention to detail, I strive to bring these qualities to every project.
        </p>
        <p>
          Let's collaborate and transform your ideas into a captivating reality.
        </p>
      </div>
    </div>

    <!-- <DragOrClickSwitch /> -->

    <!-- <div id="pageTypeText">
        <p :class="getPageTypeClass('pageTypeText', 'audio')" v-if="props.pageType === 'audio'">
            voiceover • music production • recording • mixing • mastering
        </p>
        <p :class="getPageTypeClass('pageTypeText', 'web')" v-if="props.pageType === 'web'">
            design • web development • UI / UX analysis • data visualization
        </p>
    </div> -->

    <!-- <div class="sinewave-container" v-html="sinewave"></div> -->
    <div class="sinewave-container absolute pulse delay" v-html="sinewave2"></div>
</template>

<style lang="scss">
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
.sinewave-container {
  width: 100%;
  &.absolute {
    position: absolute;
    bottom: 60px;
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