import { onMounted, ref, watch } from 'vue'
import { client } from '@/sanity/client'
import { state } from '@/store'

export function useSanityData({
    query,
    params = {},
    stateProp,
    nestedKey,
    map = d => d,
    cache = true,
    cacheWhen = defaultCacheWhen,
    immediate = true,
    watchSources = [],

    where = '',
    order = '',
    projection = '',
    first = false
}) {
    const data = ref(null)
    const loading = ref(false)
    const error = ref(null)

    function buildQuery() {
        if (typeof query === 'string' && query.trim().startsWith('*[')) {
            return query
        }
        const type = String(query).trim()
        const whereClause = where ? ` && (${where})` : ''
        const orderClause = order ? ` | order(${order})` : ''
        const firstClause = first ? '[0]' : ''
        const projectionClause = projection ? `{ ${projection} }` : ''
        return `*[_type == "${type}"${whereClause}]${orderClause}${firstClause}${projectionClause}`
    }

    function readFromState() {
        if (!stateProp) return null
        if (nestedKey) {
            const container = state[stateProp]
            if (!container || !(nestedKey in container)) return null
            return container[nestedKey]
        }
        return state[stateProp] ?? null
    }

    function writeToState(value) {
        if (!stateProp) return
        if (nestedKey) {
            if (!state[stateProp]) state[stateProp] = {}
            state[stateProp][nestedKey] = value
        } else {
            state[stateProp] = value
        }
    }

    async function fetchData(opts = { ignoreCache: false }) {
        loading.value = true
        error.value = null

        try {
            if (cache && !opts.ignoreCache) {
                const existing = readFromState()
                if (cacheWhen(existing)) {
                    data.value = existing
                    loading.value = false
                    return existing
                }
            }

            const groq = buildQuery()
            const result = await client.fetch(groq, params)
            const mapped = map(result)

            data.value = mapped
            writeToState(mapped)
            return mapped
        } catch (err) {
            error.value = err
            console.error(err)
        } finally {
            // setTimeout(() => {
                loading.value = false
            // }, 2000);
        }
    }

    async function refresh() {
        return fetchData({ ignoreCache: true })
    }

    if (immediate) onMounted(fetchData)
    if (watchSources && watchSources.length) watch(watchSources, () => fetchData())

    return { data, loading, error, fetchData, refresh }
}

function defaultCacheWhen(v) {
    if (v == null) return false
    if (Array.isArray(v)) return v.length > 0          // <-- empty array = miss
    if (typeof v === 'object') return Object.keys(v).length > 0 // empty object = miss
    return true
}
