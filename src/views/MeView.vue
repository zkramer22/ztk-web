<script setup>
    import headshot1 from '@/assets/img/headshot-1.jpeg'
</script>

<template>
    <div class="grid img-text-grid">
        <div>
            <p>
                I've been obsessed with computers since I first sat in front of my grandpa Tom's Apple Power Mac 6200 at 5 years old. 
                I grew up in the heart of the dot-com bubble, and I remember the AOL dial up tone. 
                I've jailbroken most of my gaming consoles and phones, and my Macbook has a Windows partition. 
                I have a healthy relationship with my screens, and I love the sound of a soft, clacky, mechanical keyboard.
            </p>
            <p>
                I've been building things for the web since 2018. While I've touched just about every part of the app deployment process, 
                frontend design & development is where I bring the most to the table. Creativity is my strong suit, and I love finding ways 
                to make old patterns appear fresh & new.
            </p>
            <p>
                Outside of tech, I love being active outdoors – skiing, snowboarding, and skating are my favorite forms of movement. 
                I'm a musician as well; I consider music my sincerest passion of all – especially the intersection between music & technology.
                Also, I love mahjong. Like, maybe a little too much.
            </p>
        </div>
        <div class="img-container headshot justify-self-end">
            <img :src="headshot1" alt="photo of zach kramer"/>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .img-text-grid {
        gap: 0 50px;
    }
    p {
        text-align: right;
    }
    .headshot {
        justify-self: start;
    }
</style>