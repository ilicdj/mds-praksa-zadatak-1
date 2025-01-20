import gsap from 'gsap'

const hamburgerMenu = document.getElementById('menu')
const sidebarModal = document.getElementById('sidebar-modal')
const sidebarLinks = document.querySelectorAll('#links-sidebar li')
const mobileLinks = document.querySelectorAll('.mobile-link')
const desktopLinks = document.querySelectorAll('.desktop-link')

// Initial States
gsap.set(sidebarModal, {
  display: 'none',
  height: 0,
  opacity: 0,
})

gsap.set(sidebarLinks, {
  y: 50,
  opacity: 0,
})

// GSAP Timeline
const t2 = gsap.timeline({
  paused: true,
  onReverseComplete: () => {
    sidebarModal.style.display = 'none'
  },
})

// Add animations to timeline
t2.to(sidebarModal, {
  height: '100vh',
  opacity: 1,
  duration: 0.5,
  ease: 'power2.inOut',
}).to(
  sidebarLinks,
  {
    y: 0,
    opacity: 1,
    duration: 0.4,
    stagger: 0.1,
    ease: 'power2.out',
  },
  '-=0.1'
)

// Function to close menu
const closeMenu = () => {
  if (isOpen) {
    t2.reverse()
    isOpen = false
  }
}

// Handle hamburger menu click events
let isOpen = false
hamburgerMenu.addEventListener('click', () => {
  if (!isOpen) {
    sidebarModal.style.display = 'flex'
    t2.play()
    isOpen = true
  } else {
    closeMenu()
  }
})

// Add click event listeners to all mobile links
mobileLinks.forEach((link) => {
  link.addEventListener('click', closeMenu)
})

// Resizing logic for modal
let isMobileView = window.innerWidth < 992

// Add resize listener
window.addEventListener('resize', () => {
  const wasInMobileView = isMobileView
  isMobileView = window.innerWidth < 992

  if (wasInMobileView && !isMobileView && isOpen) {
    t2.progress(0).pause()
    sidebarModal.style.display = 'none'
    isOpen = false

    gsap.set(sidebarModal, {
      height: 0,
      opacity: 0,
    })
    gsap.set(sidebarLinks, {
      y: 50,
      opacity: 0,
    })
  }
})

// Hover on links

mobileLinks.forEach((link) => {
  const border = link.querySelector('.nav-link-border')

  link.addEventListener('mouseenter', () => {
    gsap.to(border, {
      width: '100%',
      duration: 0.3,
      ease: 'power2.inOut',
    })
  })

  link.addEventListener('mouseleave', () => {
    gsap.to(border, {
      width: '0%',
      duration: 0.3,
      ease: 'power2.inOut',
    })
  })
})

desktopLinks.forEach((link) => {
  const border = link.querySelector('.nav-link-border')

  link.addEventListener('mouseenter', () => {
    gsap.to(border, {
      width: '100%',
      duration: 0.3,
      ease: 'power2.inOut',
    })
  })

  link.addEventListener('mouseleave', () => {
    gsap.to(border, {
      width: '0%',
      duration: 0.3,
      ease: 'power2.inOut',
    })
  })
})
