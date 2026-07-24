import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const FloatingBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0008);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 280;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Reduced Density: 3 Clean Sweeping Memory Loops (1 strand each)
    const curveGroup = new THREE.Group();

    const loopConfigs = [
      { radiusX: 190, radiusY: 105, rotX: 0.4, rotY: 0.6, rotZ: 0.2, pos: [0, 15, 0] },
      { radiusX: 230, radiusY: 130, rotX: 0.8, rotY: -0.4, rotZ: -0.3, pos: [-30, -20, 15] },
      { radiusX: 150, radiusY: 90, rotX: -0.3, rotY: 0.9, rotZ: 0.5, pos: [40, -40, -20] },
    ];

    loopConfigs.forEach((cfg) => {
      const torusGeo = new THREE.TorusGeometry(cfg.radiusX, 0.6, 24, 120);
      const torusMat = new THREE.MeshStandardMaterial({
        color: 0xC96A1A,
        emissive: 0xC96A1A,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.22,
        wireframe: true
      });

      const torus = new THREE.Mesh(torusGeo, torusMat);
      torus.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      torus.rotation.set(cfg.rotX, cfg.rotY, cfg.rotZ);
      curveGroup.add(torus);
    });

    scene.add(curveGroup);

    // Soft Ambient Dust Particles
    const dustCount = 700;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i++) {
      dustPos[i] = (Math.random() - 0.5) * 950;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 1.3,
      color: 0xC96A1A,
      transparent: true,
      opacity: 0.2
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambLight);

    const pointLight = new THREE.PointLight(0xC96A1A, 2.2, 600);
    pointLight.position.set(0, 0, 150);
    scene.add(pointLight);

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      curveGroup.rotation.y += 0.0005;
      curveGroup.rotation.x += 0.0002;
      dustParticles.rotation.y += 0.0003;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
    />
  );
};
