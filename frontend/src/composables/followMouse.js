import { ref, onMounted, onUnmounted, nextTick } from 'vue'

export function useFollowMouse(opts = {}) {
    const {
        ease = 0.15,
        fps = 30,
        idleAfter = 500,
        minDelta = 0.1,
        enabled = true
    } = opts

    const interactive = ref(null)
    const curX = ref(0)
    const curY = ref(0)
    const tgX = ref(0)
    const tgY = ref(0)

    let rafId = 0
    let lastTs = 0
    let idleTimer = null
    let running = false
    let halfDot = 0

    function measure() {
        if (!interactive.value) return
        const w = parseFloat(getComputedStyle(interactive.value).width) || 0
        halfDot = w / 2
    }

    function step(ts) {
        if (!interactive.value) {
            rafId = requestAnimationFrame(step)
            return
        }

        if (ts - lastTs < 1000 / fps) {
            rafId = requestAnimationFrame(step)
            return
        }
        lastTs = ts

        curX.value += (tgX.value - curX.value) * ease
        curY.value += (tgY.value - curY.value) * ease

        // Inline transform avoids the CSS-var + filter edge case
        const x = (curX.value).toFixed(1)
        const y = (curY.value).toFixed(1)
        interactive.value.style.transform = `translate3d(${x}px, ${y}px, 0)`

        const dx = Math.abs(tgX.value - curX.value)
        const dy = Math.abs(tgY.value - curY.value)
        if (dx < minDelta && dy < minDelta) {
            stop()
        } else {
            rafId = requestAnimationFrame(step)
        }
    }

    function start() {
        if (running) return
        running = true
        rafId = requestAnimationFrame(step)
    }

    function stop() {
        if (!running) return
        running = false
        cancelAnimationFrame(rafId)
    }

    function onMove(e) {
        tgX.value = e.clientX
        tgY.value = e.clientY
        if (!running) start()
        if (idleTimer) clearTimeout(idleTimer)
        idleTimer = setTimeout(stop, idleAfter)
    }

    async function load() {
        if (!enabled) return
        tgX.value = window.innerWidth / 2
        tgY.value = window.innerHeight / 2

        window.addEventListener('pointermove', onMove, { passive: true })

        await nextTick()
        measure()
        start()

        window.addEventListener('resize', measure)
    }

    function unload() {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('resize', measure)
        stop()
        if (idleTimer) clearTimeout(idleTimer)
    }

    onMounted(() => load())

    onUnmounted(() => unload())

    return { curX, curY, tgX, tgY, interactive, load, unload, start, stop }
}
