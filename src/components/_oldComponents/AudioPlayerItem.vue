<script setup>
import { computed } from 'vue'
import play from '@/assets/icon/play.svg?raw'
import pause from '@/assets/icon/pause.svg?raw'

const emit = defineEmits(['createTrack', 'playPauseClick', 'loadImg'])
const props = defineProps({
    item: Object,
    trackId: String,
    playing: Boolean,
    loaded: Boolean,
    loading: Boolean,
    imgLoaded: Boolean,
    albumView: Boolean,
})
const { name, artist, album, art } = props.item

const activeClass = computed(() => props.loaded ? 'active' : '')
const albumClass = computed(() => props.albumView ? 'album' : '')

function playPauseClick() {
    if (props.loading) return
    if (props.loaded) emit('playPauseClick', props.trackId)
    else emit('createTrack', props.trackId)
}
function doubleClick() {
    if (props.loading) return
    if (props.loaded) emit('playPauseClick', props.trackId)
    else emit('createTrack', props.trackId)
}
function loadImg() {
    emit('loadImg', 'album', props.trackId)
}

</script>

<template>
    <div :class="`audio-player-item-wrapper ${activeClass} ${albumClass}`" @dblclick="doubleClick">
        <div v-show="albumView" class="album-img flex-centered">
            <div v-if="!imgLoaded" class="loading-shimmer"></div>
            <img :src="art" @load="loadImg" />
            <div class="play-pause flex-centered album" @click="playPauseClick">
                <div v-if="playing" v-html="pause" class="pause"></div>
                <div v-else-if="loading">•••</div> 
                <div v-else v-html="play" class="play"></div>
            </div>
        </div>
        <div :class="`audio-player-item ${albumClass}`">
            <div v-show="!albumView" :class="`play-pause flex-centered`" @click="playPauseClick">
                <div v-if="playing" v-html="pause" class="pause"></div>
                <div v-else-if="loading">•••</div> 
                <div v-else v-html="play" class="play"></div>
            </div>
            <div :class="`audio-column title`">{{ name }}</div>
            <div v-if="artist" class="audio-column small">{{ artist }}</div>
             <div v-if="album" class="audio-column small">{{ album }}</div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/variables.scss';
.audio-items {
    &.album {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        padding: 0 10px 10px;
    }
}
.audio-player-item-wrapper {
    position: relative;
    padding: 0 12px;
    user-select: none;
    ;
    &:hover {
        background-color: $hover-color-darker;
    }
    &:active {
        background-color: $hover-color-darkest;
    }
    &.active {
        background-color: rgba(147,147,147,.8);
    }
    &.album {
        padding: 10px;
        border-radius: 7px;
        .album-img {
            position: relative;
            border-radius: 7px;
            overflow: hidden;
            .play-pause {
                position: absolute;
                opacity: 0;
            }
        }
        &:hover {
            .play-pause {
                opacity: 1;
            }
        }
    }
}
.audio-player-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    width: 100%;
    .audio-column {
        display: flex;
        align-items: center;
        width: 300px;
        font-size: 16px;
        text-overflow: ellipsis;
    }
    &.album {
        flex-direction: column;
        justify-content: center;
        padding: 0;
        .audio-column {
            width: auto;
            &.title {
                margin-top: 7px;
            }
            &.small {
                font-size: 12px;
            }
        }
    }
}
.play-pause {
    margin-right: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    &.album {
        position: absolute;
        margin-right: 0;
        width: 50px;
        height: 50px;
        padding: 10px;
        background-color: $primary-color-audio;
        &:hover {
            background-color: $secondary-color-audio;
        }
    }
}
.play, .pause {
    display: flex;
    ;
}

</style>