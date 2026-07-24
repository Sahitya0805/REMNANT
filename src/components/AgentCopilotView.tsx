import React, { useState } from 'react';
import type { OrderMemory, AgentChatMessage } from '../types/memory';
import { MemoryReasonerAgent } from '../ai/memoryReasoner';
import { Send, RotateCcw } from 'lucide-react';

interface AgentCopilotViewProps {
  memories: OrderMemory[];
  onReorder: (mem: OrderMemory) => void;
  initialQuery?: string;
}

export const AgentCopilotView: React.FC<AgentCopilotViewProps> = ({
  memories,
  onReorder,
  initialQuery = ''
}) => {
  const [messages, setMessages] = useState<AgentChatMessage[]>([
    {
      id: 'welcome-recall',
      sender: 'agent',
      text: `What are you trying to remember?`,
      timestamp: 'NOW',
      suggestedActions: [
        'Coffee after interview',
        'Rainy day ramen',
        'Mom\'s birthday cake',
        'IPL finals biryani'
      ]
    }
  ]);
  const [inputText, setInputText] = useState(initialQuery);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isProcessing) return;

    const userMsg: AgentChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsProcessing(true);

    try {
      const agentResponse = await MemoryReasonerAgent.processUserQuery(query, memories);

      if (agentResponse.attachedMemories && agentResponse.attachedMemories.length > 0) {
        const top = agentResponse.attachedMemories[0];
        agentResponse.text = `I found something.\n\n${top.date.toUpperCase()}\n${top.time}\n${top.restaurantOrStore}\n${top.weather}\n\n"${top.storyNarrative}"`;
      } else {
        agentResponse.text = `I found something.\n\nSearching archive for "${query}"...`;
      }

      setMessages(prev => [...prev, agentResponse]);
    } catch (err) {
      console.error('Recall error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12 space-y-8">
      
      <div className="border-b border-[var(--border-color)] pb-4">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] uppercase tracking-wide">
          Recall
        </h2>
        <p className="text-xs font-mono-meta text-[var(--text-secondary)] mt-1">
          AI Memory Curator
        </p>
      </div>

      {/* Messages Stage */}
      <div className="editorial-card p-6 min-h-[500px] flex flex-col justify-between space-y-6">
        
        <div className="space-y-6 overflow-y-auto max-h-[560px] pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-md space-y-3 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                
                <div className={`p-5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[var(--accent-color)] text-white font-medium shadow-sm'
                    : 'bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)]'
                }`}>
                  <p className="whitespace-pre-line leading-relaxed font-sans">{msg.text}</p>
                </div>

                {/* Attached Memory Card */}
                {msg.attachedMemories && msg.attachedMemories.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {msg.attachedMemories.map((mem) => (
                      <div key={mem.id} className="editorial-card p-4 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono-meta text-[var(--text-secondary)]">
                          <span>{mem.title}</span>
                          <span>₹{mem.totalAmount}</span>
                        </div>
                        <p className="text-sm font-bold text-[var(--text-primary)]">{mem.restaurantOrStore}</p>
                        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
                          <span className="text-xs font-mono-meta text-[var(--accent-color)]">{mem.date.toUpperCase()}</span>
                          <button
                            onClick={() => onReorder(mem)}
                            className="px-3 py-1 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl text-xs flex items-center gap-1 transition-all"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reorder</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggested Action Chips */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {msg.suggestedActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(action)}
                        className="text-xs font-mono-meta bg-[var(--bg-primary)] hover:border-[var(--accent-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-1.5 rounded-xl border border-[var(--border-color)] transition-all"
                      >
                        "{action}"
                      </button>
                    ))}
                  </div>
                )}

              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-2 text-[var(--accent-color)] font-mono-meta text-xs italic p-3 rounded-2xl border border-[var(--border-color)] max-w-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-ping" />
              <span>Searching memory archive...</span>
            </div>
          )}
        </div>

        {/* Input Field */}
        <div className="pt-3 border-t border-[var(--border-color)]">
          <div className="underline-search relative flex items-center py-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Remember..."
              className="w-full bg-transparent text-[var(--text-primary)] font-sans text-base placeholder-[var(--text-secondary)] outline-none"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isProcessing || !inputText.trim()}
              className="p-2 text-[var(--accent-color)] hover:text-[var(--accent-hover)] transition-colors disabled:opacity-40"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
