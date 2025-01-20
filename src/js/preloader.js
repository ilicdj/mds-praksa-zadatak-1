import gsap from 'gsap'

const preloader = document.getElementById('preloader')
const preloaderProgress = document.getElementById('preloader-progress')

gsap.set(preloaderProgress, {
  width: '0%',
})

gsap.to(preloaderProgress, {
  width: '80%',
  duration: 4,
  ease: 'power2.inOut',
  onComplete: () => {
    gsap.to(preloader, {
      opacity: 0,
      display: 'none',
      duration: 1,
      ease: 'power4.inOut',
    })
  },
})
