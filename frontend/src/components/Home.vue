<script setup>
import development from '@/assets/icon/development.svg?raw'
import design from '@/assets/icon/design.svg?raw'
import download from '@/assets/icon/download.svg?raw'

const props = defineProps(['show'])

</script>

<template>
    <section id="home-section" :class="{ show }">
        <div id="home-grid">
            <h1 class="text-center md:text-right fade-slide-from-left">
                <span class="">ztk</span> <span class="font-medium">web</span>
            </h1>

            <div id="home-divider" class="hidden md:block fade-slide-from-top"></div>

            <div id="welcome-text" class="fade-slide-from-bottom balance">
                <strong>zach kramer </strong> is a 
                <div class="chip">
                    <span class="icon" v-html="development"></span>
                    <span>developer</span>
                </div> 
                and 
                <div class="chip">
                    <span class="icon" v-html="design"></span>
                    <span>designer</span>
                </div>
                focused on bringing smooth, enjoyable, and memorable experiences to the web. He's currently based in San Diego.
            </div>
        </div>
        
        <a id="resume" class="chip fade-slide-from-bottom" download href="/downloads/Resume_2025.pdf">
            <span class="icon" v-html="download"></span>
            <span class="text">resume</span>
        </a>
    </section>
</template>

<style lang="scss">
#home-section {
    opacity: 0;
    transition: opacity 0s;
    &.show {
        opacity: 1;
    }
}
#home-grid {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
}

#welcome-text {
    max-width: 400px;
    margin: 0 auto;
    margin-top: 15px;
    line-height: 2;
    font-size: 18px;
    text-align: center;
}

.chip {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    background-color: var(--color-dark);
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

#resume.chip {
    background-color: var(--color-1-vibrant);
    font-weight: normal;
    font-size: 1.2rem;
    bottom: 0;
    padding: 10px 20px;
    margin: 30px auto 0;
    border: none;
    border-radius: 10px;
    transition: scale .1s ease;
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

// @media screen and (max-width: 350px) {
//     h1 {
//         font-size: 2.5rem;
//     }
//     #welcome-text {
//         font-size: 1rem;
//     }
// }

// @media screen and (max-height: 499px) {
//     h1 {
//         font-size: 3rem;
//     }
//     #welcome-text {
//         font-size: 1rem;
//     }
// }

@media (min-width: 768px) {
    #home-grid {
        grid-template-columns: 10fr 1fr 10fr;
        align-items: center;
    }
    #home-divider {
        height: 100%;
        max-height: 300px;
        width: 3px;
        border-radius: 5px;
        background-color: white;
        justify-self: center;
    }
    #welcome-text {
        text-align: left;
    }
}

@media screen and (min-width: 768px) {
    #welcome-text {
        text-align: left;
        margin: auto 0;
        align-self: center;
    }
}

////////////////////////////////////////////////////////

// @keyframes paint {
//   to {
//     stroke-dashoffset: -3000;
//   }
// }
// @keyframes pulse {
//   0% {
//     stroke: rgba(255,255,255,1);
//   }

//   100% {
//     stroke: rgba(255,255,255,0);
//   }
// }

// .sinewave-container {
//   width: 100%;
//   &.absolute {
//     position: absolute;
//     bottom: 60px;
//     left: 0;
//   }
//   path.dashclass {
//     stroke-dasharray: 3000;
//     stroke-dashoffset: 3000;
//     animation: paint 5s linear infinite;
//   }
//   &.shorter {
//     path.dashclass {
//       stroke-dasharray: 3000;
//       stroke-dashoffset: 3000;
//       animation: paint 5s linear infinite;
//     }
//   }
//   &.pulse {
//     path.dashclass {
//       animation: paint 5s linear infinite, pulse 5s linear infinite;
//     }
//   }
//   &.delay {
//     path.dashclass {
//       animation-delay: 2s;
//     }
//   }
// }

</style>