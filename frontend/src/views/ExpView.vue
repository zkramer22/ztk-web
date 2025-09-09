<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import ExpBlock from '../components/ExpBlock.vue'

import expItems from '@/json/expItems'

const start = new Date(2016, 10, 1)
const timeAsEngineer = ref({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
})
function updateTime() {
    const now   = new Date();

    let years   = now.getFullYear()  - start.getFullYear();
    let months  = now.getMonth()     - start.getMonth();
    let days    = now.getDate()      - start.getDate();
    let hours   = now.getHours()     - start.getHours();
    let minutes = now.getMinutes()   - start.getMinutes();
    let seconds = now.getSeconds()   - start.getSeconds();

    if (seconds < 0) {
        seconds += 60;
        minutes -= 1;
    }
    if (minutes < 0) {
        minutes += 60;
        hours    -= 1;
    }
    if (hours < 0) {
        hours += 24;
        days  -= 1;
    }
    if (days < 0) {
        const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += prevMonthLastDay;
        months -= 1;
    }
    if (months < 0) {
        months += 12;
        years  -= 1;
    }

    timeAsEngineer.value = { years, months, days, hours, minutes, seconds };
}

const timeOpen = ref(false)

let interval

onMounted(() => {
    updateTime()
    interval = setInterval(updateTime, 1000)
})
onUnmounted(() => {
    clearInterval(interval)
})

</script>

<template>
    <section class="container mb-[100px]">
        <h2 class="font-accent font-bold fade-slide-from-left my-4">[experience]</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start fade-slide-from-bottom">
            <div id="blurb" class="bg-darkest card-item border rounded p-4 text-lg">
                <p>
                    I've been fortunate enough to meet and work with some incredible people over the years. 
                    Whether full-time or freelance, I've put my heart, mind, and soul into the boundless world of technology.
                </p>
            </div>
                
            <div class="bg-darkest card-item border rounded p-4 text-lg font-accent mb-4">
                <span id="engineer-time" class="relative select-none text-lg">
                    <span class="hover-element">
                        <span @click="timeOpen = !timeOpen" class="">
                            <span class="inline-block" id="var-arrow" :class="[{ timeOpen }]">›</span>
                            <span>&nbsp;</span>
                            <span class="hover-underline">
                                <span class="font-bold color-1-light">let&nbsp;</span> 
                                <span>timeAsDeveloper</span>
                            </span>
                            <span class="color-blue">&nbsp;=</span>
                            <span class="color-yellow font-bold">&nbsp;{</span>
                        </span>
                        <div id="time" v-if="timeOpen">
                            <div v-for="(val, key) in timeAsEngineer">
                                <div class="pl-[3rem]"><span>{{ key }}<span class="color-blue">:</span></span> <span class="color-orange font-medium">{{ val }}<span v-if="key !== 'seconds'" class="color-blue">,</span></span></div>
                            </div>
                        </div>
                    </span>
    
                    <span v-if="!timeOpen" @click="timeOpen = !timeOpen">&nbsp;...</span> <span class="color-yellow font-bold">}</span>
                </span>
            </div>

        </div>
        
        <div class="fade-slide-from-bottom container-exp grid gap-4 grid-cols-1 lg:grid-cols-2 mt-4">
            <ExpBlock v-for="({ title, role, time, description, link, img }, i) of expItems"
                :key="`exp-${i}`"
                :title
                :role
                :time
                :description
                :img
                :link
            />
        </div>
    </section>
</template>


<style lang="scss" scoped>
.hover-element {
    pointer-events: all;
    @media (hover:hover) {
        &:hover {
            .hover-underline {
                border-bottom: 1px solid;
            }
        }
    }
}

#var-arrow {
    rotate: 0deg;
    &.timeOpen {
        rotate: 90deg;
    }
}

</style>