<script setup>
import { ref, reactive } from 'vue'

const formData = ref({
    name: "",
    email: "",
    message: ""
});

const isSending = ref(false);
const success = ref(null);
const formId = 'xpwqrvrw'

const sendMessage = async () => {
    isSending.value = true;
    
    try {
        await axios.post(`https://formspree.io/f/${formId}`, formData.value);
        success.value = true;
        formData.value = { name: "", email: "", message: "" };
    } catch (error) {
        console.error("Error sending message:", error);
        success.value = false;
    } finally {
        isSending.value = false;
    }
}
</script>

<template>    
</template>

<style>
</style>