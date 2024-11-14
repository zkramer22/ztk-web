<script setup>
import AudioPlayerItem from '@/components/AudioPlayerItem.vue'
import search from '@/assets/icon/search.svg?raw'
import { audioItems, audioPlayer, audioMethods, formatMethods } from '../store.js'
const { createTrack, playPauseClick } = audioMethods
const { objectFilter } = formatMethods
const voiceoverItems = objectFilter(audioItems, (item) => item.type === 'voiceover')
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <p class="ma-0">
                    I'm a versatile voice actor with wide range of vocal styles & techniques, 
                    along with the technological expertise to handle recording, mixing, and mastering. 
                    Hire me for your next project – whether you need wacky characters, a high-energy sales pitch, 
                    a documentary host, or anything in between.
                </p>
            </v-col>
            <v-col cols="12" class="flex-centered flex-wrap">
                <!-- <h3 class="portfolio-section title">highlights</h3> -->
                <div class="z-card nobreak">96kHz sample rate / 32-bit</div>
                <div class="z-card nobreak">AKG C314 microphones</div>
                <div class="z-card nobreak">Remote collaboration options</div>
                <!-- <p class="ma-0">
                    <li>recorded at professional quality : 96kHz / 32-bit</li>
                    <li>primary microphone used : AKG C314</li>
                    <li>remote collaboration via SourceConnect, Zoom, Google Meet, etc.</li>
                </p> -->
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <div class="portfolio-section pa-0">
                    <div class="audio-items-title flex-between">
                        <h4>reels / samples</h4>
                        <div class="searchbar flex">
                            <div class="small-svg mr-1" v-html="search"></div>
                            <input type="text" placeholder="search for samples"/>
                        </div>
                    </div>
                    <!-- <AudioPlayerItem v-for="(audioItem, key) in audioItems" -->
                    <div class="audio-items">
                        <AudioPlayerItem v-for="(audioItem, trackId) in voiceoverItems"
                            :key="`audio-item-${trackId}`"
                            :item="audioItem"
                            :trackId="trackId"
                            :loaded="audioItem.loaded"
                            :loading="audioPlayer.loadingTrack === trackId"
                            :playing="audioItem.playing"
                            @create-track="createTrack"
                            @play-pause-click="playPauseClick"
                        />
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss">
</style>