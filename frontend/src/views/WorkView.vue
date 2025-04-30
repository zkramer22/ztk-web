<script setup>
    import { ref, onMounted } from 'vue'
    import MediaItem from '@/components/MediaItem.vue'
    import { fetchDocuments } from '@/utils/sanity'
    import { state } from '@/store'
    import { preloadMedia } from '@/utils/preloadMedia'

    const loaded = ref(false)

    function getObjFromArr(arr) {
        return Object.fromEntries(arr.map(item => [item.slug.current, item]))
    }

    onMounted(async () => {
        if (!state.projects) {
            const previews = await fetchDocuments({ type: 'project', mode: 'preview' })
            state.projects = previews
            state.projectsObj = getObjFromArr(previews)
            setTimeout(() => preloadMedia(previews), 1000)
        }
        loaded.value = true
    })

</script>

<template>
    <section class="container fade-slide-from-bottom">
        <h2 class="font-accent">WORK</h2>
        
        <RouterView />
        
        <div id="work-view" class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            
            <template v-for="({ title, description, slug, coverImage, mediaItems, demoLinks, tags }, index) of state.projects"
                :key="index"
            >
                <RouterLink :to="`/work/${slug.current}`" 
                    class="font-bold card-item card-item-hover"
                >
                    <div class="flex flex-col">
                        <MediaItem :media="coverImage" :alt="title" 
                            :aspectRatio="1.67" 
                        />
                        <div class="p-[.7rem] card-item-title text-xl font-accent uppercase">
                            <div class="mb-1.5">
                                {{ title }}
                            </div>
                            <div class="flex gap-2">
                                <!-- <div v-for="tag of tags" class="chip font-bold text-sm"
                                    :class="`${tag} ${filterTags.includes(tag) ? 'filled' : ' '} `"
                                >
                                    {{ tag }}
                                </div> -->
                            </div>
                        </div>
                    </div>
                </RouterLink>
            </template>
        </div>
    </section>
</template>


<style lang="scss">
.card-item {
    box-shadow: 0 0 5px -3px black;
}

.card-item-title {
    // color: var(--adept-dark);
}

.card-item-hover {
    position: relative;
    cursor: pointer;
    &::after {
        content: '';
        position: absolute;
        inset: 0;
        // background-color: var(--adept-blue-vibrant);
        z-index: 1;
        opacity: 0;
        transition: opacity .2s ease;
        pointer-events: none;
    }
    @media (hover:hover) {
        &:hover::after {
            opacity: .2;
        }
    }
}
</style>