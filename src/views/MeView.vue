<script setup>
const headshotPath = 'https://ztk-web.s3.us-west-1.amazonaws.com/general/headshot-1.jpeg'
</script>

<template>
    <div class="container">
        <div class="img-text-grid">
            <div class="img-container headshot">
                <img :src="headshotPath" alt="photo of zach kramer"/>
            </div>
            <div>
                <p>
                    I've been obsessed with computers since I first sat in front of my grandpa Tom's Apple Power Mac 6200 at 5 years old. 
                    I grew up in the heart of the dot-com bubble, and I remember the AOL dial up tone. 
                    I've jailbroken most of my gaming consoles and phones, and my Macbook has a Windows partition. 
                    I have a healthy relationship with my screens, and I love the sound of a soft, clacky, mechanical keyboard.
                </p>
                <p>
                    I've been building things for the web since 2018. While I've touched just about every part of the app deployment process, 
                    the frontend is where I bring the most to the table through design and development. Creativity is my strong suit, and I love finding ways 
                    to make old patterns appear fresh & new.
                </p>
                <p>
                    Outside of tech, I love being active outdoors – skiing, snowboarding, and skating are my favorite forms of movement. 
                    I'm a musician as well; I consider music my sincerest passion of all – especially the intersection between music & technology.
                    Also, I love mahjong. Like, maybe a little too much.
                </p>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .container {
        max-width: 400px;
    }
    .img-text-grid {
        gap: 10px;
        .img-container {
            justify-self: center;
            max-width: 200px;
            margin-bottom: 10px;
        }
    }
    p {
        font-size: 14px;
        // text-indent: 3rem;
    }

    @media screen and (min-width: 768px) {
        .container {
            max-width: 1000px;
        }
        .img-text-grid {
            display: flex;
            margin-top: 25px;
            gap: 0 25px;
            align-self: center;
            .img-container {
                justify-self: end;
                align-self: start;
                max-width: 350px;
            }
        }
        p {
            font-size: 15px;
        }
    }
</style>