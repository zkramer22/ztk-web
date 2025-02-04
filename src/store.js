import { reactive, computed } from 'vue'
/////////////////////////////// constants //////////////////////////////////

/////////////////////////////// reactives //////////////////////////////////
export const state = reactive({
    scrolled1: false,
    selectorActive: null,
    selectorActiveClass: computed(() => state.selectorActive ? 'active' : ''),
})

export const formatMethods = {
    objectFilter(obj, condition) {
        return Object.keys(obj)
            .filter(key => condition(obj[key]))
            .reduce((res, key) => (res[key] = obj[key], res), {})
    },
}

export const loaderMethods = {
    getS3Object(path) {
        const fullPath = `https://ztk-web.s3.us-west-1.amazonaws.com/${path}`
        return fullPath
    }
}