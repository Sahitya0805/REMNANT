import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { OrderMemory } from '../types/memory';
import { PatternDiscoveryEngine } from '../ai/patternDiscovery';
import { Dna, Coffee, Flame, Utensils, Heart, Cookie, Share2 } from 'lucide-react';

interface TasteDnaHelixProps {
  memories: OrderMemory[];
}

export const TasteDnaHelix: React.FC<TasteDnaHelixProps> = ({ memories }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const tasteDna = PatternDiscoveryEngine.generateTasteDna(memories);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 🧬 Build 3D DNA Double Helix Mesh
    const dnaGroup = new THREE.Group();

    const strandPoints = 40;
    const radius = 35;
    const heightStep = 4.5;

    const geoStrand = new THREE.SphereGeometry(2.5, 16, 16);
    const matStrandA = new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0xa855f7, emissiveIntensity: 0.6 });
    const matStrandB = new THREE.MeshStandardMaterial({ color: 0xec4899, emissive: 0xec4899, emissiveIntensity: 0.6 });

    for (let i = 0; i < strandPoints; i++) {
      const angle = (i * 0.35);
      const y = (i - strandPoints / 2) * heightStep;

      // Strand A Node
      const nodeA = new THREE.Mesh(geoStrand, matStrandA);
      nodeA.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      dnaGroup.add(nodeA);

      // Strand B Node
      const nodeB = new THREE.Mesh(geoStrand, matStrandB);
      nodeB.position.set(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius);
      dnaGroup.add(nodeB);

      // Connecting Base Rung
      if (i % 2 === 0) {
        const rungGeo = new THREE.CylinderGeometry(0.8, 0.8, radius * 2, 8);
        const rungMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.4 });
        const rung = new THREE.Mesh(rungGeo, rungMat);
        rung.position.set(0, y, 0);
        rung.rotation.z = Math.PI / 2;
        rung.rotation.y = angle;
        dnaGroup.add(rung);
      }
    }

    scene.add(dnaGroup);

    // Lighting
    const light = new THREE.PointLight(0xffffff, 2, 400);
    light.position.set(0, 0, 150);
    scene.add(light);

    const ambLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambLight);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      dnaGroup.rotation.y += 0.015;
      dnaGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [memories]);

  const traits = [
    { label: 'Caffeine Affinity', val: tasteDna.coffee, icon: Coffee, color: 'from-amber-500 to-amber-400' },
    { label: 'Comfort Food Ratio', val: tasteDna.comfortFood, icon: Utensils, color: 'from-purple-600 to-pink-500' },
    { label: 'Spicy Craving Index', val: tasteDna.spicy, icon: Flame, color: 'from-red-600 to-orange-500' },
    { label: 'Healthy & Wellness', val: tasteDna.healthy, icon: Heart, color: 'from-emerald-500 to-teal-400' },
    { label: 'Dessert Sweet Tooth', val: tasteDna.sweet, icon: Cookie, color: 'from-pink-500 to-rose-400' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6 space-y-6">
      
      <div className="glass-panel rounded-3xl p-6 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Dna className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              3D Taste DNA Double Helix 🧬 <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">Interactive 3D Mesh</span>
            </h2>
            <p className="text-xs text-slate-300">Rotating WebGL double helix representing your personal commerce taste genome.</p>
          </div>
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-xs font-bold shadow-md transition-all">
          <Share2 className="w-4 h-4" /> Export DNA Helix Card
        </button>
      </div>

      {/* 3D WebGL Helix & Breakdown Grid */}
      <div className="glass-panel rounded-3xl p-8 border border-purple-500/30 bg-slate-950 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* 3D Canvas Mount */}
        <div className="relative flex items-center justify-center bg-slate-900/60 rounded-2xl border border-white/10 overflow-hidden">
          <div ref={mountRef} className="w-full h-[450px]" />
          <div className="absolute bottom-4 text-xs text-purple-300 font-mono font-bold bg-slate-950/80 px-3 py-1 rounded-full border border-purple-500/30">
            🧬 WebGL 3D Rotating Taste Helix
          </div>
        </div>

        {/* DNA Traits List */}
        <div className="space-y-5">
          <div className="space-y-1">
            <div className="text-xs uppercase font-extrabold text-amber-400">Genomic Profile Assessment</div>
            <h3 className="text-2xl font-extrabold text-white">"High-Octane Caffeine & Celebration Seeker"</h3>
            <p className="text-xs text-slate-300">Derived by vector graph neural analysis over {memories.length} commerce memories.</p>
          </div>

          <div className="space-y-3.5 bg-slate-900/80 p-5 rounded-2xl border border-white/10">
            {traits.map((t, idx) => {
              const Icon = t.icon;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-purple-400" /> {t.label}
                    </span>
                    <span className="text-white font-mono">{t.val}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-white/5">
                    <div
                      className={`h-full bg-gradient-to-r ${t.color} rounded-full transition-all duration-700`}
                      style={{ width: `${t.val}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
