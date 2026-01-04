
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, MessageSquare, Globe, Sparkles } from 'lucide-react';
import { getGeminiResponse } from '../services/gemini';
import { ChatMessage } from '../types';

const AiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: '已连接牛渝文的数字映射。正在实时监测 AI 趋势与商业动态。请下达指令。', 
      sources: [] 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    try {
      const result = await getGeminiResponse(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: result.text, sources: result.sources }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: 'SYNC INTERRUPTED: 信号丢失。', sources: [] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      {isOpen ? (
        <div className="glass-card w-[90vw] md:w-[450px] h-[650px] rounded-[2.5rem] flex flex-col shadow-2xl border border-white/10 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-700">
          {/* HUD Header */}
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                <Bot className="text-cyan-400" size={22} />
              </div>
              <div>
                <span className="font-black text-sm block text-white tracking-widest uppercase">Digital_Twin_1.0</span>
                <span className="flex items-center gap-2 text-[9px] text-cyan-500/60 font-black uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                  Neural_Link_Active
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform duration-500 text-slate-500 hover:text-white">
              <X size={24} />
            </button>
          </div>
          
          {/* Content Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-6 rounded-3xl text-sm leading-relaxed tracking-wide ${
                  msg.role === 'user' 
                    ? 'bg-white text-slate-950 rounded-tr-none font-bold shadow-xl shadow-white/5' 
                    : 'bg-white/5 text-slate-300 rounded-tl-none border border-white/10'
                }`}>
                  {msg.text}
                </div>
                
                {msg.role === 'model' && msg.sources && msg.sources.length > 0 && (
                  <div className="mt-6 w-full animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.3em] flex items-center gap-2 mb-3">
                      <Sparkles size={10} className="text-cyan-400" /> Reference_Grounding
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {msg.sources.map((source, si) => (
                        <a key={si} href={source.uri} target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all">
                          <Globe size={10} />
                          <span className="truncate max-w-[150px]">{source.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-2xl flex gap-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
          </div>

          {/* Footer Input */}
          <div className="p-8 bg-white/[0.02] border-t border-white/5">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="ENTER SYSTEM COMMAND..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-6 pr-16 py-5 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600 font-mono tracking-widest"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-3 bg-cyan-500 text-slate-950 p-3 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-20 shadow-lg shadow-cyan-500/20"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group w-20 h-20 bg-white text-slate-950 rounded-[2rem] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-500 relative"
        >
          <div className="absolute inset-0 bg-cyan-400 rounded-[2rem] animate-ping opacity-10 group-hover:opacity-30" />
          <MessageSquare size={32} />
        </button>
      )}
    </div>
  );
};

export default AiChat;
