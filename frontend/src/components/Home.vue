<script setup>
import development from '@/assets/icon/development.svg?raw'
import design from '@/assets/icon/design.svg?raw'
import download from '@/assets/icon/download.svg?raw'

// import Popover from './Popover.vue'

const props = defineProps({
    show: { type: Boolean }
})

</script>

<template>
    <section id="home-section" class="grid gap-6" :class="{ show }">
        <div id="home-grid">
            <h1 class="text-center fade-slide-from-bottom">
                <span class="">ztk</span> <span class="font-medium">web</span>
            </h1>

            <div id="home-divider" class="hidden md:block fade-slide-from-top"></div>

            <div id="welcome-text" class="fade-slide-from-bottom mx-auto max-w-[400px] xl:max-w-[700px]">
                <strong>zachary thomas kramer </strong> <span>is a </span> 
                <div class="chip home font-bold gap-1">
                    <span class="icon" v-html="development"></span>
                    <span>developer</span>
                </div> 
                <span>&nbsp;and&nbsp;</span>
                <div class="chip home font-bold gap-1">
                    <span class="icon" v-html="design"></span>
                    <span>designer</span>
                </div>
                <span>
                    focused on bringing smooth, enjoyable, and memorable experiences to the web. He's currently based in <strong>San Diego, CA</strong>.
                </span>
            </div>
        </div>

        <a download href="/downloads/resume.pdf" class="fade-slide-from-bottom gap-2 py-2 px-4 info-link grad-complex-vibrant rounded hover-grow flex items-center">
            <span class="icon" v-html="download"></span>
            <span class="font-accent text-lg sm:text-xl md:text-lg lg:text-xl">resume</span>
        </a>
        
        <!-- <Popover>
            <template #trigger="{ attrs, toggle }">
                <button id="resume" class="fade-slide-from-bottom gap-2 py-2 px-4 info-link grad-complex-vibrant rounded hover-grow text-center font-accent flex items-center" 
                    v-bind="attrs"
                    @click="toggle"
                >
                    <span class="icon" v-html="download"></span>
                    <span class="text">resume</span>
                </button>
            </template>

            <template #menu="{ close }">
                <a download href="/downloads/resume.pdf">
                </a>
            </template>
        </Popover> -->
    </section>
</template>

<style lang="scss">
#home-section {
    user-select: none;
    grid-row: 3 / 4;
    grid-column: 1 / -1;
    justify-items: center;
    opacity: 0;
    margin-top: 0;
    &.show {
        opacity: 1;
        animation: fadein 1s ease, slideFromBottom 1s ease;
    }
}
#home-grid {
    display: grid;
    width: 100%;
}

#welcome-text {
    margin-top: 1rem;
    line-height: 2;
    font-size: 1.2rem;
    text-align: center;
}

#resume {
    // background-color: var(--color-1-vibrant);
    background: var(--grad-complex-vibrant);
    // background-color: var(--color-dark);
    font-weight: normal;
    font-size: 1.2rem;
    bottom: 0;
    padding: 10px 20px;
    margin: 30px auto 0;
    // border: 2px solid var(--color-1-light);
    // border: 2px solid white;
    border: none;
    border-radius: var(--button-radius);
    transition: var(--hover-grow-trans);
    .text {
        margin: 0 5px;
    }
    @media (hover:hover) {
        &:hover {
            scale: 1.1;
        }
    }
    &:active {
        filter: brightness(.9);
        scale: 1;
    }
}

@media screen and (min-width: 640px) {
    #welcome-text {
        text-wrap: balance;
    }
}

</style>