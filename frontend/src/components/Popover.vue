<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    placement: { type: String, default: 'bottom-end' }, // 'bottom-start' | 'bottom-center' | 'bottom-end'
    offset: { type: Number, default: 8 },
    closeOnMenuClick: { type: Boolean, default: true }
})

const open = ref(false)
const root = ref(null)
const triggerWrap = ref(null)
const panel = ref(null)

const uid = Math.random().toString(36).slice(2, 8)
const triggerId = `popover-trigger-${uid}`
const menuId = `popover-menu-${uid}`

const triggerAttrs = computed(() => ({
    id: triggerId,
    'aria-haspopup': 'menu',
    'aria-expanded': String(open.value),
    'aria-controls': menuId,
    tabindex: 0
}))

const placementClass = computed(() => {
    switch (props.placement) {
        case 'bottom-start': return 'bottom-start'
        case 'bottom-center': return 'bottom-center'
        case 'bottom-end': return 'bottom-end'
        default: return 'bottom-end'
    }
})

const panelStyle = computed(() => ({
    '--offset': `${props.offset}px`
}))

const getFocusable = el =>
    el
        ? Array.from(
            el.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          ).filter(node => !node.hasAttribute('disabled') && !node.getAttribute('aria-hidden'))
        : []

const focusFirstMenuItem = () => {
    const items = getFocusable(panel.value)
    items[0]?.focus()
}

const focusTrigger = () => {
    // Prefer an actual focusable inside the trigger slot if present
    const firstFocusable = getFocusable(triggerWrap.value)[0]
    if (firstFocusable) firstFocusable.focus()
    else triggerWrap.value?.focus?.()
}

const openMenu = async () => {
    if (open.value) return
    open.value = true
    await nextTick()
    focusFirstMenuItem()
    addGlobalListeners()
}

const close = () => {
    if (!open.value) return
    open.value = false
    removeGlobalListeners()
    nextTick(() => focusTrigger())
}

const toggle = () => (open.value ? close() : openMenu())

const onTriggerKeydown = e => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar' || e.key === 'ArrowDown') {
        e.preventDefault()
        openMenu()
    } else if (e.key === 'Escape') {
        e.preventDefault()
        close()
    }
}

const onMenuKeydown = e => {
    if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
    }
    // Simple arrow roving focus within the panel
    const items = getFocusable(panel.value)
    if (!items.length) return
    const idx = items.indexOf(document.activeElement)
    if (e.key === 'ArrowDown') {
        e.preventDefault()
        const next = items[(idx + 1) % items.length]
        next?.focus()
    } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prev = items[(idx - 1 + items.length) % items.length]
        prev?.focus()
    } else if (e.key === 'Tab') {
        // Allow tab to move out naturally, but close for cleanliness
        close()
    }
}

const onMenuClick = () => {
    if (props.closeOnMenuClick) close()
}

const handleOutside = e => {
    if (!open.value) return
    if (!root.value?.contains(e.target)) close()
}

const handleGlobalKeydown = e => {
    if (e.key === 'Escape') {
        e.preventDefault()
        close()
    }
}

const addGlobalListeners = () => {
    document.addEventListener('mousedown', handleOutside, true)
    document.addEventListener('touchstart', handleOutside, true)
    document.addEventListener('keydown', handleGlobalKeydown)
}

const removeGlobalListeners = () => {
    document.removeEventListener('mousedown', handleOutside, true)
    document.removeEventListener('touchstart', handleOutside, true)
    document.removeEventListener('keydown', handleGlobalKeydown)
}

onMounted(() => {
    // no-op
})

onBeforeUnmount(() => removeGlobalListeners())

// Expose methods if you want programmatic control
defineExpose({ openMenu, close, toggle, isOpen: open })
</script>

<template>
    <div ref="root" class="popover" :data-open="open ? '' : null">
        <span ref="triggerWrap" class="popover-trigger" @keydown="onTriggerKeydown">
            <slot
                name="trigger"
                :attrs="triggerAttrs"
                :toggle="toggle"
                :open="open"
            />
        </span>

        <!-- Panel -->
        <transition name="fade-scale">
            <div
                v-show="open"
                ref="panel"
                class="popover-panel"
                :class="placementClass"
                :style="panelStyle"
                role="menu"
                :id="menuId"
                :aria-labelledby="triggerId"
                @keydown="onMenuKeydown"
                @click="onMenuClick"
            >
                <slot name="menu" :close="close" :open="open" />
            </div>
        </transition>
    </div>
</template>

<style scoped>
.popover {
    position: relative;
    display: inline-block;
}

/* Trigger wrapper doesn’t style your content; you own the inner element */
.popover-trigger {
    display: inline-flex;
}

/* Panel positioning */
.popover-panel {
    position: absolute;
    top: calc(100% + var(--offset, 8px));
    min-width: 200px;
    background: var(--popover-bg, #0b1220);
    color: var(--popover-fg, #e5e7eb);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 0.6rem;
    box-shadow: 0 12px 32px rgba(0,0,0,.25);
    padding: 6px;
    z-index: 1000;
}

/* Horizontal alignment */
.bottom-start { left: 0 }
.bottom-center { left: 50%; transform: translateX(-50%) }
.bottom-end { right: 0 }

/* Tiny entrance animation */
.fade-scale-enter-active, .fade-scale-leave-active {
    transition: opacity .12s ease, transform .12s ease
}
.fade-scale-enter-from, .fade-scale-leave-to {
    opacity: 0;
    transform: translateY(-4px) scale(.98)
}
</style>
