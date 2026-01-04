
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, MessageSquare, ExternalLink, Globe } from 'lucide-react';
import { getGeminiResponse } from '../services/gemini';
import { ChatMessage } from '../types';

const AiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: '你好！我是牛渝文的 AI 助手。我已经集成了 Google Search 搜索增强功能，可以为您提供最前沿的 AI 资讯和牛渝文的最新动态。请问有什么可以帮您的？', 
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
      setMessages(prev => [...prev, { role: 'model', text: '抱歉，系统暂时无法处理您的请求。', sources: [] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="glass w-80 md:w-[420px] h-[600px] rounded-3xl flex flex-col shadow-2xl border border-white/10 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Bot className="text-white" size={22} />
              </div>
              <div>
                <span className="font-bold text-sm block text-white tracking-tight">渝文 AI 助手</span>
                <span className="flex items-center gap-1 text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                  Google Search On
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform text-slate-400 p-1">
              <X size={20} />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 text-sm scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
                
                {/* Grounding Sources */}
                {msg.role === 'model' && msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 w-full flex flex-col gap-2">
                    <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] flex items-center gap-1.5 px-1">
                      <Globe size={10} className="text-cyan-400" /> 实时搜索来源
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {msg.sources.map((source, si) => (
                        <a 
                          key={si}
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/50 border border-white/10 text-[11px] text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all group"
                        >
                          <ExternalLink size={10} className="group-hover:scale-110 transition-transform" />
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
                <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-2 items-center">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-5 bg-white/5 border-t border-white/10">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="询问关于渝文或 AI 的实时动态..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all placeholder:text-slate-600"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-2 rounded-xl transition-all disabled:opacity-30 disabled:grayscale shadow-lg shadow-cyan-500/20"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-2xl shadow-2xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <div className="relative flex items-center gap-3">
            <MessageSquare size={24} />
            <span className="hidden md:block font-bold tracking-widest text-sm">TALK WITH AI</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default AiChat;
