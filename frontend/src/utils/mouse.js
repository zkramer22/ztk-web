import { ref, onMounted, onUnmounted } from 'vue'

export function useCustomMouse() {
    const cursor = ref(null)
    const cursorX = ref(0)
    const cursorY = ref(0)
    const scrollY = ref(0)
    const scrollDir = ref('')
    
    function updateMouse() {
        if (!cursor.value) return
        cursor.value.style.left = `${cursorX.value}px`
        cursor.value.style.top = `${cursorY.value}px`
    }

    function mouseDown() {
        cursor.value?.classList.add('mousedown')
    }

    function mouseUp() {
        cursor.value?.classList.remove('mousedown')
    }

    function mouseMove(e) {
        cursorX.value = e.clientX
        cursorY.value = e.clientY + scrollY.value
        updateMouse()
    }

    function mouseScroll() {
        const scroll = document.documentElement.scrollTop
        if (scroll > scrollY.value && scrollDir.value !== 'down') scrollDir.value = 'down'
        else if (scroll < scrollY.value && scrollDir.value !== 'up') scrollDir.value = 'up'

        if (scrollDir.value === 'down') cursorY.value += scroll - scrollY.value
        else if (scrollDir.value === 'up') cursorY.value -= scrollY.value - scroll

        updateMouse()
        scrollY.value = Math.max(0, scroll)
    }

    function enableMouseEvents() {
        document.onmousemove = mouseMove
        document.onscroll = mouseScroll
        document.onmousedown = mouseDown
        document.onmouseup = mouseUp
    }

    function disableMouseEvents() {
        document.onmousemove = null
        document.onscroll = null
        document.onmousedown = null
        document.onmouseup = null
    }

    
    onMounted(() => {
        enableMouseEvents()
    })

    onUnmounted(() => {
        disableMouseEvents()
    })    

    return {
        cursor,
        cursorX,
        cursorY,
        scrollY,
        scrollDir,
    }
}