<script setup>
import { computed, onMounted, ref } from 'vue'
import MediaItem from '@/components/MediaItem.vue'
import LoadingDots from '@/components/LoadingDots.vue'
import LoadingBar from '@/components/LoadingBar.vue'
import { useRoute, useRouter } from 'vue-router' 
import { state } from '@/store'

// ------------------------------------------------- //
// -------------------- router -------------------- //
// ------------------------------------------------- //
const route = useRoute()
const router = useRouter()

function syncFiltersFromRoute() {
    const { filter } = route.query
    
    if (Array.isArray(filter)) filterTags.value = [...filter]
    else if (filter) filterTags.value = [filter]
    else filterTags.value = []
}
function updateQueryFromTags() {
    const query = { ...route.query }

    if (filterTags.value.length) query.filter = filterTags.value
    else delete query.filter

    router.replace({ query })
}

// ------------------------------------------------- //
// -------------------- filters -------------------- //
// ------------------------------------------------- //
const filterTagOptions = {
    type: [
        'app',
        'component',
        'design',
        'game',
        'website',
    ],
    framework: [
        'javascript',
        'react',
        'svelte',
        'vue',
    ],
    features: [
        'audio/video',
        'cms',
        'dashboard',
        'data viz',
        'e-commerce',
        'forms',
        'maps',
    ],
}
// const filterTagOptions = [
//     'app',
//     'website',
//     'component',
//     'design',
//     'game',

//     'vue',
//     'react',
//     'svelte',
//     'javascript',
    
//     'dashboard',
//     'e-commerce',
//     'cms',
//     'maps',
//     'forms',
//     'data viz',
//     'audio/video',
// ]
const filterTags = ref([])
const filteredProjects = computed(() => {
    if (!filterTags.value.length) return state.projects

    const filterSet = new Set(filterTags.value)
    
    return state.projects.map((project, index) => {
        const matchCount = project.tags.reduce((n, tag) => n + (filterSet.has(tag) ? 1 : 0), 0)
        return { project, index, matchCount }
    })
    .filter(item => item.matchCount > 0)
    .sort((a, b) => (b.matchCount - a.matchCount) || (a.index - b.index))
    .map(item => item.project)
})
async function toggleFilter(tag) {
    // console.log(route.name);
    if (filterTags.value.includes(tag)) filterTags.value = filterTags.value.filter(t => t !== tag)
    else filterTags.value = [...filterTags.value, tag]

    updateQueryFromTags()
}

// ------------------------------------------------- //
// -------------------- data fetch -------------------- //
// ------------------------------------------------- //
import { useSanityData } from '@/composables/sanityData'
const query = `*[_type == "project" && show == true] | order(orderRank){
    title,
    slug,
    tags,
    client, 
    employer,
    tech,
    "cover": images[0]{
        ...,
        asset->{
            url,
            metadata { lquip, dimensions }
        }
    }
}`

const { data, loading } = useSanityData({ 
    query, 
    stateProp: 'projects',
    cache: true,
    immediate: !state.projects.length
})

// ------------------------------------------------- //
// -------------------- lifecycle ------------------ //
// ------------------------------------------------- //
onMounted(() => {
    syncFiltersFromRoute()
})

</script>

<template>
    <LoadingBar :loading />
    
    <section class="container mb-[100px]">
        
        <RouterView :key="route.path" />
        
        <h2 class="font-accent font-bold fade-slide-from-left my-4">[work]</h2>
        <div :key="route.path" id="blurb" class="bg-darkest card-item border rounded p-4 fade-slide-from-bottom mb-4 inline-block text-lg">
            <p>Here are some samples of my work from past and present employers, as well as projects of my own.</p>
        </div>

        <div :key="route.name" id="filter-controls" 
            class="bg-darkest fade-slide-from-bottom p-4 mb-4 custom-scroll"
        >
            <div class="flex flex-wrap items-center gap-y-4 gap-x-2">
                <template v-for="tags, group in filterTagOptions">
                    <div v-for="tag of tags" class="filter-item hover chip text-sm md:text-xs flex items-center font-accent"
                        @click="toggleFilter(tag)" :class="filterTags.includes(tag) ? 'active' : ''"
                    >
                        {{ tag }}
                    </div>
                </template>
            </div>
        </div>
        
        <div :key="route.name" id="project-list" class="grid gap-[1rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            <template v-if="loading">
                <div class="loading-spacer flex items-center justify-center col-span-4">
                    <LoadingDots :size="8" :gap="6" />
                </div>
            </template>
            <template v-else-if="!loading && state.projects.length">
                <RouterLink v-for="({ title, client, employer, cover, tags, slug }) of filteredProjects"
                    :key="slug.current"
                    :to="`/work/${slug.current}`" 
                    class="card-item card-item-hover col-span-1 fade-slide-from-bottom work-item"
                >
                    <div class="h-full bg-darkest">
                        <MediaItem :item="cover.image"
                            :alt="cover.alt || title"
                            :aspectRatio="16/9"
                            center
                        />
                        <div class="p-[.7rem] card-item-title sm:text-xl flex flex-col gap-2">
                            <div class="text-3xl sm:text-xl md:text-2xl font-bold">
                                {{ title }}
                            </div>
                            <div class="text-xl mb-2">
                                {{ client || employer }}
                            </div>
                            <div class="flex flex-wrap gap-2">
                                <div v-for="tag of tags" class="filter-item chip font-accent text-base sm:text-sm"
                                    :class="`${tag} ${filterTags.includes(tag) ? 'active' : ' '} `"
                                >
                                    {{ tag }}
                                </div>
                            </div>
                        </div>
                    </div>
                </RouterLink>
            </template>
        </div>
    </section>
</template>


<style lang="scss">
.filter-group {
    border-right: 2px solid;
    padding: 0 1rem;
}
.work-item {
    opacity: 0;
}

$max-items: 100;
$stagger: .08s;
@for $i from 1 through $max-items {
    $stagger: $stagger * .9;

    .work-item:nth-child(#{$i}) {
        animation-delay: $i * $stagger;
    }
}

#filter-controls {
    z-index: 5;
    border: 2px solid var(--color-black);
    border-radius: var(--button-radius);
    width: max-content;
    max-width: 100%;
}
.filter-item {
    user-select: none;
    position: relative;
    transition: background .15s ease, color .15s ease;
    &.hover {
        @media (hover:hover) {
            &:hover {
                background-color: var(--color-dark);
            }
            &:active {
                background-color: var(--color-darker);
            }
            &.active {
                background-color: white;
            }
        }
    }
    &.active {
        background-color: white;
        color: var(--color-darkest);
    }
}

</style>