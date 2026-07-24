import React, { useEffect, useRef, useState } from 'react';
import type { OrderMemory } from '../types/memory';
import { Sparkle, RotateCcw } from 'lucide-react';

interface MemoryGalaxyViewProps {
  memories: OrderMemory[];
  onSelectMemory: (mem: OrderMemory) => void;
  onReorder: (mem: OrderMemory) => void;
}

interface StarParticle {
  id: string;
  memory: OrderMemory;
  x: number;
  y: number;
  radius: number;
  color: string;
  glowColor: string;
  speed: number;
  pulsePhase: number;
}

export const MemoryGalaxyView: React.FC<MemoryGalaxyViewProps> = ({
  memories,
  onSelectMemory,
  onReorder
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredStar, setHoveredStar] = useState<StarParticle | null>(null);
  const [stars, setStars] = useState<StarParticle[]>([]);

  useEffect(() => {
    const width = 800;
    const height = 500;

    const newStars: StarParticle[] = memories.map((mem, idx) => {
      const angle = (idx / memories.length) * 2 * Math.PI;
      const radiusDist = 100 + Math.random() * 180;
      
      const color = mem.category === 'Food' ? '#f97316' : mem.category === 'Instamart' ? '#10b981' : '#a855f7';
      const glowColor = mem.category === 'Food' ? 'rgba(249, 115, 22, 0.4)' : mem.category === 'Instamart' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(168, 85, 247, 0.4)';

      return {
        id: mem.id,
        memory: mem,
        x: width / 2 + radiusDist * Math.cos(angle),
        y: height / 2 + radiusDist * Math.sin(angle),
        radius: 6 + (mem.totalAmount / 300),
        color,
        glowColor,
        speed: 0.002 + Math.random() * 0.003,
        pulsePhase: Math.random() * Math.PI * 2
      };
    });

    setStars(newStars);
  }, [memories]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 80; i++) {
        const x = (Math.sin(i * 99 + Date.now() * 0.0001) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(i * 33 + Date.now() * 0.0001) * 0.5 + 0.5) * canvas.height;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(x, y, 1, 1);
      }

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dist = Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(167, 139, 250, ${0.15 * (1 - dist / 180)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      stars.forEach(star => {
        star.pulsePhase += 0.03;
        const currentRadius = star.radius + Math.sin(star.pulsePhase) * 1.5;
        const isHovered = hoveredStar?.id === star.id;

        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, currentRadius * (isHovered ? 4 : 2.5)
        );
        gradient.addColorStop(0, star.glowColor);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(star.x, star.y, currentRadius * (isHovered ? 4 : 2.5), 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(star.x, star.y, currentRadius, 0, 2 * Math.PI);
        ctx.fillStyle = star.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [stars, hoveredStar]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const hovered = stars.find(star => Math.hypot(star.x - mouseX, star.y - mouseY) <= star.radius * 3);
    setHoveredStar(hovered || null);
  };

  const handleCanvasClick = () => {
    if (hoveredStar) {
      onSelectMemory(hoveredStar.memory);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
      
      <div className="glass-panel rounded-3xl p-6 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 via-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Sparkle className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              Memory Galaxy Constellation <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">3D Vector Universe</span>
            </h2>
            <p className="text-xs text-slate-300">Every order is a star in your commerce galaxy. Hover over stars to inspect memories.</p>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-4 border border-white/10 relative overflow-hidden bg-slate-950">
        <div className="absolute top-4 left-4 z-10 flex items-center gap-3 text-xs text-slate-300 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Food</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Instamart</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Dineout</div>
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={480}
          onMouseMove={handleMouseMove}
          onClick={handleCanvasClick}
          className="w-full h-[480px] cursor-pointer rounded-2xl bg-slate-950"
        />

        {hoveredStar && (
          <div className="absolute bottom-6 right-6 z-20 glass-panel rounded-2xl p-4 max-w-sm border border-purple-500/40 bg-slate-900/95 space-y-2 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-400">{hoveredStar.memory.restaurantOrStore}</span>
              <span className="text-white font-extrabold">₹{hoveredStar.memory.totalAmount}</span>
            </div>
            <h4 className="font-bold text-white text-sm">{hoveredStar.memory.title}</h4>
            <p className="text-xs text-slate-300 italic">"{hoveredStar.memory.storyNarrative}"</p>
            <button
              onClick={() => onReorder(hoveredStar.memory)}
              className="w-full py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1 shadow-md transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reorder This Star
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
