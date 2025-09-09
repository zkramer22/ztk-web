import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/client'  // adjust path as needed

const builder = imageUrlBuilder(client)

export function useSanityImage(source) {
    return builder.image(source)
}
