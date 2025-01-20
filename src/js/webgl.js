import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import vertex from '../shaders/vertex.glsl'
import fragment from '../shaders/fragment.glsl'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

// Models
import sphere from '../models/sphere.glb?url'
import mdscube from '../models/mds-cube.glb?url'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(CustomEase)

export default class Sketch {
  constructor(options) {
    // Set Three.js Scene
    this.scene = new THREE.Scene()

    this.container = options.dom
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(this.width, this.height)
    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = THREE.sRGBEncoding

    this.container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      1000
    )
    this.camera.position.set(0, 0, 2)

    // Loaders for models
    this.dracoLoader = new DRACOLoader()
    this.dracoLoader.setDecoderPath('/draco/')
    this.gltfLoader = new GLTFLoader()
    this.gltfLoader.setDRACOLoader(this.dracoLoader)

    this.time = 0

    this.updateCameraPosition()
    this.addObjects()
    this.addLights()
    this.resize()
    this.render()
  }

  getMaterial() {
    return new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { type: 'f', value: 0 },
        uProgress: { type: 'f', value: 0 },
      },
      transparent: true,
      depthWrite: false,
      depthTest: true,
    })
  }

  addObjects() {
    // Main Sphere Model
    this.gltfLoader.load(sphere, (gltf) => {
      this.model = gltf.scene.children[0]

      this.model.material = this.getMaterial()

      this.spherePointsMesh = new THREE.Points(
        this.model.geometry,
        this.model.material
      )
      this.spherePointsMesh.rotation.z = -Math.PI / 3

      this.scene.add(this.spherePointsMesh)
    })

    // Footer Cube Model
    this.gltfLoader.load(mdscube, (gltf) => {
      this.cube = gltf.scene.children[0]
      this.cube.scale.set(0, 0, 0)
      this.cube.position.set(0.1, -0.4, 0)
      this.cube.rotation.y = -0.7

      this.cube.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true
          child.material.opacity = 0
        }
      })
      this.scene.add(this.cube)

      CustomEase.create(
        'custom',
        'M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1'
      )

      ScrollTrigger.create({
        trigger: 'footer',
        start: '70% bottom',
        end: 'bottom -15%',
        onEnter: () => {
          gsap.to(this.cube.scale, {
            x: 0.06,
            y: 0.06,
            z: 0.06,
            duration: 1.5,
            ease: 'custom',
          })
          // Update material opacity through traverse
          this.cube.traverse((child) => {
            if (child.isMesh) {
              gsap.to(child.material, {
                opacity: 1,
                duration: 1.2,
                ease: 'power2.out',
              })
            }
          })
          gsap.to(this.cube.rotation, {
            y: this.cube.rotation.y + Math.PI * 2,
            duration: 1.5,
            ease: 'custom',
          })
        },
        onLeave: () => {
          gsap.to(this.cube.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.8,
            ease: 'power2.in',
          })
          this.cube.traverse((child) => {
            if (child.isMesh) {
              gsap.to(child.material, {
                opacity: 0,
                duration: 0.6,
                ease: 'power2.in',
              })
            }
          })
        },
        onEnterBack: () => {
          gsap.to(this.cube.scale, {
            x: 0.06,
            y: 0.06,
            z: 0.06,
            duration: 1.5,
            ease: 'custom',
          })
          this.cube.traverse((child) => {
            if (child.isMesh) {
              gsap.to(child.material, {
                opacity: 1,
                duration: 1.2,
                ease: 'power2.out',
              })
            }
          })
          gsap.to(this.cube.rotation, {
            y: this.cube.rotation.y + Math.PI * 2,
            duration: 1.5,
            ease: 'custom',
          })
        },
        onLeaveBack: () => {
          gsap.to(this.cube.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.8,
            ease: 'power2.in',
          })
          this.cube.traverse((child) => {
            if (child.isMesh) {
              gsap.to(child.material, {
                opacity: 0,
                duration: 0.6,
                ease: 'power2.in',
              })
            }
          })
        },
      })
    })
  }

  addLights() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1)
    this.scene.add(this.ambientLight)

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    this.directionalLight.position.set(0, 0, 1)
    this.scene.add(this.directionalLight)
  }

  updateCameraPosition() {
    if (window.innerWidth <= 768) {
      this.camera.position.set(0, 0, 4)
      if (this.cube) {
        this.cube.visible = false
      }
    } else if (window.innerWidth <= 1024) {
      this.camera.position.set(0, 0, 2.5)
      if (this.cube) {
        this.cube.visible = false
      }
    } else {
      this.camera.position.set(0, 0, 2)
      if (this.cube) {
        this.cube.visible = true
      }
    }
  }

  handleResize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.renderer.setSize(this.width, this.height)

    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
    this.updateCameraPosition()
  }

  resize() {
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  render() {
    this.time += 0.01
    if (this.spherePointsMesh) {
      this.spherePointsMesh.rotation.x += 0.001
    }
    if (this.cube) {
      const randomVariation = Math.sin(this.time * 2.1) * 0.0005
      this.cube.position.y +=
        Math.sin(this.time * 0.5) * 0.0001 + randomVariation
    }
    window.requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}

new Sketch({ dom: document.querySelector('#webgl-container') })
