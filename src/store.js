import { reactive, computed } from 'vue'
/////////////////////////////// constants //////////////////////////////////

/////////////////////////////// reactives //////////////////////////////////
export const state = reactive({
    scrolled1: false,
    selectorActive: null,
    selectorActiveClass: computed(() => state.selectorActive ? 'active' : ''),
})

export const formatMethods = {
    getFormattedTimestamp(time) {
        return new Date(time * 1000).toISOString().slice(15, 19); // hh:mm:ss starts at char 11
    },
    objectFilter(obj, condition) {
        return Object.keys(obj)
            .filter(key => condition(obj[key]))
            .reduce((res, key) => (res[key] = obj[key], res), {})
    },
}

export const loaderMethods = {
    loadImg(type, trackId) {
        if (type === 'album') {
            setTimeout(() => audioItems[trackId].imgLoaded = true)
        }
    },
    getS3Object(path) {
        const fullPath = `https://ztk-web.s3.us-west-1.amazonaws.com/${path}`
        return fullPath
    }
}