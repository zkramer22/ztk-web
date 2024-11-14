<script setup>
import { reactive, computed } from 'vue'
import AudioPlayerItem from '@/components/AudioPlayerItem.vue'
import search from '@/assets/icon/search.svg?raw'
import viewlist from '@/assets/icon/viewlist.svg?raw'
import viewtile from '@/assets/icon/viewtile.svg?raw'
import { audioItems, audioPlayer, audioMethods, formatMethods, loaderMethods } from '../store.js'
const { createTrack, playPauseClick } = audioMethods
const { loadImg, } = loaderMethods
const { objectFilter } = formatMethods
const musicItems = objectFilter(audioItems, (item) => item.type === 'music')

const state = reactive({
    albumView: false,
})
const tileActiveClass = computed(() => state.albumView ? 'active' : '')
const listActiveClass = computed(() => state.albumView ? '' : 'active')
const albumClass = computed(() => state.albumView ? 'album' : '')

</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <p class="ma-0">
                    I've been honing my craft as a musician for the past 20 years. 
                    While many music producers rely on their computer as their only tool, 
                    I approach the studio from the point of view of a trained singer, 
                    drummer, and multi-instrumentalist. You can count on me to adapt 
                    to your specific needs for your next music project – no matter the genre.
                </p>
            </v-col>
            <v-col cols="12" class="flex-centered flex-wrap">
                <!-- <h3 class="portfolio-section title">highlights</h3> -->
                
                <!-- <div class="z-card nobreak">Ableton Live expert</div>
                <div class="z-card nobreak">Logic Pro & Cubase proficiency</div>
                <div class="z-card nobreak">Universal Audio hardware</div> -->
                
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
                        <h4>tracks</h4>
                        <div class="flex">
                            <div class="list-type-switch flex">
                                <div :class="`switch flex-centered ${listActiveClass}`" v-html="viewlist" @click="state.albumView = false"></div>
                                <div :class="`switch flex-centered ${tileActiveClass}`" v-html="viewtile" @click="state.albumView = true"></div>
                            </div>
                            <div class="searchbar flex">
                                <div class="small-svg mr-1" v-html="search"></div>
                                <input type="text" placeholder="search for samples"/>
                            </div>
                        </div>
                    </div>
                    <div v-if="!state.albumView" class="audio-items-header flex-aligned">
                        <div class="header-item">title</div>
                        <div class="header-item">artist</div>
                        <div class="header-item">album</div>
                    </div>
                    <!-- <AudioPlayerItem v-for="(audioItem, key) in audioItems" -->
                    <div :class="`audio-items ${albumClass}`">
                        <AudioPlayerItem v-for="(audioItem, trackId) in musicItems"
                            :key="`audio-item-${trackId}`"
                            :item="audioItem"
                            :trackId="trackId"
                            :playing="audioItem.playing"
                            :loaded="audioItem.loaded"
                            :loading="audioPlayer.loadingTrack === trackId"
                            :imgLoaded="audioItem.imgLoaded"
                            @create-track="createTrack"
                            @play-pause-click="playPauseClick"
                            @load-img="loadImg"
                            :albumView="state.albumView"
                            />
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>


<style lang="scss" >
@import '@/assets/variables.scss';
    .audio-items-header {
        padding: 0 12px;
        grid-template-columns: repeat(auto-fill, 300px);
        font-size: 14px;
        .header-item {
            width: 300px;
            position: relative;
            left: 30px;
        }
    }
    .list-type-switch {
        margin-right: 10px;
        height: 30px;
        .switch {
            cursor: pointer;
            border: 1px solid white;
            border-radius: 7px;
            padding: 5px;
            width: 35px;
            height: 35px;
            &:nth-of-type(1) {
                margin-right: 5px;
            }
            &.active {
                background-color: $primary-color-audio;
            }
        }
        .divider {
            border: 1px solid white;
            height: 100%;
            width: 1px;
            margin: 0 5px;
        }
    }
</style>