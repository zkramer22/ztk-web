<script setup>
import { PortableText } from '@portabletext/vue'
import { h } from 'vue'

import Prism from 'prismjs'
import 'prismjs/components/prism-javascript' // load languages you need
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'

import MediaItem from './MediaItem.vue'
import Carousel from './Carousel.vue'

const props = defineProps({
    value: { type: Array, required: true },
})

const langAlias = {
    html: 'markup',
    js: 'javascript',
    vue: 'vue',
}

function copy(text) {
    try { 
        navigator.clipboard?.writeText(text) 
    } catch (error) {
        console.log(error);
    }
}

const components = {
    marks: {
        link: ({ value }, { slots }) => {
            const { href, variant } = value
            const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined
            return h('a', {
                href,
                rel,
                target: '_blank',
                class: `inline-flex items-center font-medium hover-bright ${variant}`
            }, slots.default?.())
        }
    },
    types: {
        image: ({ value }) => {
            const title = `${value?.title}: ` || ''
            const caption = `${value?.caption}` || ''
            const fig = [
                h(MediaItem, { item: value }),
                h('figcaption', { class: 'text-base' }, [
                    h('strong', {}, title),
                    h('span', { class: 'opacity-85' }, caption)
                ])
            ]
            return h('figure', null, fig)
        },
        video: ({ value }) => {
            const title = `${value?.title}: ` || ''
            const caption = `${value?.caption}` || ''
            const { autoplay, controls, playsinline, loop, muted } = value
            const fig = [
                h(MediaItem, {
                    item: value.url,
                    isSanityImage: false,
                    autoplay, controls, playsinline, loop, muted
                }),
                h('figcaption', { class: 'text-base' }, [
                    h('strong', {}, title),
                    h('span', { class: 'opacity-85' }, caption)
                ])
            ]
            // fig.push(h('figcaption', { class: 'text-base' }, value.caption))
            return h('figure', null, fig)
        },
        codeBlock: ({ value }) => {
            const filename  = value?.code?.filename
            const rawLang   = value?.code?.language || 'javascript'
            const language  = langAlias[rawLang] || rawLang
            const label     = value?.label ? `(${value.label})` : ''
            const collapsed = value?.collapsed ?? true
            const codeText  = value?.code?.code ?? ''

            // Highlight (fallback to JS grammar if missing)
            const grammar = Prism.languages[language] || Prism.languages.javascript
            const highlighted = Prism.highlight(
                String(codeText),
                grammar,
                language
            )

            // <summary> must contain only phrasing content
            const summary = h('summary', {
                class: 'select-none px-3 py-2 flex flex-wrap items-center gap-3 text-base'
            }, [
                h('div', { class: 'flex items-center gap-2' }, [
                    h('span', { class: 'text-lg code-snippet-arrow' }, '›'),
                    h('span', { class: 'font-accent' }, filename),
                ]),
                h('div', {}, [
                    h('span', { class: 'opacity-80' }, label)
                ])
            ])

            const pre = h('pre', { class: `overflow-auto p-4 text-sm` }, [
                h('code', { innerHTML: highlighted })
            ])

            return h('details', { class: 'text-sm', open: !collapsed }, [
                summary,
                pre,
            ])
        },
        carousel: ({ value }) => {
            const { items } = value
            return h(Carousel, { items })
        },
    }
}


</script>

<template>
    <PortableText :value :components />
</template>