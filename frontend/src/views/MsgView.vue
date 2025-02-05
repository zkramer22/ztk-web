<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

const formData = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
})

const activeField = ref(null)
const isSending = ref(false)
const success = ref(null)

async function sendMessage() {
    isSending.value = true
    
    try {
        await axios.post("https://ztk-web-nodemailer.onrender.com/api/send-message", formData.value)
        success.value = true
        formData.value = { name: "", email: "", subject: "", message: "" }
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

function formKeyHandler(e) {
    const { code } = e
    if (code === 'Escape') activeField.value = null
}


const activeClass = (field) => activeField.value === field || formData.value[field] ? 'active' : ''

onMounted(() => {
    document.addEventListener('click', clearActiveField)
    window.addEventListener('keydown', formKeyHandler)
})

onUnmounted(() => {
    document.removeEventListener("click", clearActiveField)
    window.removeEventListener('keydown', formKeyHandler)
})

</script>

<template>    
    <div class="container">
        <h2 class="text-center">:: message ::</h2>

        <form @submit.prevent="sendMessage" class="contact-form">
            <div :class="`form-field ${activeClass('name')}`">
                <div class="form-label">Name</div>
                <input class="form-input"
                        tabindex="1" type="text" required 
                        v-model="formData.name" 
                        @focus="setActiveField('name')" 
                        @blur="clearActiveField(e, { immediate: true })"
                />
            </div>
            <div :class="`form-field ${activeClass('email')}`">
                <div class="form-label">Email</div>
                <input class="form-input"
                        tabindex="2" type="email" required 
                        v-model="formData.email" 
                        @focus="setActiveField('email')" 
                        @blur="clearActiveField(e, { immediate: true })"
                />
            </div>
            <div :class="`form-field ${activeClass('subject')}`">                
                <div class="form-label">Subject</div>
                <input class="form-input"
                        tabindex="3" type="text" 
                        v-model="formData.subject" 
                        @focus="setActiveField('subject')"
                        @blur="clearActiveField(e, { immediate: true })"
                />
            </div>
            <div :class="`form-field ${activeClass('message')}`">
                <div class="form-label">Message</div>
                <textarea class="form-input"
                        tabindex="4" required 
                        v-model="formData.message" 
                        @focus="setActiveField('message')"
                        @blur="clearActiveField(e, { immediate: true })"
                >
                </textarea>
            </div>
            <button tabindex="5" :disabled="isSending">{{ isSending ? "Sending..." : "Send Message" }}</button>
        </form>
        <p v-if="success === true">✅ Message sent successfully!</p>
        <p v-if="success === false">❌ Failed to send message.</p>
    </div>
</template>

<style lang="scss">
@import '@/assets/variables.scss'; 

form {
    background-color: $primary-black;
    padding: 30px;
    border-radius: 15px;
    input, textarea, button {
        cursor: none;
        background: none;
        border: none;
        outline: none;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        resize: none;
    }
    .form-field {
        margin: 30px auto;
        padding: 10px 15px;
        border: 2px solid $primary-gray;
        border-radius: 10px;
        position: relative;
        transition: border-color .3s ease;
        .form-label {
            pointer-events: none;
            position: absolute;
            top: 0px;
            bottom: 0px;
            transition: font-size .3s ease, top .3s ease;
            font-size: inherit;
            display: flex;
            align-items: center;
            font-size: 1.3rem;
        }
        &.active {
            border-color: #fff;
            .form-label {
                font-size: .8rem;
                top: calc(-100% - 25px);
            }
        }
    }
    button {
        background-color: $primary-color-audio;
        border-radius: 7px;
        padding: 10px;
    }
    input {
        display: flex;
        align-items: center;
        font-size: 1.3rem;
        width: 100%;
        height: 100%;
    }
    textarea {
        width: 100%;
        height: 100%;
        font-size: 1.3rem;
    }
}
</style>