import { nextTick } from "vue"

export async function scrollTop({ behavior, to, path }) {
    let scrollBehavior = behavior
    if (to && path && to === path) scrollBehavior = 'smooth'
    
    // await nextTick()
    // await nextTick()
    console.log(scrollBehavior);
    window.scrollTo({ top: 0, behavior: scrollBehavior })
}

export function scrollToElement(id) {
    const nav = document.getElementById('navbar')
    const navHeight = nav.clientHeight

    const el = document.getElementById(id)
    const elTop = el?.getBoundingClientRect().top || 0
    
    const filter = document.getElementById('filter-controls')
    const filterHeight = filter?.clientHeight || 0

    const scrollY = elTop ? window.scrollY : 0
    
    const top = elTop + scrollY - navHeight - filterHeight

    window.scrollTo({ top, behavior: 'smooth' })
}