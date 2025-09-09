<script setup>
const props = defineProps({
    size: { type: [Number, String], default: 8 },         // px
    gap: { type: [Number, String], default: 8 },           // px between dots
    color: { type: String, default: '#fff' },
    duration: { type: [Number, String], default: 1500 },   // ms for full cycle
    gapMs: { type: [Number, String], default: 150 },        // ms between dot starts
    bounceHeight: { type: [Number, String], default: 10 }, // px vertical bounce
})

const cssVars = {
    '--dot-size': typeof props.size === 'number' ? `${props.size}px` : String(props.size),
    '--dot-gap': typeof props.gap === 'number' ? `${props.gap}px` : String(props.gap),
    '--dot-color': props.color,
    '--dot-dur': typeof props.duration === 'number' ? `${props.duration}ms` : String(props.duration),
    '--gap-ms': typeof props.gapMs === 'number' ? `${props.gapMs}ms` : String(props.gapMs),
    '--dot-y': typeof props.bounceHeight === 'number' ? `${props.bounceHeight}px` : String(props.bounceHeight),
}
</script>

<template>
    <div id="loading-dots-container" class="flex items-center">
        <div class="text-3xl pr-2 pb-3 font-accent">loading</div>
        <div class="dots" :style="cssVars" role="status" aria-live="polite" aria-label="Loading">
            <span class="dot" />
            <span class="dot" />
            <span class="dot" />
        </div>
    </div>
</template>

<style scoped>
#loading-dots-container {
    opacity: 0;
    animation: fadein 1s linear forwards;
    animation-delay: 1s;
}

.dots {
    display: inline-flex;
    align-items: flex-end;
    gap: var(--dot-gap);
}

/* dots */
.dot {
    width: var(--dot-size);
    height: var(--dot-size);
    border-radius: 50%;
    background: var(--dot-color);
    animation: dot-bounce var(--dot-dur) ease infinite;
    will-change: transform;
    transform: translateY(0);
}

/* rapid offsets: 0ms, +50ms, +100ms by default */
.dot:nth-child(2) { animation-delay: var(--gap-ms); }
.dot:nth-child(3) { animation-delay: calc(var(--gap-ms) * 2); }

/* super-quick bounce (about 120ms at 1.5s cycle) then idle */
@keyframes dot-bounce {
    0%   { transform: translateY(0); }
    6%   { transform: translateY(calc(var(--dot-y) * -1)); }
    25%  { transform: translateY(0); }
    100% { transform: translateY(0); }
}

/* reduced motion */
/* @media (prefers-reduced-motion: reduce) {
    .dot { animation: none; }
} */
</style>
