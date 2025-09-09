import { ref, onMounted, onUnmounted } from 'vue'

export function useIsScrolled() {
    const isScrolled = ref(false)
    const scrollDown = ref(false)
    let lastScrollY = 0
    let ticking = false
    
    function updateScroll() {
        const currentY = window.scrollY

        isScrolled.value = currentY > 0

        if (currentY > lastScrollY) {
            scrollDown.value = true
        } else if (currentY < lastScrollY) {
            scrollDown.value = false
        }

        lastScrollY = currentY <= 0 ? 0 : currentY
        ticking = false
    }

    function handleScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateScroll)
            ticking = true
        }
    }

    onMounted(() => {
        lastScrollY = window.scrollY
        document.addEventListener('scroll', handleScroll, { passive: true })
    })

    onUnmounted(() => {
        document.removeEventListener('scroll', handleScroll)
    })

    return { isScrolled, scrollDown }
}