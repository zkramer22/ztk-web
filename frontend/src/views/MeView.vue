<script setup>
const headshotPath = 'https://ztk-web.s3.us-west-1.amazonaws.com/general/headshot-1.jpeg'
</script>

<template>
    <div class="container">
        <h2 class="text-center">:: about me ::</h2>
        <div class="img-text-grid">
            <div class="img-container headshot">
                <img :src="headshotPath" alt="photo of zach kramer"/>
            </div>
            <div>
                <p>
                    I've been fascinated with computers ever since I first sat in front of my grandpa Tom's Apple Power Mac 6200 at the age of five. 
                    I grew up in the heart of the dot-com bubble, and I remember the AOL dial up tone.
                    I've jailbroken most of my gaming consoles & old phones, and my Macbook always has a Windows partition.
                    I have a healthy relationship with my screens, and when I do occasionally browse social media...my algorithms are <i>tuned</i>. No junk.
                </p>
                <p>
                    I've been building things for the web since 2018. While I've touched just about every part of the app deployment process, 
                    the frontend is where I bring the most to the table through thoughtful design and development. Creativity is my strong suit, and I love finding ways 
                    to make old patterns appear fresh & new.
                </p>
                <p>
                    Outside of tech, I love being active outdoors. Skiing, snowboarding, and skating are my favorite forms of movement. 
                    I'm a musician as well; I consider music my sincerest passion of all – especially the intersection between music & technology.
                </p>
            </div>
        </div>
        <div class="spacer"></div>
    </div>
</template>


<style lang="scss" scoped>
    .container {
        max-width: 400px;
        align-content: center;
    }
    .img-text-grid {
        gap: 10px;
        .img-container {
            margin: 0 auto;
            justify-self: center;
            max-width: 200px;
            margin-bottom: 10px;
        }
    }

    @media screen and (min-width: 768px) {
        .container {
            grid-row: 1 / 4;
            max-width: 1000px;
        }
        .img-text-grid {
            display: flex;
            gap: 0 25px;
            align-items: center;
            .img-container {
                justify-self: end;
                align-self: center;
                max-width: 350px;
            }
        }
    }

    @media screen and (min-width: 1024px) {
        .container {
            max-width: 1024px;
        }
        .img-text-grid {
            display: flex;
            gap: 0 25px;
            align-items: center;
            .img-container {
                justify-self: end;
                align-self: center;
                max-width: 450px;
                max-height: 450px;
            }
        }
    }

    @media screen and (min-width: 1440px) {
        .container {
            max-width: 1440px;
        }
    }
</style>