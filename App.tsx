
import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import AiChat from './components/AiChat';
import { ACHIEVEMENTS, PERSONAL_INFO, CATEGORY_ICONS } from './constants';
import { MapPin, Calendar, Sparkles, BookOpen, Github, Linkedin, Mail, ArrowRight, ExternalLink } from 'lucide-react';
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

  // 配置滚动揭示动画
  const observerOptions = { threshold: 0.15, triggerOnce: true };
  const { ref: aboutRef, inView: aboutInView } = useInView(observerOptions);
  const { ref: achievementsRef, inView: achievementsInView } = useInView(observerOptions);
  const { ref: philosophyRef, inView: philosophyInView } = useInView(observerOptions);

  return (
    <div className="relative min-h-screen text-slate-200 selection:bg-cyan-500/30">
      <ParticleBackground />
      
      {/* 全局随动光源 */}
      <div 
        className="fixed pointer-events-none w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px] -z-20 transition-transform duration-300 ease-out"
        style={{ 
          transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)` 
        }}
      />

      <AiChat />

      {/* 导航栏 */}
      <nav className={`fixed top-0 w-full z-40 px-6 py-5 md:px-12 transition-all duration-500 ${scrolled ? 'glass border-b border-white/5 py-4' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-black tracking-tighter cursor-default group">
            <span className="text-white group-hover:text-cyan-400 transition-colors">NIU</span> 
            <span className="text-cyan-400 group-hover:text-white transition-colors ml-1">YUWEN</span>
          </div>
          <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold">
            <a href="#about" className="hover:text-cyan-400 transition-colors">关于</a>
            <a href="#achievements" className="hover:text-cyan-400 transition-colors">成就</a>
            <a href="#philosophy" className="hover:text-cyan-400 transition-colors">理念</a>
          </div>
        </div>
      </nav>

      {/* Hero Section - 移除 Reveal 以便首屏立即可见 */}
      <header className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="z-10 text-center max-w-5xl space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 text-[10px] font-bold tracking-[0.2em] uppercase">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Empowering Youth with AI
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-tight">
            <span className="font-sinology block md:inline text-white drop-shadow-xl">牛渝文</span>
            <span className="text-gradient md:ml-4">CREATOR</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            {PERSONAL_INFO.motto} <span className="text-slate-600">/</span> <span className="text-white">数字时代的跨界实战派</span>
          </p>
          
          <div className="pt-10 flex flex-wrap justify-center gap-6">
            <a href="#achievements" className="group px-10 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-cyan-400 hover:text-white transition-all transform hover:scale-105 flex items-center gap-2">
              核心成就
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button onClick={() => window.location.href='mailto:contact@yuwen.ai'} className="px-10 py-4 rounded-full glass border border-white/20 hover:border-white/50 transition-all font-semibold">
              联系合作
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-500 opacity-40">
          <span className="text-[9px] uppercase tracking-[0.3em]">Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400 to-transparent animate-bounce" />
        </div>
      </header>

      {/* 数据卡片 */}
      <section id="about" ref={aboutRef} className={`py-32 px-6 relative reveal ${aboutInView ? 'reveal-visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: '年龄 / Age', value: '21', desc: 'Gen Z 创业先行者', icon: <Calendar />, color: 'text-cyan-400' },
              { label: '坐标 / Location', value: '西安', desc: '在古都驱动数字创新', icon: <MapPin />, color: 'text-indigo-400' },
              { label: '流量 / Impact', value: '1w+', desc: '校园社群流量实战专家', icon: <Sparkles />, color: 'text-purple-400' }
            ].map((stat, i) => (
              <div key={i} className="glass glow-card p-10 rounded-[32px] transition-all group backdrop-blur-xl">
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color} mb-8 border border-white/10 group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">{stat.label}</p>
                  <h3 className="text-5xl font-black text-white tracking-tighter">{stat.value}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 履历墙 */}
      <section id="achievements" ref={achievementsRef} className={`py-32 px-6 relative reveal ${achievementsInView ? 'reveal-visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <span className="text-cyan-400 font-bold text-xs tracking-[0.5em] uppercase">The Portfolio</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
                核心 <span className="text-gradient">履历</span>
              </h2>
              <div className="w-24 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" />
            </div>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed border-l-2 border-white/5 pl-6 font-light">
              跨越 AI 技术开发与商业增长，在实践中探索数字化品牌的无限可能。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACHIEVEMENTS.map((item, index) => (
              <div key={index} className="glass glow-card p-8 rounded-2xl group transition-all duration-300 hover:bg-white/5 flex flex-col justify-between min-h-[160px] border border-white/5">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 group-hover:border-cyan-400/50 transition-colors shadow-lg">
                    {CATEGORY_ICONS[item.category]}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:text-cyan-400 transition-colors">
                    {item.category}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-100 leading-tight group-hover:text-white transition-colors">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 品牌理念 */}
      <section id="philosophy" ref={philosophyRef} className={`py-40 px-6 relative overflow-hidden reveal ${philosophyInView ? 'reveal-visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="aspect-[4/5] glass rounded-[60px] overflow-hidden transform transition-all duration-700 hover:scale-[1.02] relative z-10 p-2 shadow-2xl">
                 <img src="https://picsum.photos/seed/niu/800/1000" alt="Profile" className="w-full h-full object-cover rounded-[52px] opacity-90 transition-all duration-1000 grayscale hover:grayscale-0" />
                 <div className="absolute bottom-10 left-10 right-10 z-20">
                    <div className="glass p-6 rounded-[32px] border-white/20 backdrop-blur-2xl">
                      <p className="text-sm italic text-slate-100 leading-relaxed font-sinology tracking-wide">
                        "在数据的洪流中，保持对人文智慧的守望。"
                      </p>
                    </div>
                 </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-12">
              <div className="space-y-4">
                <span className="text-cyan-400 font-bold text-xs tracking-[0.5em] uppercase">Core Mission</span>
                <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tighter">
                  驱动 <span className="font-sinology text-cyan-400">数字未来</span> <br />
                  秉承 <span className="font-sinology text-amber-500">人文精神</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed font-light">
                <p>
                  我是牛渝文，一名致力于将 <span className="text-white font-medium">生成式 AI</span> 与 <span className="text-white font-medium">传统文化洞察</span> 深度耦合的实践者。
                </p>
                <p className="border-l-4 border-cyan-400/50 pl-6 py-2 italic text-slate-300 bg-white/5 rounded-r-xl">
                  我认为：真正的创新不只是算法的迭代，更是如何通过技术释放人类文明最深处的创造本能。
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="p-8 rounded-[40px] glass border-cyan-400/20 text-center">
                  <h5 className="text-4xl font-black text-white mb-2">150+</h5>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Solutions Provided</p>
                </div>
                <div className="p-8 rounded-[40px] glass border-purple-400/20 text-center">
                  <h5 className="text-4xl font-black text-white mb-2">12k+</h5>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Student Reach</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-24 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tighter text-white">牛渝文 <span className="text-gradient">NIU</span></h2>
            <p className="text-slate-500 text-[10px] tracking-[0.5em] uppercase font-bold mt-2">Innovation • Strategy • Culture</p>
          </div>
          
          <div className="flex gap-4">
             {[<Github size={20} />, <Linkedin size={20} />, <Mail size={20} />].map((icon, i) => (
               <a key={i} href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all transform hover:-translate-y-2">
                 {icon}
               </a>
             ))}
          </div>

          <div className="text-slate-600 text-[9px] font-bold tracking-[0.3em] uppercase text-center md:text-right">
            <p>© 2024 NIU YUWEN DIGITAL ARCHIVE.</p>
            <p className="mt-2 flex items-center justify-center md:justify-end gap-3">
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" /> XI'AN HUB</span>
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> POWERED BY AI</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
