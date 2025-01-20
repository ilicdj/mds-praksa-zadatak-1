import gsap from 'gsap'

document.addEventListener('DOMContentLoaded', () => {
  const services = document.querySelectorAll('.single-service')

  services.forEach((service) => {
    const header = service.querySelector('.header-service')
    const body = service.querySelector('.body-service')
    const icon = header.querySelector('img')
    const hoverInfo = service.querySelector('.hover-short-service-info')

    // Set initial states
    gsap.set(body, {
      height: 0,
      opacity: 0,
    })

    gsap.set(hoverInfo, {
      opacity: 0,
      y: 20,
    })

    header.addEventListener('click', () => {
      const isOpen = header.classList.contains('active')

      if (!isOpen) {
        // Open the service
        header.classList.add('active')

        // Hide hover info immediately when opening
        gsap.to(hoverInfo, {
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: 'power2.in',
        })

        // Animate the body
        gsap.to(body, {
          height: 'auto',
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        })

        // Rotate the icon
        gsap.to(icon, {
          rotation: 90,
          duration: 0.2,
          ease: 'power2.out',
        })
      } else {
        // Close the service
        header.classList.remove('active')

        // Animate the body closed
        gsap.to(body, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
        })

        // Rotate the icon back
        gsap.to(icon, {
          rotation: 0,
          duration: 0.3,
          ease: 'power2.in',
        })
      }
    })

    // Hover functionality
    service.addEventListener('mouseenter', () => {
      // Only show hover info if service is not open
      if (!header.classList.contains('active')) {
        gsap.to(hoverInfo, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
        gsap.to(service, {
          borderBottom: '1px solid #00C2BA',
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    })

    service.addEventListener('mouseleave', () => {
      gsap.to(hoverInfo, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.in',
      })
      gsap.to(service, {
        borderBottom: '1px solid #313131',
        duration: 0.3,
        ease: 'power2.out',
      })
    })

    service.addEventListener('mousemove', (e) => {
      // Only move hover info if service is not open
      if (!header.classList.contains('active')) {
        const serviceRect = service.getBoundingClientRect()
        const relativeX = e.clientX - serviceRect.left
        const hoverInfoWidth = hoverInfo.offsetWidth
        const maxX = serviceRect.width - hoverInfoWidth
        const constrainedX = Math.max(0, Math.min(relativeX, maxX))

        gsap.to(hoverInfo, {
          x: constrainedX,
          duration: 0.5,
          ease: 'power2.out',
        })
      }
    })
  })
})
