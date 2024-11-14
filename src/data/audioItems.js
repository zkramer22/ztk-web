const S3_PATH = 'https://studio-ztk-audio.s3.us-west-1.amazonaws.com'

const audio = {
    voiceover: [
        ['Animation – Humpty Dumpty'],
        ['Animation – Doomsday Prepper'],
        ['Watermelon Lemonade'],
        ['Documentary – Money'],
        ['Commercial – Paul Davis Restoration'],
        ['Ice Cold Young Man'],
    ],
    music: [
        ['Meditate', 'yokram', 'offerings [vol 1]', 'art-offerings-vol-1'],
        ['Cruise', 'yokram', 'offerings [vol 1]', 'art-offerings-vol-1'],
        ['Mahogany', 'yokram', 'offerings [vol 1]', 'art-offerings-vol-1'],
        ['At Night', 'yokram', 'offerings [vol 1]', 'art-offerings-vol-1'],
        ['Press Start', 'yokram', 'offerings [vol 1]', 'art-offerings-vol-1'],
        ['Slow Down', 'yokram', 'offerings [vol 1]', 'art-offerings-vol-1'],
    ],
}

function getAudioObj(obj) {
    const audioObj = {}
    for (const [type, arr] of Object.entries(obj)) {
        for (let i in arr) {
            const [name, artist, album, art] = arr[i]
            const filename = name.replaceAll(' ', '+').replaceAll('–', '%E2%80%93')
            audioObj[`${type}-${i}`] = {
                name,
                artist,
                album,
                type,
                art: `${S3_PATH}/${art}`,
                url: `${S3_PATH}/${filename}`, 
                timestamps: [
                    { time: 0, name: 'TS 1' },
                    { time: 20, name: 'TS 2' },
                    { time: 30, name: 'TS 3' },
                ],
                loaded: false,
                playing: false, 
                imgLoaded: false,
            }
        }
    }
    return audioObj
}

export const audioObj = getAudioObj(audio)