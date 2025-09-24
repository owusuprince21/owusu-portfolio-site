'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function CursorFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const meshRef = useRef<THREE.Mesh>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const lastPosRef = useRef(new THREE.Vector3()) // store last position for velocity calc

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (prefersReducedMotion || isMobile) return

    if (!canvasRef.current) return

    // Scene + Camera + Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Sphere
    const geometry = new THREE.SphereGeometry(0.5, 64, 64)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          float dist = distance(vUv, vec2(0.5));
          float glow = 1.0 - smoothstep(0.0, 0.5, dist);
          glow = pow(glow, 2.0) * (0.8 + 0.2 * sin(time * 2.0));
          vec3 color = vec3(0.2, 0.6, 1.0) * glow;
          gl_FragColor = vec4(color, glow * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Store refs
    sceneRef.current = scene
    rendererRef.current = renderer
    cameraRef.current = camera
    meshRef.current = mesh

    // Raycaster helper (to map cursor to world plane)
    const raycaster = new THREE.Raycaster()
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0) // plane at z=0
    const mouseVec = new THREE.Vector2()
    const intersectPoint = new THREE.Vector3()

    // Animate loop
    const animate = () => {
      const time = performance.now() * 0.001

      if (mesh.material instanceof THREE.ShaderMaterial) {
        mesh.material.uniforms.time.value = time
      }

      // Map mouse position to world space
      mouseVec.set(
        (mouseRef.current.x / window.innerWidth) * 2 - 1,
        -(mouseRef.current.y / window.innerHeight) * 2 + 1
      )
      raycaster.setFromCamera(mouseVec, camera)
      raycaster.ray.intersectPlane(planeZ, intersectPoint)

      // Smooth follow
      mesh.position.lerp(intersectPoint, 0.2)

      // Calculate velocity (distance between last frame and this frame)
      const velocity = mesh.position.clone().sub(lastPosRef.current).length() * 10
      lastPosRef.current.copy(mesh.position)

      // Scale based on velocity (default 1, max ~1.8)
      const targetScale = 1 + Math.min(velocity, 0.8)
      mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    // Mouse move
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    // Resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return
      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)

      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="cursor-canvas"
      className="hidden md:block fixed top-0 left-0 w-full h-full pointer-events-none"
    />
  )
}
