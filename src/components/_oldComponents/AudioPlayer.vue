<script setup>
import { onMounted } from 'vue'
import play from '@/assets/icon/play.svg?raw'
import pause from '@/assets/icon/pause.svg?raw'
import closex from '@/assets/icon/closex.svg?raw'
import { audioPlayer, audioMethods, formatMethods } from '../store.js'
const { timestampClick, playPauseClick, closeAudioPlayer, setVolume, volumeMousedown, } = audioMethods
const { getFormattedTimestamp } = formatMethods

onMounted(() => {
    window.addEventListener('keydown', (e) => {
        const { code } = e
        const { loadedTrack, loadingTrack } = audioPlayer
        if (code === 'Space') {
            e.preventDefault()
            if (loadedTrack !== null && !loadingTrack) {
                audioMethods.playPauseClick(loadedTrack)
            }
        }
    })
})
</script>

<template>
    <div :class="`audio-player-wrapper ${audioPlayer.activeClass}`">
        <div class="flex aligned relative">
            <div class="audio-title small">
                <div>{{ audioPlayer.trackName }}</div>
            </div>
            |
            <div class="audio-timestamps-wrapper flex">
                <div v-for="timestamp in audioPlayer.timestamps" class="audio-timestamp" @click="timestampClick(timestamp.time)">
                    <strong>{{ getFormattedTimestamp(timestamp.time) }}</strong> <span>{{ timestamp.name }}</span>
                </div>
            </div>
            <div id="volume-control-container" class="flex-aligned" @mousedown="volumeMousedown">
                <div id="volume-track">
                    <div :style="{ width: `${audioPlayer.volume}%` }" id="volume-fill"></div>
                </div>
                <div id="volume-ball"
                    :style="{ left: `calc(${audioPlayer.volume}% - 10px` }"></div>
            </div>
            <div v-html="closex" id="close-audio-player-x" @click="closeAudioPlayer"></div>
        </div> 
        <div class="audio-area">
            <div id="primary-play-pause" class="play-pause flex-centered" @click="playPauseClick(audioPlayer.loadedTrack)">
                <div v-if="audioPlayer.playingTrack" v-html="pause" class="pause"></div>
                <div v-else v-html="play" class="play"></div>
            </div>
            <div v-if="audioPlayer.loadingTrack" id="loading-div" class="loading-shimmer"></div>
            <div :style="audioPlayer.loadingTrack ? { width: '0%' } : { width: '100%' }" id="audio-waveform-wrapper"></div>
        </div>
    </div>

</template>

<style lang="scss">
@import '@/assets/variables.scss';
.audio-player-wrapper {
    position: fixed;
    z-index: 100;
    bottom: -120px;
    left: 0;
    right: 0;
    background-color: rgba(35, 35, 35, 0.95);
    padding: 10px;
    height: 120px;
    transition: bottom .3s ease;
    #primary-play-pause {
        margin-right: 10px;;
        padding: 7px;
        padding: 10px;
        width: 50px;
        height: 50px;
        background-color: $primary-color-audio;
        &:hover {
            background-color: $secondary-color-audio;
        }
        &:active {
            background-color: $third-color-audio;
        }
    }
    &.active {
        // border-top: 2px solid rgba(84, 84, 84, 1);
        border-top: 2px inset #646464;
        bottom: 0px;
    }
}
.play {
    svg {
        position: relative;
        left: 2px;
    }
}
#close-audio-player-x {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    padding: 6px;
    position: absolute;
    right: 0px;
    border-radius: 50%;
    &:hover {
        background-color: $button-hover-bg-color;
    }
}
#audio-waveform-wrapper {
    width: 100%;
    margin: 5px 0;
    overflow: hidden;
}
#volume-control-container {
    user-select: none;
    z-index: 101;
    position: absolute;
    right: 100px;
    height: 30px;

    #volume-track {
        pointer-events: none;
        width: 100px;
        height: 7px;
        // border: 1px solid $secondary-color-audio;
        border-radius: 10px;
        background-color: white;
        overflow: hidden;
    }
    #volume-fill {
        pointer-events: none;
        background-color: $primary-color-audio;
        height: 100%;
        // width: 0%;
    }
    #volume-ball {
        position: absolute;
        pointer-events: none;
        left: calc(0% - 10px);
        border-radius: 50%;
        border: 1px solid $secondary-color-audio;
        // border: 1px solid white;
        background-color: $primary-color-audio;
        height: 20px;
        width: 20px;
    }
}
#loading-div {
    height: 60px;
    width: 100%;
    margin: 5px 0;
    border-radius: 7px;
    overflow: hidden;
    display: flex;
    align-items: center;
}
.audio-title.small {
    line-height: 1;
    font-size: 18px;
    margin-right: 10px;
}
.audio-area {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 5px;
    border-radius: 7px;
    overflow: hidden;
}
.audio-timestamps-wrapper {
    margin-left: 10px;
}
.audio-timestamp {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 12px;
    margin-right: 5px;
    border-radius: 15px;
    padding: 3px 8px;
    background-color: #555555;
    &:hover {
        background-color: #666666;
    }
    &:active {
        background-color: #444444;
    }
    strong {
        margin-right:4px;
    }
}
</style>