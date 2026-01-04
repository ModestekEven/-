
import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import AiChat from './components/AiChat';
import { ACHIEVEMENTS, PERSONAL_INFO, CATEGORY_ICONS } from './constants';
import { MapPin, Calendar, Sparkles, Github, Linkedin, Mail, ArrowRight, ExternalLink } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const observerOptions = { threshold: 0.1, triggerOnce: true };
  const { ref: aboutRef, inView: aboutInView } = useInView(observerOptions);
  const { ref: achievementsRef, inView: achievementsInView } = useInView(observerOptions);
  const { ref: philosophyRef, inView: philosophyInView } = useInView(observerOptions);

  return (
    <div className="relative min-h-screen">
      {/* 交互式粒子背景 */}
      <ParticleBackground />
      
      {/* 随动聚光灯 */}
      <div 
        className="fixed pointer-events-none w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[100px] -z-10 transition-transform duration-500 ease-out"
        style={{ transform: `translate(${mousePos.x - 250}px, ${mousePos.y - 250}px)` }}
      />

      <AiChat />

      {/* 导航 */}
      <nav className={`fixed top-0 w-full z-50 px-6 py-4 md:px-12 transition-all duration-300 ${scrolled ? 'glass border-b border-white/10 shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-black tracking-tighter">
            <span className="text-white">NIU</span> 
            <span className="text-cyan-400 ml-1">YUWEN</span>
          </div>
          <div className="flex gap-6 text-[10px] uppercase tracking-[0.3em] font-bold">
            <a href="#about" className="hover:text-cyan-400 transition-colors">关于</a>
            <a href="#achievements" className="hover:text-cyan-400 transition-colors">成就</a>
            <a href="#philosophy" className="hover:text-cyan-400 transition-colors">理念</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Empowering Youth with AI
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none">
            <span className="font-sinology text-white">牛渝文</span><br/>
            <span className="text-gradient">CREATOR</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            {PERSONAL_INFO.motto} <span className="text-slate-600">/</span> <span className="text-white">数字时代的跨界实战派</span>
          </p>
          
          <div className="pt-8 flex flex-wrap justify-center gap-4">
            <a href="#achievements" className="group px-8 py-3.5 rounded-full bg-white text-slate-900 font-bold hover:bg-cyan-400 hover:text-white transition-all transform hover:scale-105 flex items-center gap-2">
              查看成就
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="mailto:contact@yuwen.ai" className="px-8 py-3.5 rounded-full glass border border-white/20 hover:border-white/50 transition-all font-semibold">
              联系合作
            </a>
          </div>
        </div>
      </header>

      {/* 数据概览 */}
      <section id="about" ref={aboutRef} className={`py-32 px-6 reveal ${aboutInView ? 'reveal-visible' : ''}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: '年龄', value: '21', desc: 'Gen Z 创业先行者', icon: <Calendar />, color: 'text-cyan-400' },
            { label: '坐标', value: '西安', desc: '在古都驱动数字创新', icon: <MapPin />, color: 'text-indigo-400' },
            { label: '影响力', value: '1w+', desc: '校园社群流量实战专家', icon: <Sparkles />, color: 'text-purple-400' }
          ].map((stat, i) => (
            <div key={i} className="glass p-10 rounded-3xl border border-white/10 hover:border-cyan-400/30 transition-all group">
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color} mb-6 border border-white/10 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <h3 className="text-4xl font-black text-white mb-1">{stat.value}</h3>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">{stat.label}</p>
              <p className="text-slate-400 text-sm">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 核心履历 */}
      <section id="achievements" ref={achievementsRef} className={`py-32 px-6 reveal ${achievementsInView ? 'reveal-visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white">
              核心 <span className="text-gradient">履历</span>
            </h2>
            <div className="w-20 h-1 bg-cyan-400 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((item, index) => (
              <div key={index} className="glass p-8 rounded-2xl border border-white/5 hover:bg-white/5 transition-all flex items-center gap-5">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-white/10 shadow-lg">
                  {CATEGORY_ICONS[item.category]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-sm leading-tight">{item.title}</h4>
                  <span className="text-[8px] uppercase tracking-[0.2em] text-slate-500 mt-1 block">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 品牌理念 */}
      <section id="philosophy" ref={philosophyRef} className={`py-40 px-6 reveal ${philosophyInView ? 'reveal-visible' : ''}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] glass rounded-[40px] overflow-hidden p-2">
              <img src="https://picsum.photos/seed/niu-yuwen/800/1000" alt="Niu Yuwen" className="w-full h-full object-cover rounded-[32px] opacity-80 hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase">Vision</span>
              <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter">
                驱动 <span className="font-sinology text-cyan-400">数字未来</span>
              </h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed">
              我是牛渝文，致力于将 <span className="text-white font-medium">生成式 AI</span> 与 <span className="text-white font-medium">传统文化洞察</span> 深度耦合。我认为技术释放的是人类最深层的创造力。
            </p>
            <div className="pt-4">
              <div className="p-6 rounded-2xl glass border-cyan-400/20 inline-block">
                <p className="font-sinology italic text-slate-200">"以 AI 驱动效率之轮，以文化筑牢智慧之基。"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-slate-950/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tighter">牛渝文 <span className="text-gradient">NIU</span></h2>
            <p className="text-slate-500 text-[9px] tracking-[0.3em] uppercase font-bold mt-1">Innovation • Strategy • Culture</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors"><Github size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors"><Linkedin size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors"><Mail size={18} /></a>
          </div>
          <p className="text-slate-600 text-[8px] font-bold tracking-[0.2em] uppercase">© 2024 NIU YUWEN DIGITAL ARCHIVE.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
