import React, { useEffect, useRef, useState } from 'react';
import type { OrderMemory, MemoryNode, MemoryEdge } from '../types/memory';
import { KnowledgeGraphEngine } from '../ai/knowledgeGraph';
import { Network, RotateCcw } from 'lucide-react';

interface KnowledgeGraphViewProps {
  memories: OrderMemory[];
  onSelectMemory: (mem: OrderMemory) => void;
  onReorder: (mem: OrderMemory) => void;
}

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({
  memories,
  onSelectMemory,
  onReorder
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<MemoryNode | null>(null);
  const [graphData, setGraphData] = useState<{ nodes: MemoryNode[]; edges: MemoryEdge[] }>({ nodes: [], edges: [] });

  useEffect(() => {
    const data = KnowledgeGraphEngine.buildGraph(memories);
    
    const width = 800;
    const height = 500;
    const centerX = width / 2;
    const centerY = height / 2;

    data.nodes.forEach((node, i) => {
      if (node.type === 'user') {
        node.x = centerX;
        node.y = centerY;
      } else {
        const angle = (i / data.nodes.length) * 2 * Math.PI;
        const radius = node.type === 'event' ? 140 : node.type === 'restaurant' ? 220 : 180;
        node.x = centerX + radius * Math.cos(angle);
        node.y = centerY + radius * Math.sin(angle);
      }
    });

    setGraphData(data);
  }, [memories]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render Connected Filaments (Detective Board Style)
      graphData.edges.forEach(edge => {
        const sourceNode = graphData.nodes.find(n => n.id === edge.source);
        const targetNode = graphData.nodes.find(n => n.id === edge.target);

        if (sourceNode && targetNode && sourceNode.x && sourceNode.y && targetNode.x && targetNode.y) {
          const isConnected = selectedNode && (sourceNode.id === selectedNode.id || targetNode.id === selectedNode.id);
          ctx.beginPath();
          ctx.moveTo(sourceNode.x, sourceNode.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.strokeStyle = isConnected ? '#FF6B00' : 'rgba(255, 255, 255, 0.06)';
          ctx.lineWidth = isConnected ? 2.5 : 1;
          if (isConnected) {
            ctx.shadowColor = '#FF6B00';
            ctx.shadowBlur = 10;
          } else {
            ctx.shadowBlur = 0;
          }
          ctx.stroke();
        }
      });

      // Render Memory Nodes
      graphData.nodes.forEach(node => {
        if (!node.x || !node.y) return;

        const isSelected = selectedNode?.id === node.id;
        const radius = node.type === 'user' ? 22 : node.type === 'event' ? 18 : 14;

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + (isSelected ? 8 : 4), 0, 2 * Math.PI);
        ctx.fillStyle = isSelected ? 'rgba(255, 107, 0, 0.3)' : 'rgba(255, 255, 255, 0.03)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = isSelected ? '#FF6B00' : '#121212';
        ctx.fill();
        ctx.strokeStyle = isSelected ? '#ffffff' : '#FF6B00';
        ctx.lineWidth = isSelected ? 3 : 1;
        ctx.stroke();

        ctx.font = isSelected ? 'bold 12px monospace' : '10px monospace';
        ctx.fillStyle = isSelected ? '#ffffff' : '#787878';
        ctx.textAlign = 'center';
        ctx.fillText(`${node.icon || ''} ${node.label}`, node.x, node.y + radius + 14);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [graphData, selectedNode]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const clicked = graphData.nodes.find(node => {
      if (!node.x || !node.y) return false;
      const dist = Math.hypot(node.x - clickX, node.y - clickY);
      return dist <= 25;
    });

    setSelectedNode(clicked || null);
  };

  const filteredMemories = selectedNode
    ? KnowledgeGraphEngine.traverseForMemories(selectedNode.label, memories)
    : memories;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 space-y-6 font-mono">
      
      <div className="glass-panel-archive rounded-3xl p-6 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 border border-[#FF6B00]/40 flex items-center justify-center text-[#FF6B00]">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">
              DETECTIVE MEMORY BOARD
            </h2>
            <p className="text-xs text-[#787878]">Click nodes to light up connected memory threads.</p>
          </div>
        </div>

        {selectedNode && (
          <button
            onClick={() => setSelectedNode(null)}
            className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold rounded-xl border border-white/10 flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> RESET BOARD
          </button>
        )}
      </div>

      <div className="glass-panel-archive rounded-3xl p-4 border border-white/5 relative overflow-hidden bg-[#050505]">
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#0B0B0B] px-3 py-1.5 rounded-xl border border-white/5 text-xs text-[#787878]">
          <span>CONNECTED FILAMENTS • {graphData.nodes.length} MEMORY NODES</span>
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={480}
          onClick={handleCanvasClick}
          className="w-full h-[480px] cursor-pointer rounded-2xl bg-[#050505]"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#787878]">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <span>REMNANTS FOUND</span>
            {selectedNode && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/30">
                THREAD: "{selectedNode.label}"
              </span>
            )}
          </h3>
          <span>({filteredMemories.length} ITEMS)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMemories.map((mem) => (
            <div
              key={mem.id}
              onClick={() => onSelectMemory(mem)}
              className="glass-panel-interactive-archive rounded-2xl p-4 space-y-3 cursor-pointer flex flex-col justify-between bg-[#0B0B0B]"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#FF6B00] font-bold mb-1">
                  <span>{mem.category}</span>
                  <span>₹{mem.totalAmount}</span>
                </div>
                <h4 className="font-bold text-white text-base">{mem.title}</h4>
                <p className="text-xs text-[#787878]">{mem.restaurantOrStore}</p>
                <p className="text-xs text-slate-300 italic pt-2 line-clamp-2">"{mem.storyNarrative}"</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                <span className="text-[#787878]">{mem.date}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onReorder(mem);
                  }}
                  className="px-3 py-1 bg-[#FF6B00] text-black font-extrabold rounded-xl text-xs transition-all hover:bg-[#FF9D3D]"
                >
                  <RotateCcw className="w-3 h-3" /> REORDER
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
