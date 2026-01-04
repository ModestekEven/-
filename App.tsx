
import React from 'react';
import ParticleBackground from './components/ParticleBackground';
import AiChat from './components/AiChat';
import { ACHIEVEMENTS, PERSONAL_INFO, CATEGORY_ICONS } from './constants';
import { MapPin, Sparkles, MoveRight, Github, Mail, Linkedin, BrainCircuit } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const App: React.FC = () => {
  // 使用简单的 Intersection Observer 来处理导航栏背景，避免监听 scroll 事件导致的频繁重绘
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.9,
    initialInView: true,
  });

  const RevealSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
    const { ref, inView } = useInView({ 
      threshold: 0.1, 
      triggerOnce: true,
      rootMargin: '0px 0px -50px 0px' 
    });
    
    return (
      <div 
        ref={ref}
        style={{ 
          transitionDelay: `${delay}ms`,
          willChange: 'transform, opacity'
        }}
        className={`transition-all duration-[1000ms] ease-out ${
          inView 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        } ${className}`}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="relative bg-[#010409] text-slate-200 min-h-screen selection:bg-cyan-500/30 overflow-x-hidden">
      <ParticleBackground />
      <AiChat />

      {/* 顶部占位，用于观察 Hero 是否离开视野 */}
      <div ref={heroRef} className="absolute top-0 left-0 w-full h-20 pointer-events-none" />

      {/* Floating Header - 使用 transform 提升渲染性能 */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 ${
        !heroInView ? 'bg-[#010409]/90 backdrop-blur-sm border-b border-white/5' : 'bg-transparent py-8'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg">N</div>
            <span className="text-[10px] font-bold tracking-[0.4em] opacity-60 uppercase">Architect_Yu</span>
          </div>
          <div className="hidden sm:flex gap-8 text-[9px] font-bold tracking-[0.4em] text-slate-500">
            {['MANIFESTO', 'PROJECTS', 'CONNECT'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="hover:text-cyan-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero: 极简且稳定 */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,_rgba(34,211,238,0.02)_0%,_transparent_60%)] pointer-events-none" />
        
        <div className="text-center z-10 will-change-transform">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.01] text-[9px] font-black tracking-[0.6em] text-slate-500 mb-12 uppercase">
            <BrainCircuit size={12} className="text-cyan-500/50" /> Logic & Perception
          </div>
          
          <div className="relative mb-20">
            <h1 className="text-[18vw] md:text-[11rem] font-serif-sc font-black leading-none tracking-tighter text-white">
              牛渝文
            </h1>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-bold tracking-[2em] text-cyan-500/30 uppercase whitespace-nowrap ml-[1em]">
              NIU YUWEN
            </div>
          </div>

          <div className="max-w-xl mx-auto">
            <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed tracking-wide">
              西安 · 实战派创业者
              <span className="block mt-4 text-slate-500 text-sm font-medium tracking-widest uppercase opacity-60">
                Architecting AI commercial infrastructure
              </span>
            </p>
          </div>

          <div className="mt-20">
            <a href="#projects" className="group px-10 py-4 border border-white/10 rounded-full text-[9px] font-black tracking-[0.5em] flex items-center gap-4 hover:bg-white hover:text-black transition-all duration-500">
              EXPLORE ARCHIVES <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="absolute bottom-12 w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </section>

      {/* About Section */}
      <section id="manifesto" className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-7">
            <RevealSection>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tighter leading-tight">
                将 AI 注入<br/><span className="text-cyan-500">真实增长</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed font-light mb-12 max-w-2xl">
                我不止步于理论。从深圳的 AI 教育实践到校园万级私域流量的精密运营，每一行代码都在为商业价值服务。在数字波峰中，寻找确定性的增长路径。
              </p>
              <div className="flex gap-16">
                {[
                  { label: "Private Pool", value: "10K+", desc: "Campus Traffic" },
                  { label: "Practical", value: "50+", desc: "AI Implements" }
                ].map((stat, i) => (
                  <div key={i} className="relative">
                    <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                    <div className="text-[10px] font-bold text-cyan-700 tracking-[0.3em] uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
          <div className="lg:col-span-5">
            <RevealSection delay={150}>
              <div className="p-12 rounded-[2.5rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl relative overflow-hidden group hover:border-white/10 transition-colors">
                <MapPin className="text-cyan-600 mb-8 opacity-60" size={32} />
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">XI'AN DISTRICT</h3>
                <p className="text-slate-500 leading-relaxed text-sm mb-8 font-light">
                  在古都的厚重历史中，通过 Datawhale 分享与创业训练，建立横跨教育与咨询的 AI 实战版图。
                </p>
                <div className="flex flex-wrap gap-4 opacity-40">
                  <span className="text-[9px] font-black tracking-widest uppercase"># Founder</span>
                  <span className="text-[9px] font-black tracking-widest uppercase"># AI_Specialist</span>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-40 px-6 max-w-7xl mx-auto">
        <RevealSection className="mb-24">
          <div className="text-cyan-600 text-[10px] font-black tracking-[0.8em] uppercase mb-6 opacity-60">Archive_Log</div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">历程与实践</h2>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {ACHIEVEMENTS.map((item, i) => (
            <RevealSection key={i} delay={(i % 3) * 100}>
              <div className="group p-10 rounded-[2rem] bg-white/[0.01] border border-white/5 hover:bg-white/[0.02] hover:border-cyan-500/30 transition-all duration-700 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center mb-10 group-hover:scale-105 transition-transform duration-500">
                    {CATEGORY_ICONS[item.category]}
                  </div>
                  <h4 className="text-lg font-bold text-slate-300 group-hover:text-white transition-colors tracking-tight leading-snug">
                    {item.title}
                  </h4>
                </div>
                <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[9px] font-black tracking-[0.4em] text-slate-600 uppercase">
                    {item.category}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="connect" className="py-40 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <RevealSection>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-16 tracking-tighter">
              BEYOND THE <span className="text-cyan-600 italic">ALGO</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-8 mb-24">
              {[
                { icon: <Github size={18} />, label: 'GITHUB' },
                { icon: <Linkedin size={18} />, label: 'LINKEDIN' },
                { icon: <Mail size={18} />, label: 'EMAIL' }
              ].map((link, i) => (
                <a key={i} href="#" className="flex items-center gap-4 px-10 py-5 rounded-full bg-white/[0.02] border border-white/5 text-[9px] font-black tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-500">
                  {link.icon} {link.label}
                </a>
              ))}
            </div>
            <p className="text-slate-700 text-[9px] font-black tracking-[1em] uppercase opacity-40">
              NIU YUWEN ARCHIVE © 2024 / ALL SYSTEMS NORMAL
            </p>
          </RevealSection>
        </div>
      </footer>
    </div>
  );
};

export default App;
