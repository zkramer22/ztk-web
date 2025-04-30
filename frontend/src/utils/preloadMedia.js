export function preloadMedia(projects, delay = 300) {
    const preferredImageFormat = getPreferredImageFormat()
    const preferredVideoFormat = getPreferredVideoFormat()

    const urls = []

    for (const project of projects) {
        const items = [...(project.mediaItems || [])]

        for (const media of items) {
            if (media?.[preferredImageFormat]?.asset?.url) {
                urls.push(media[preferredImageFormat].asset.url)
            }

            if (media?.[preferredVideoFormat]?.asset?.url) {
                urls.push(media[preferredVideoFormat].asset.url)
            }
        }
    }

    let i = 0
    function loadNext() {
        if (i >= urls.length) return
        preloadFile(urls[i++])
        setTimeout(loadNext, delay)
    }
    loadNext()
}

function preloadFile(url) {
    console.log('Preloading:', url)  // Add this
    if (url.endsWith('.webp') || url.endsWith('.avif')) {
        const img = new Image()
        img.src = url
    } else if (url.endsWith('.mp4') || url.endsWith('.webm')) {
        const video = document.createElement('video')
        video.src = url
        video.preload = 'auto'
        video.muted = true
        video.style.display = 'none'
        document.body.appendChild(video)
        setTimeout(() => {
            try { document.body.removeChild(video) } catch (_) {}
        }, 5000)
    }
}

function getPreferredImageFormat() {
    const canvas = document.createElement('canvas')
    if (canvas.toDataURL('image/avif').startsWith('data:image/avif'))
        return 'avif'
    if (canvas.toDataURL('image/webp').startsWith('data:image/webp'))
        return 'webp'
    return null
}

function getPreferredVideoFormat() {
    const video = document.createElement('video')
    if (video.canPlayType('video/webm; codecs="vp8, vorbis"')) return 'webm'
    if (video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')) return 'mp4'
    return null
}
