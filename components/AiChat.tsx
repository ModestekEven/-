
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, MessageSquare, ExternalLink, Globe } from 'lucide-react';
import { getGeminiResponse } from '../services/gemini';
import { ChatMessage } from '../types';

const AiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '你好！我是牛渝文的 AI 助手。通过集成 Google Search，我可以为你提供关于牛渝文及 AI 行业的最新资讯。想聊聊吗？', sources: [] }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const result = await getGeminiResponse(userMsg);
    setMessages(prev => [...prev, { role: 'model', text: result.text, sources: result.sources }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="glass w-80 md:w-96 h-[550px] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Bot className="text-cyan-400" size={18} />
              </div>
              <div>
                <span className="font-bold text-sm block leading-none text-white">渝文 AI 助手</span>
                <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">Search Enabled</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-cyan-400 transition-colors text-slate-400">
              <X size={20} />
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[90%] p-3.5 rounded-2xl shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5'
                }`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
                
                {msg.role === 'model' && msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 px-1">
                    <div className="w-full text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
                      <Globe size={10} /> 来源参考
                    </div>
                    {msg.sources.map((source, si) => (
                      <a 
                        key={si}
                        href={source.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 text-[10px] text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all"
                      >
                        <ExternalLink size={10} />
                        {source.title.length > 20 ? source.title.substring(0, 20) + '...' : source.title}
                      </a>
                    ))}
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

          <div className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="询问关于渝文或 AI 实时动态..."
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-500"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-2.5 rounded-full transition-all disabled:opacity-50 disabled:scale-95 shadow-lg shadow-cyan-500/20"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center gap-2 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <MessageSquare size={24} className="relative z-10" />
          <span className="hidden md:block font-bold tracking-wider relative z-10">AI SEARCH</span>
        </button>
      )}
    </div>
  );
};

export default AiChat;
