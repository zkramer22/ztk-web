import { reactive, computed } from 'vue'
/////////////////////////////// constants //////////////////////////////////

/////////////////////////////// reactives //////////////////////////////////
export const state = reactive({
    selectorActive: null,
    selectorActiveClass: computed(() => state.selectorActive ? 'active' : ''),

    about: null,
    exp: null,
    projects: null,
    projectsObj: null,
})

export const formatMethods = {
    objectFilter(obj, condition) {
        return Object.keys(obj)
            .filter(key => condition(obj[key]))
            .reduce((res, key) => (res[key] = obj[key], res), {})
    },
}