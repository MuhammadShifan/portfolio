import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL not supported, falling back to CSS background", e);
      return;
    }

    // 1. Starfield Particles with Dual Colors (Cyan & Neon Purple)
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f2fe);
    const purpleColor = new THREE.Color(0xa855f7);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 250;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

      const mixRatio = Math.random();
      let chosenColor;
      if (mixRatio < 0.45) {
        chosenColor = cyanColor;
      } else if (mixRatio < 0.85) {
        chosenColor = purpleColor;
      } else {
        chosenColor = whiteColor;
      }

      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 2. Floating Cybernetic Wireframe Geometries
    const groupGeom = new THREE.Group();

    const icosaGeom = new THREE.IcosahedronGeometry(12, 1);
    const icosaMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const icosaMesh = new THREE.Mesh(icosaGeom, icosaMat);
    icosaMesh.position.set(-60, 25, -20);
    groupGeom.add(icosaMesh);

    const torusGeom = new THREE.TorusGeometry(16, 1.2, 16, 50);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });
    const torusMesh = new THREE.Mesh(torusGeom, torusMat);
    torusMesh.position.set(65, -30, -10);
    torusMesh.rotation.x = Math.PI / 4;
    groupGeom.add(torusMesh);

    const octaGeom = new THREE.OctahedronGeometry(8, 0);
    const octaMat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const octaMesh = new THREE.Mesh(octaGeom, octaMat);
    octaMesh.position.set(45, 40, -30);
    groupGeom.add(octaMesh);

    scene.add(groupGeom);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Handle Resize
    const onResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse easing
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      particles.rotation.y = elapsedTime * 0.03 + targetX * 0.2;
      particles.rotation.x = elapsedTime * 0.01 + targetY * 0.15;

      icosaMesh.rotation.x = elapsedTime * 0.2;
      icosaMesh.rotation.y = elapsedTime * 0.25;

      torusMesh.rotation.x = elapsedTime * 0.15;
      torusMesh.rotation.z = elapsedTime * 0.2;

      octaMesh.rotation.y = elapsedTime * 0.3;
      octaMesh.rotation.z = elapsedTime * 0.2;

      groupGeom.position.x = targetX * -8;
      groupGeom.position.y = targetY * 8;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      icosaGeom.dispose();
      icosaMat.dispose();
      torusGeom.dispose();
      torusMat.dispose();
      octaGeom.dispose();
      octaMat.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    />
  );
}
