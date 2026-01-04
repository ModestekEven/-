
import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import AiChat from './components/AiChat';
import { ACHIEVEMENTS, PERSONAL_INFO, CATEGORY_ICONS } from './constants';
import { MapPin, Sparkles, ArrowRight, Github, Mail, Linkedin } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Section = ({ id, children, className = "" }: { id: string, children: React.ReactNode, className?: string }) => {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
    return (
      <section 
        id={id} 
        ref={ref}
        className={`transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      >
        {children}
      </section>
    );
  };

  return (
    <div className="relative selection:bg-cyan-500/30">
      <ParticleBackground />
      <AiChat />

      {/* Header Nav */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass border-b border-white/5 py-4' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950 text-base">N</div>
            <span className="hidden sm:inline">渝文.AI</span>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Pulse</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Link</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-20">
        <section className="h-screen flex flex-col justify-center items-center px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-8 animate-pulse">
            <Sparkles size={12} /> Live in Digital Era
          </div>
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.85] mb-8">
            <span className="text-white">NIU</span><br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">YUWEN</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-2xl max-w-2xl font-light leading-relaxed mb-12">
            一位游走在 <span className="text-white font-medium">AI 浪潮</span>、<span className="text-white font-medium">商业实战</span> 与 <span className="text-white font-medium">东方智慧</span> 之间的 Gen Z 创造者。
          </p>
          <div className="flex gap-6">
            <a href="#projects" className="px-10 py-4 bg-white text-slate-950 rounded-full font-black text-sm hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5">
              EXPLORE WORK
            </a>
          </div>
        </section>

        {/* About Grid */}
        <Section id="about" className="py-40 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-10 rounded-[2.5rem] border border-white/5 group hover:border-cyan-500/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-8">
                <MapPin size={24} />
              </div>
              <h3 className="text-white text-3xl font-black mb-4">西安.Xi'an</h3>
              <p className="text-slate-400 leading-relaxed">在十三朝古都的深厚底蕴中，探索 AGI 时代的新商业物种。</p>
            </div>
            <div className="md:col-span-2 glass p-10 rounded-[2.5rem] border border-white/5 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                连接前沿技术与<br/><span className="text-cyan-400">实战智慧</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                作为实战派青年创业联盟联合创始人，我不仅在深圳研究 AI 教育，更在校园流量运营中积累了万级增长经验。我的目标是让 AI 成为每个青年的超能力。
              </p>
            </div>
          </div>
        </Section>

        {/* Achievement Timeline */}
        <Section id="projects" className="py-40 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <div className="text-cyan-400 font-black tracking-[0.3em] uppercase text-xs mb-4">Milestones</div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">成就与轨迹</h2>
            </div>
            <p className="text-slate-500 max-w-xs text-sm font-medium border-l-2 border-white/10 pl-6 leading-relaxed">
              从校园 VC 到 AI 教育创始人，每一步都是对“实战”最深刻的诠释。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((item, i) => (
              <div key={i} className="group glass p-8 rounded-3xl border border-white/5 hover:bg-white/5 transition-all flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-500">
                  {CATEGORY_ICONS[item.category]}
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2 group-hover:text-cyan-400 transition-colors leading-snug">{item.title}</h4>
                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-500 group-hover:text-slate-300">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <footer id="contact" className="py-32 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-indigo-600 mb-12 flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-cyan-500/20">
              N
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tighter text-center">
              一起探索 <span className="text-gradient">AI 驱动</span> 的未来
            </h2>
            <div className="flex gap-8 mb-20">
              <a href="#" className="p-4 rounded-2xl glass border border-white/5 text-slate-400 hover:text-white hover:border-white/20 transition-all"><Github size={24} /></a>
              <a href="#" className="p-4 rounded-2xl glass border border-white/5 text-slate-400 hover:text-white hover:border-white/20 transition-all"><Linkedin size={24} /></a>
              <a href="#" className="p-4 rounded-2xl glass border border-white/5 text-slate-400 hover:text-white hover:border-white/20 transition-all"><Mail size={24} /></a>
            </div>
            <div className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">
              © 2024 NIU YUWEN • DIGITAL ARCHIVE
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
