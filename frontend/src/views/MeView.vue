<script setup>

import { ref, onMounted, computed, watch, onUnmounted } from 'vue'
import MediaItem from '@/components/MediaItem.vue'
import { PortableText } from '@portabletext/vue'

const vw = ref(null)
function setWidth() {
    vw.value = window.visualViewport.width
}

function getAspectRatio() {
    if (vw.value < 768) return 1.78
    if (vw.value < 1024) return 2.5
    if (vw.value < 1200) return 1.3
}

onMounted(() => {
    setWidth()
    window.addEventListener('resize', setWidth)
})
onUnmounted(() => {
    window.removeEventListener('resize', setWidth)
})

</script>

<template>
    <section class="container mb-[100px]">
        <h2 class="font-accent font-bold fade-slide-from-left my-4">[about me]</h2>
        
        <div class="fade-slide-from-bottom grid grid-cols-1 gap-4 lg:grid-cols-2 mb-[2rem]">
            <MediaItem item="/img/headshot-wide.webp" 
                :isSanityImage="false" 
                :aspectRatio="getAspectRatio()" 
                class="rounded card-item border"
                center 
            />
            <div class="bg-darkest card-item border p-4 rounded text-lg">
                <p>
                    I've been fascinated by computers ever since I first sat in front of Grandpa Tom's Apple Performa 6200 at the age of five. Growing up in the heart of the dot-com bubble, I still remember the sound of AOL dial-up. My first experience with HTML was figuring out how to add silly <strong>&lt;marquee&gt;</strong> elements to my Myspace page. 🥹 
                </p>
                <p>
                    I've been building for the web since 2016. While I've touched nearly every part of the app deployment process, the frontend is where I bring the most to the table through thoughtful design and development. Creativity is my strong suit, and I love finding ways to make old patterns feel fresh and new.
                </p>
                <p>
                    Outside of tech, I love being active outdoors. Skiing, snowboarding, and skating are my favorite ways to move. I'm also a musician — music is my sincerest passion, especially where it intersects with technology.
                </p>
            </div>
        </div>

        <!-- <div class="fade-slide-from-bottom">
            <div class="text-lg mb-4">Here's where you can find me online.</div>
            <div class="flex gap-8">
                <a href="https://github.com/zkramer22" target="_blank" class="hover-grow">
                    <div class="text-center font-accent flex flex-col items-center">
                        <div class="img-container w-[5rem] info-link p-[.5rem]">
                            <img src="/icon/github.svg" alt="github logo">
                        </div>
                        <span class="mt-[.5rem] text-lg">
                            github
                        </span>
                    </div>
                </a>
                <a href="https://linkedin.com/in/zkramer22" target="_blank" class="hover-grow">
                    <div class="text-center font-accent flex flex-col items-center">
                        <div class="img-container w-[5rem] info-link p-[.5rem]">
                            <img src="/icon/linkedin.svg" alt="linkedin logo">
                        </div>
                        <span class="mt-[.5rem] text-lg">
                            linkedin
                        </span>
                    </div>
                </a>
            </div>
        </div> -->
    </section>
</template>