import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const aboutProgress = document.getElementById('about-progress')
const about = document.getElementById('about')

gsap.to(aboutProgress, {
  scrollTrigger: {
    trigger: about,
    start: 'top 50%',
    end: 'bottom 50%',
    scrub: 1,
    onUpdate: (self) => {
      gsap.to(aboutProgress, {
        height: `${self.progress * 100}%`,
        duration: 0.1,
        ease: 'power2.out',
      })
    },
  },
})
