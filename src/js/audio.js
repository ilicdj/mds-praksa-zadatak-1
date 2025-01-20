import mdsAudio from '../audio/mds.mp3'

const audioBtn = document.getElementById('audio-btn')
const audio = new Audio(mdsAudio)
audio.loop = true

let isPlaying = false
audioBtn.addEventListener('click', () => {
  isPlaying = !isPlaying
  if (isPlaying) {
    audio.currentTime = 0
    audio.play()
    audioBtn.classList.add('playing')
  } else {
    audio.pause()
    audioBtn.classList.remove('playing')
  }
})
