<script setup>
import MediaItem from '../components/MediaItem.vue'
import LoadingBar from '@/components/LoadingBar.vue'
import LoadingDots from '@/components/LoadingDots.vue'
import { computed } from 'vue'
import { state } from '@/store'
import RichText from '@/components/RichText.vue'

const props = defineProps({
    slug: String,  // received from RouterLink in WorkView
})

import { useRoute } from 'vue-router';
const route = useRoute()

const slug = props.slug || route.params.slug

// ------------------------------------------------- //
// -------------------- data fetch -------------------- //
// ------------------------------------------------- //
import { useSanityData } from '@/composables/sanityData'
const PROJECT_DETAIL_BY_SLUG = `*[_type == "project" && slug.current == $slug][0]{
    title,
    slug,
    employer,
    client,
    roles,
    tech,
    tags,
    links,
    description[]{
        ...,
        _type == "image" => {
            ...,
            asset->{
                _id, url, mimeType, extension, metadata { lqip, dimensions }
            }
        },
        _type == "video" => {
            _type, _key, alt, caption,
            "url": mp4.asset->url,
            "webmUrl": webm.asset->url,
            "mimeType": mp4.asset->mimeType,
            "posterUrl": poster.asset->url
            // later you can also add "webm"/"mp4" fields if you want both sources
        },
        _type == "code" => {
            ...,
        },
        _type == "carousel" => {
            _type, _key, title,
            items[] {
                ...,
                _type == "video" => {
                    _type, _key, alt, caption,
                    "url": mp4.asset->url,
                    "webmUrl": webm.asset->url,
                    "mimeType": mp4.asset->mimeType,
                    "posterUrl": poster.asset->url
                },
            }
        }
    },
    images[]{
        alt,
        caption,
        "image": image{
            ...,
            asset->{
                _id,
                url,
                mimeType,
                extension,
                metadata { lqip, dimensions }
            }
        }
    },
    videos[]{
        alt,
        caption,
        "video": video{
            ...,
            asset->{
                _id,
                url,
                mimeType,
                extension
            }
        }
    }
}`

const { loading } = useSanityData({ 
    query: PROJECT_DETAIL_BY_SLUG, 
    params: { slug },
    stateProp: 'projectDetails',
    nestedKey: slug,
    first: true,
    cache: true,
})

const proj = computed(() => state.projectDetails[slug])

</script>

<template>
    <LoadingBar :loading />
    
    <template v-if="loading">
        <div class="loading-spacer flex items-center justify-center col-span-4">
            <LoadingDots :size="8" :gap="6" delay="1s" />
        </div>
    </template>

    <template v-else-if="!loading && !!proj">
        <div class="richtext fade-slide-from-bottom">
            <div class="grid gap-4 lg:grid-cols-12 items-start">
                <div class="lg:col-span-7 card-item bg-darkest h-full">
                    <MediaItem :item="proj.images[0].image" rounded fullHeight />
                </div>

                <div class="lg:col-span-5 lg:sticky lg:top-[1rem] grid gap-4">
                    <aside class="bg-darkest card-item border grid gap-4">
                        <h1>{{ proj.title }}</h1>
    
                        <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-4 font-accent items-center">
                            <template v-if="proj.employer">
                                <dt>
                                    Employer
                                </dt>
                                <dd>{{ proj.employer }}</dd>
                            </template>
    
                            <dt>Client</dt>
                            <dd>{{ proj.client }}</dd>
    
                            <template v-if="proj.roles?.length">
                                <dt>Role</dt>
                                <dd v-if="proj.roles?.length">{{ proj.roles.join(', ') }}</dd>
                            </template>
    
                            <template v-if="proj.tech?.length">
                                <dt>Tech</dt>
                                <dd>{{ proj.tech.join(', ') }}</dd>
                            </template>
    
                            <template v-if="proj.tags?.length">
                                <dt>Tags</dt>
                                <dd>
                                    <div class="flex flex-wrap gap-2">
                                        <div v-for="tag in proj.tags" :key="tag" class="chip text-sm">
                                            {{ tag }}
                                        </div>
                                    </div>
                                </dd>
                            </template>
    
                            <template v-if="proj.links?.length">
                                <dt>Links</dt>
                                <dd class="flex gap-2">
                                    <a v-for="{ text, url } in proj.links" :key="url" class="text-sm info-link rounded grad-complex-vibrant p-2 hover-grow" :href="url" target="_blank">{{ text }}</a>
                                </dd>
                            </template>
                        </dl>
                    </aside>
    
                    <!-- <aside class="bg-darkest card-item border grid gap-4">
                        <div class="flex justify-between">
                            <div class="flex items-center gap-4">
                                <div class="bg-dark rounded" v-html="arrow"/>
                                <div class="font-accent">prev</div>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="font-accent">next</div>
                                <div class="bg-dark rounded" v-html="arrow" style="rotate: 180deg"/>
                            </div>
                        </div>
                    </aside> -->
                </div>
                
                <article class="lg:col-span-7 min-w-0 card-item border p-4 bg-darkest">
                    <RichText :value="proj.description" />
                </article>
            </div>
        </div>

        <div class="divider-lg"></div>
    </template>
</template>

<style lang="scss">
.divider-lg {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 5rem auto;
    height: .25rem;
    border-radius: .25rem;
    width: 10rem;
    background-color: currentColor;
}
.richtext {
    margin-bottom: 2rem;

    aside {
        border-radius: var(--button-radius);
        padding: 1rem;
    }

    blockquote {  // used for line dividers
        border-top: 3px solid;
        border-radius: 1px;
        opacity: .3;
    }

    figure {
        border-radius: var(--button-radius);
        border: 1px solid var(--color-darker);
        background: var(--color-black);
        overflow: hidden;
        position: relative;
        figcaption {
            padding: .7rem;
        }
    }

    details {
        background: var(--color-black);
        border: 1px solid var(--color-darker);
        width: 100%;
        border-radius: var(--button-radius);
        overflow: hidden;
        summary {
            &::marker {
                display: none;
            }
            @media (hover:hover) {
                &:hover {
                    background: var(--color-darker);
                }
            }
        }
        .code-snippet-arrow {
            rotate: 0deg;
        }
        &[open] {
            .code-snippet-arrow {
                rotate: 90deg;
            }
        }
        pre {
            background: var(--color-black);
            border-top: 1px solid var(--color-darker);
            margin: 0;
            max-height: 70svh;
            overflow: auto;
        }
    }

    blockquote, figure, details {
        margin: 2rem 0;
    }

    a {
        &.default {
            border-bottom: 2px solid currentColor;
            font-family: var(--font-primary);
        }
        &.code {
            font-family: var(--font-accent);
            background: rgba(255, 255, 255, .3);
            border-radius: var(--button-radius);
            padding: 0 .25rem;
            border-bottom: none;
        }
        @media (hover:hover) {
            &:hover {
                &.default {
                    border-bottom: 2px solid var(--color-1-vibrant);
                }
                &.code {
                    background: rgba(255, 255, 255, .5);
                }
            }
        }
    }
    p {
        margin: 1rem 0;    
    }
    h1 {
        font-size: 2.5rem;
    }
    h2 {
        font-size: 2.5rem;
        margin: 1rem 0;
    }
    h3 {
        font-size: 2rem;
        margin: 0 0 1rem;
    }
    h4 {
        font-size: 1.2rem;
        margin: 1.5rem 0 .5rem;
        width: max-content;
        padding: .5rem;
        background: var(--color-darker);
        border-radius: var(--button-radius);
    }
    li {
        margin-bottom: .5rem;
    }
    ul {
        list-style: disc;
        margin-bottom: 1rem;
    }
    ul ul {
        margin-top: .5rem;
        list-style: circle;
    }
    ol {
        list-style: roman;
    }
    dt {
        font-weight: bold;
        color: var(--color-gray);
    }
}

</style>