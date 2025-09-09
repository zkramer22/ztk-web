import { reactive, computed } from 'vue'
/////////////////////////////// constants //////////////////////////////////

/////////////////////////////// reactives //////////////////////////////////
export const state = reactive({
    projects: [],
    projectDetails: {}
})

export const selector = reactive({
    activeRoute: null
})

export const formatMethods = {
    objectFilter(obj, condition) {
        return Object.keys(obj)
            .filter(key => condition(obj[key]))
            .reduce((res, key) => (res[key] = obj[key], res), {})
    },
}