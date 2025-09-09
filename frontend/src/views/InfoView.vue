<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

// ----------- links ----------- //
const contactLinks = [
    {
        href: "https://calendar.app.google/FUNjeUv5JkLDPYES8",
        target: "_blank",
        color: "color-1-vibrant",
        text: 'calendar',
    },
    {
        href: "tel:2677603054",
        target: "_self",
        color: "color-1-vibrant",
        text: 'phone',
    },
    {
        href: "mailto:zkramer22@gmail.com",
        target: "_blank",
        color: "color-1-vibrant",
        text: 'email',
    },
    {
        href: "sms:+12677603054",
        target: "_self",
        color: "color-1-vibrant",
        text: 'text',
    }
]

const webLinks = [
    {
        href: "https://github.com/zkramer22",
        target: "_blank",
        color: "color-1-vibrant",
        text: 'github',
    },
    {
        href: "https://linkedin.com/in/zkramer22",
        target: "_blank",
        color: "color-1-vibrant",
        text: 'linkedin',
    }
]

// ----------- form ----------- //
const formData = reactive({
    name: '',
    email: '',
    subject: '',
    message: ''
})
const validData = reactive({
    name: null,
    email: null,
    message: null,
})

const activeField = ref(null)
const isSending = ref(false)
const success = ref(null)
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const activeClass = (field) => activeField.value === field || formData[field] ? 'active' : ''
const invalidClass = (field) => validData[field] === false ? 'invalid' : ''
const buttonDisabledClass = computed(() => (!formValid.value || isSending.value) ? 'disabled' : '')
const formValid = computed(() => validData.name && validData.email && validData.message)

async function sendMessage() {
    isSending.value = true
    try {
        await axios.post("https://ztk-web-nodemailer.onrender.com/api/send-message", formData)
        success.value = true
        Object.assign(formData, { name: "", email: "", subject: "", message: "" })
        Object.assign(validData, { name: null, email: null, message: null })
    } catch (error) {
        console.error("Error sending message:", error)
        success.value = false
    } finally {
        isSending.value = false
    }
}
function setActiveField(field) {
    activeField.value = field
}
function clearActiveField(e, options = { immediate: false }) {
    const { immediate } = options
    if (immediate) {
        activeField.value = null
        return
    }
    else {
        setTimeout(() => {
            if (!['form-input', 'form-field'].includes(e.target.classList[0])) activeField.value = null
        }, 10)
    }
}
function checkEmail() {
    validData.email = emailPattern.test(formData.email) ? true : false
}
function checkField(field) {
    validData[field] = formData[field] ? true : false
}
function formKeyHandler(e) {
    const { code } = e
    if (code === 'Escape') {
        activeField.value = null
        document.activeElement.blur()
    }
}

// ----------- map --------- //
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID
const [lat, lng] = [32.71380803208144, -117.15986127792893]
const coordinates = { lat, lng }
const mapParent = ref(null)
const mapEl = ref(null)
const mapLoaded = ref(false)

function gradualZoom(map, targetZoom, duration) {
    const startZoom = map.getZoom()
    const zoomDiff = targetZoom - startZoom
    const steps = 60
    const stepTime = duration / steps
    let currentStep = 0

    const easeInOut = (t) => {
        return t < 0.5
            ? 2 * t * t
            : -1 + (4 - 2 * t) * t
    }

    const zoomAnimation = setInterval(() => {
        currentStep++
        const progress = currentStep / steps
        const easedProgress = easeInOut(progress)
        const zoomLevel = startZoom + (zoomDiff * easedProgress)

        map.setZoom(zoomLevel)

        if (currentStep >= steps) {
            clearInterval(zoomAnimation)
            map.setZoom(targetZoom) // Snap exactly to final zoom
        }
    }, stepTime)
}

let loader
onMounted(async () => {
    document.addEventListener('click', clearActiveField)
    document.addEventListener('keydown', formKeyHandler)


    const module = await import('@googlemaps/js-api-loader')
    loader = new module.Loader({
        apiKey,
        version: 'weekly',
    })

    const { Map } = await loader.importLibrary('maps')
    // const { AdvancedMarkerElement } = await loader.importLibrary('marker')
    const map = new Map(document.getElementById('map'), {
        mapId,
        center: coordinates,
        zoom: 12,
        disableDefaultUI: true,
        zoomControl: true,
        // scrollwheel: true
    })

    // new AdvancedMarkerElement({
    //     map,
    //     position: coordinates,
    //     title: 'Adept Group Headquarters',
    //     content: createCustomMarkerContent()
    // })

    let tilesLoaded = false
    map.addListener('tilesloaded', () => {
        if (!tilesLoaded) {
            mapLoaded.value = true
            tilesLoaded = true
            gradualZoom(map, 13.7, 1500)

            // setTimeout(() => {
            //     document.getElementById('adept-marker-wrapper').classList.add('fade-slide-from-top')
            // }, 600)
        }
    })
})

onUnmounted(() => {
    document.removeEventListener("click", clearActiveField)
    document.removeEventListener('keydown', formKeyHandler)
})

</script>

<template>    
    <section class="container mb-[100px]">
        <div class="message-notif rounded text-lg" v-if="success === true">🤙 Message sent successfully!</div>
        <div class="message-notif rounded text-lg" v-if="success === false">😭 Failed to send message. Please try again.</div>

        <h2 class="font-accent font-bold fade-slide-from-left my-4">[info]</h2>
        
        <div id="blurb" class="bg-darkest card-item border card-item rounded p-4 fade-slide-from-bottom mb-4 inline-block text-lg">
            <p>
                I live in San Diego, but my network comprises people from all over the world.
            </p>
            
            <p>
                Feel free to reach out about work. 💻
            </p>
    
            <p>
                Feel just as free to reach out about <i>not</i> work. 😎
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start fade-slide-from-bottom">
            <div class="bg-darkest p-4 card-item border map-container">
                <div ref="mapParent" class="map-container rounded" :class="{ 'loading-shimmer': !mapLoaded }">
                    <div ref="mapEl" id="map" class="map" :class="{ 'loaded': mapLoaded }"></div>
                </div> 
            </div>

            <div id="links">
                <div class="bg-darkest card-item border rounded p-4 grid grid-cols-2 gap-4 mb-4">
                    <h4 class="font-accent mb-4 col-span-2">getContactLinks()</h4>
                    <a v-for="({ href, target, displayText, text }) of contactLinks" :key="href" :href :target 
                        class="info-link grad-complex-vibrant rounded hover-grow text-center font-accent grid items-center"
                    >
                        <div class="img-container p-3">
                            <img :src="`/icon/${text}.svg`" :alt="`contact via ${text}`">
                        </div>
                        <div class="text-lg sm:text-xl md:text-lg lg:text-xl">
                            {{ displayText || text }}
                        </div>
                    </a>
                </div>
                <div class="bg-darkest card-item border rounded p-4 grid grid-cols-2 gap-4">
                    <h4 class="font-accent mb-4 col-span-2">getWebLinks()</h4>
                        <a v-for="({ href, target, displayText, text }) of webLinks" :key="href" :href :target 
                            class="info-link grad-complex-vibrant rounded hover-grow text-center font-accent grid items-center"
                        >
                            <div class="img-container p-3">
                                <img :src="`/icon/${text}.svg`" :alt="`contact via ${text}`">
                            </div>
                            <div class="text-lg sm:text-xl md:text-lg lg:text-xl">
                                {{ displayText || text }}
                            </div>
                        </a>
                </div>
            </div>
            
            <form @submit.prevent="sendMessage" 
                class="contact-form grid bg-darkest card-item border rounded p-4" 
                novalidate
            >
                <h4 class="font-accent mb-8">sendMessage()</h4>
                
                <div class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-x-4">
                    
                    <div class="mb-8" :class="`form-field ${activeClass('name')}`">
                        <label class="form-label">Name</label>
                        <input :class="`form-input ${invalidClass('name')}`"
                                name="name"
                                autocomplete="off"
                                tabindex="1" type="text"  
                                v-model="formData.name" 
                                placeholder="Name"
                                @focus="setActiveField('name')" 
                                @blur="clearActiveField(e, { immediate: true })"
                                @input="checkField('name')"
                        />
                    </div>
                    <div class="mb-8" :class="`form-field ${activeClass('email')} ${invalidClass('email')}`">
                        <label class="form-label">Email</label>
                        <input :class="`form-input ${invalidClass('email')}`"
                                name="email"
                                autocomplete="off"
                                tabindex="2" type="email"  
                                v-model="formData.email" 
                                placeholder="Email"
                                @focus="setActiveField('email')" 
                                @blur="clearActiveField(e, { immediate: true })"
                                @change="checkEmail"
                        />
                    </div>
                </div>

                <div class="mb-8" :class="`form-field ${activeClass('subject')}`">                
                    <label class="form-label">Subject</label>
                    <input class="form-input"
                            name="subject"
                            autocomplete="off"
                            tabindex="3" type="text" 
                            v-model="formData.subject" 
                            placeholder="Subject"
                            @focus="setActiveField('subject')"
                            @blur="clearActiveField(e, { immediate: true })"
                    />
                </div>
                <div class="mb-4" :class="`form-field ${activeClass('message')}`">
                    <label class="form-label">Message</label>
                    <textarea :class="`form-input ${invalidClass('message')}`"
                            name="message"
                            autocomplete="off"
                            tabindex="4"  
                            v-model="formData.message" 
                            placeholder="Message"
                            @focus="setActiveField('message')"
                            @blur="clearActiveField(e, { immediate: true })"
                            @input="checkField('message')"
                    >
                    </textarea>
                </div>

                <button :tabindex="formValid ? '5' : '-1'" :class="buttonDisabledClass"
                    class="hover-grow grad-complex-vibrant font-accent"
                >
                    {{ isSending ? "Sending..." : "send it" }}
                </button>

            </form> 
        </div>

    </section>
</template>

<style lang="scss">
#map {
    opacity: 0;
    transition: opacity .3s linear;
    &.loaded {
        opacity: 1;
    }
}
#blurb-info {
    p:last-of-type {
        margin-bottom: 0;
    }
}
.map-container {
    width: 100%;
    height: 100%;
    min-height: 30svh;
    max-height: 600px;
    overflow: hidden;
    flex-grow: 1;
}
.gmnoprint, .gm-style-cc {
    z-index: -1 !important;
}
.map {
    width: 100%;
    height: 100%;
}
input, textarea {
    font-size: 1.2rem;
}
label {
    font-size: 1rem;
}

form {
    p {
        margin-bottom: 45px;
    }
    input, textarea, button {
        // cursor: none !important;
        outline: none;
        border: none;
        border-radius: var(--button-radius);
    }
    .form-field {
        position: relative;
        .form-label {
            pointer-events: none;
            position: absolute;
            transform: translateY(0);
            left: .5rem;
            z-index: 1;
            display: flex;
            align-items: center;
            transition: transform .1s ease;
        }
        input {
            display: flex;
            align-items: center;
            position: relative;
            background-color: var(--color-darkest);
            border: 2px solid var(--color-darker);
            z-index: 1;
            width: 100%;
            height: 100%;
            padding: .5rem .7rem;
            transition: all .1s ease;
            &::placeholder {
                color: inherit;
                filter: brightness(.7);
            }
            &:focus {
                border-color: #fff;
            }
            &.invalid {
                border-color: rgb(255, 87, 87);
            }
        }
        textarea {
            display: block;
            position: relative;
            background-color: var(--color-darkest);
            border: 2px solid var(--color-darker);
            z-index: 1;
            width: 100%;
            height: 100%;
            padding: .5rem .7rem;
            &::placeholder {
                color: inherit;
                filter: brightness(.7);
            }
            &:focus {
                border-color: #fff;
            }
            &.invalid {
                border-color: rgb(255, 87, 87);
            }
        }

        &.active {
            .form-label {
                transform: translateY(-1.5rem);
            }
        }
    }
    button {
        width: 100%;
        margin: 0 auto;
        padding: 10px;
        transition: all .1s ease;
        &.disabled {
            filter: grayscale(.9);
            transition: none;
            pointer-events: none;
        }
        &:focus {
            border-color: #fff;
        }
    }
}

.message-notif {
    position: fixed;
    z-index: 1000;
    left: 1rem;
    right: 1rem;
    top: 1rem;
    width: fit-content;
    max-width: 100%;
    margin: 0 auto;
    padding: 20px;
    
    opacity: 0;
    // box-shadow: 0px 3px 30px 10px var(--color-black);
    
    background-color: var(--color-darkest);
    border: 2px solid var(--color-black);
    
    background-color: var(--color-1-deep);
    border: 2px solid white;
    
    animation: 
        fadePartial 1s ease forwards, 
        slideFromTop .7s ease, 
        fadeout .7s ease 3s forwards,
        slideUp 1s ease 3s forwards
    ;
    pointer-events: none;
}
</style>