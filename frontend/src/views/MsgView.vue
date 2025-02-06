<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

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

onMounted(() => {
    document.addEventListener('click', clearActiveField)
    document.addEventListener('keydown', formKeyHandler)
})

onUnmounted(() => {
    document.removeEventListener("click", clearActiveField)
    document.removeEventListener('keydown', formKeyHandler)
})

</script>

<template>    
    <div class="container">
        <div class="message-notif" v-if="success === true">✅ Message sent successfully!</div>
        <div class="message-notif" v-if="success === false">❌ Failed to send message.</div>

        <h2 class="text-center">:: message ::</h2>

        <form @submit.prevent="sendMessage" class="contact-form" novalidate>
            <p>Feel free to drop me a line, using my unnecessarily custom-built message form.</p>
        
            <div :class="`form-field ${activeClass('name')}`">
                <div class="form-label">Name</div>
                <input :class="`form-input ${invalidClass('name')}`"
                        tabindex="1" type="text"  
                        v-model="formData.name" 
                        placeholder="Name"
                        @focus="setActiveField('name')" 
                        @blur="clearActiveField(e, { immediate: true })"
                        @input="checkField('name')"
                />
            </div>
            <div :class="`form-field ${activeClass('email')} ${invalidClass('email')}`">
                <div class="form-label">Email</div>
                <input :class="`form-input ${invalidClass('email')}`"
                        tabindex="2" type="email"  
                        v-model="formData.email" 
                        placeholder="Email"
                        @focus="setActiveField('email')" 
                        @blur="clearActiveField(e, { immediate: true })"
                        @change="checkEmail"
                />
            </div>
            <div :class="`form-field ${activeClass('subject')}`">                
                <div class="form-label">Subject</div>
                <input class="form-input"
                        tabindex="3" type="text" 
                        v-model="formData.subject" 
                        placeholder="Subject"
                        @focus="setActiveField('subject')"
                        @blur="clearActiveField(e, { immediate: true })"
                />
            </div>
            <div :class="`form-field ${activeClass('message')}`">
                <div class="form-label">Message</div>
                <textarea :class="`form-input ${invalidClass('message')}`"
                        tabindex="4"  
                        v-model="formData.message" 
                        placeholder="Message"
                        @focus="setActiveField('message')"
                        @blur="clearActiveField(e, { immediate: true })"
                        @input="checkField('message')"
                >
                </textarea>
            </div>
            <button :tabindex="formValid ? '5' : '-1'" :class="buttonDisabledClass">{{ isSending ? "Sending..." : "Send Message" }}</button>
        </form>

        <div class="spacer"></div>
    </div>
</template>

<style lang="scss">
@import '@/assets/variables.scss'; 

form {
    padding: 0 30px 30px;
    border-radius: 15px;
    p {
        margin-bottom: 45px;
    }
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
        position: relative;
        .form-label {
            z-index: 1;
            pointer-events: none;
            position: absolute;
            top: 10px;
            left: 15px;
            transition: top .3s ease;
            font-size: inherit;
            display: flex;
            align-items: center;
            font-size: .8rem;
        }
        input {
            display: flex;
            align-items: center;
            position: relative;
            background-color: $primary-black;
            border: 2px solid $primary-gray;
            border-radius: 10px;
            z-index: 1;
            font-size: 1.3rem;
            width: 100%;
            height: 100%;
            padding: 10px 15px;
            transition: border-color .3s ease;
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
            background-color: $primary-black;
            border: 2px solid $primary-gray;
            border-radius: 10px;
            z-index: 1;
            font-size: 1.3rem;
            width: 100%;
            height: 100%;
            padding: 10px 15px;
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
                top: -20px;
            }
        }
    }
    button {
        background-color: $primary-color-audio;
        border-radius: 7px;
        padding: 10px;
        border: 2px solid $primary-color-audio;
        transition: border-color .3s ease, filter .3s ease;
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
    left: 0;
    right: 0;
    width: fit-content;
    max-width: 100%;
    margin: 0 auto;
    padding: 20px;
    background-color: $primary-gray;
    border-radius: 40px;
    animation: fadein 1s ease, slideFromTop 1s ease, fadeout 1s ease 4s forwards;
    pointer-events: none;
}
</style>