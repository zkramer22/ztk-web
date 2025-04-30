import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: 'jht9dirf',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-04-27'
})

export async function fetchDocuments({type, mode = 'full' }) {
    const previewFields = `
        title,
        slug,
        coverImage {
            type,
            alt,
            avif { asset->{url} },
            webp { asset->{url} }
        },
        mediaItems[]{
            type,
            alt,
            avif { asset->{url} },
            webp { asset->{url} },
            mp4 { asset->{url} },
            webm { asset->{url} }
        }
    `

    const fullFields = `
        _type,
        title,
        slug,
        role,
        link,
        featured,
        sortOrder,
        publishedAt,
        tags,
        demoLinks,
        description,
        coverImage {
            type,
            alt,
            avif { asset->{url} },
            webp { asset->{url} },
            mp4 { asset->{url} },
            webm { asset->{url} }
        },
        media {
            type,
            alt,
            avif { asset->{url} },
            webp { asset->{url} },
            mp4 { asset->{url} },
            webm { asset->{url} }
        },
        mediaItems[]{
            type,
            alt,
            avif { asset->{url} },
            webp { asset->{url} },
            mp4 { asset->{url} },
            webm { asset->{url} }
        }
    `

    const fields = mode === 'preview' ? previewFields : fullFields
    const query = `*[_type == "${type}"] | order(sortOrder asc){${fields}}`
    return await client.fetch(query)
}


export async function fetchSingleDocument({ type }) {
    const defaultFields = `
        _type,
        title,
        bio[]{
            ...,
            markDefs[]{
                ...,
                _type == "link" => {
                    _type,
                    href
                }
            }
        },
        version,
        headshot {
            type,
            alt,
            avif { asset->{url} },
            webp { asset->{url} },
            mp4 { asset->{url} },
            webm { asset->{url} }
        }
    `

    const query = `*[_type == "${type}"][0]{${defaultFields}}`
    const data = await client.fetch(query)
    return data
}
