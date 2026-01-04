
import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import AiChat from './components/AiChat';
import { ACHIEVEMENTS, PERSONAL_INFO, CATEGORY_ICONS } from './constants';
import { MapPin, Calendar, Sparkles, BookOpen, User, Github, Linkedin, Mail, ArrowRight, ExternalLink } from 'lucide-react';

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

  return (
    <div className="relative min-h-screen text-slate-200 selection:bg-cyan-500/30 overflow-x-hidden bg-transparent">
      {/* High-Performance Interactive Particle Layer */}
      <ParticleBackground />
      
      {/* Dynamic Cursor Light Path */}
      <div 
        className="fixed pointer-events-none w-[800px] h-[800px] rounded-full bg-gradient-to-r from-cyan-500/10 via-indigo-500/5 to-purple-500/10 blur-[150px] -z-20 transition-transform duration-500 ease-out will-change-transform"
        style={{ 
          transform: `translate(${mousePos.x - 400}px, ${mousePos.y - 400}px)` 
        }}
      />

      <AiChat />

      {/* Navigation - Glassmorphism applied on scroll */}
      <nav className={`fixed top-0 w-full z-40 px-6 py-6 md:px-12 transition-all duration-500 ${scrolled ? 'bg-slate-950/40 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter cursor-default group">
            <span className="text-white group-hover:text-cyan-400 transition-colors">NIU</span> 
            <span className="text-cyan-400 group-hover:text-white transition-colors ml-1">YUWEN</span>
          </div>
          <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.4em] font-bold">
            <a href="#about" className="hover:text-cyan-400 transition-colors relative group">
              关于作者
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full" />
            </a>
            <a href="#achievements" className="hover:text-cyan-400 transition-colors relative group">
              实战成就
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full" />
            </a>
            <a href="#philosophy" className="hover:text-cyan-400 transition-colors relative group">
              核心理念
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full" />
            </a>
          </div>
          <div className="md:hidden">
            {/* Mobile menu icon placeholder */}
            <div className="w-6 h-1 bg-white mb-1" />
            <div className="w-6 h-1 bg-white" />
          </div>
        </div>
      </nav>

      {/* Hero Section - Maximum impact and transparency */}
      <header className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="z-10 text-center max-w-5xl space-y-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border-white/10 text-[11px] font-bold tracking-[0.3em] uppercase mb-4 animate-in fade-in slide-in-from-top-6 duration-1000 shadow-2xl shadow-cyan-500/5">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse ring-4 ring-cyan-400/20" />
            Youth AI Evangelist
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter mb-4 leading-[0.8] mix-blend-lighten">
            <span className="font-sinology block md:inline mr-8 text-white">牛渝文</span>
            <span className="text-gradient">CREATOR</span>
          </h1>
          
          <p className="text-lg md:text-3xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light tracking-wide animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            {PERSONAL_INFO.motto} <span className="text-slate-500 mx-2">/</span> 
            <span className="text-white font-medium">探索 AI 驱动的数字新国风</span>
          </p>
          
          <div className="pt-12 flex flex-wrap justify-center gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <a href="#achievements" className="group px-12 py-5 rounded-full bg-white text-slate-900 font-bold hover:bg-cyan-400 hover:text-white transition-all transform hover:scale-105 flex items-center gap-3 shadow-2xl shadow-cyan-500/20">
              探索成就
              <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
            </a>
            <button onClick={() => window.location.href='mailto:contact@yuwen.ai'} className="px-12 py-5 rounded-full glass border border-white/20 hover:border-white/60 transition-all font-bold tracking-widest text-sm hover:bg-white/5">
              取得联系
            </button>
          </div>
        </div>

        {/* Dynamic Interaction Hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-slate-500 opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black">Scroll to Begin</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-cyan-400 to-transparent animate-bounce" />
        </div>
      </header>

      {/* Metrics Section */}
      <section id="about" className="py-40 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: '年龄 / Age', value: '21', desc: 'Gen Z 实战派创业先行者', icon: <Calendar />, color: 'text-cyan-400' },
              { label: '坐标 / Location', value: '西安', desc: '在古都西安驱动科技创新', icon: <MapPin />, color: 'text-indigo-400' },
              { label: '流量 / Impact', value: '1w+', desc: '垂直社群流量实战运营经验', icon: <Sparkles />, color: 'text-purple-400' }
            ].map((stat, i) => (
              <div key={i} className="glass glow-card p-12 rounded-[40px] transition-all group relative overflow-hidden backdrop-blur-xl border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={`w-16 h-16 rounded-2xl bg-slate-900/50 flex items-center justify-center ${stat.color} mb-10 border border-white/10 group-hover:scale-110 transition-transform shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="space-y-3 relative z-10">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 font-black">{stat.label}</p>
                  <h3 className="text-6xl font-black text-white tracking-tighter">{stat.value}</h3>
                  <p className="text-slate-400 text-base leading-relaxed font-light">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Grid Section */}
      <section id="achievements" className="py-40 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
            <div className="space-y-6">
              <span className="text-cyan-400 font-bold text-xs tracking-[0.5em] uppercase">Curriculum Vitae</span>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter">
                核心 <span className="text-gradient">履历</span>
              </h2>
              <div className="w-32 h-[3px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-transparent" />
            </div>
            <p className="text-slate-400 max-w-md text-lg leading-relaxed font-light border-l-2 border-cyan-400/30 pl-8">
              从 AI 技术开发者到商业增长顾问，在跨界融合中定义青年创业者的新边界。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ACHIEVEMENTS.map((item, index) => (
              <div key={index} className="glass glow-card p-10 rounded-3xl group transition-all duration-500 hover:bg-white/5 flex flex-col justify-between min-h-[200px] backdrop-blur-md border border-white/5">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 group-hover:border-cyan-400/50 group-hover:shadow-lg group-hover:shadow-cyan-400/10 transition-all">
                    {CATEGORY_ICONS[item.category]}
                  </div>
                  <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-cyan-400 transition-colors">
                      {item.category}
                    </span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-slate-100 leading-tight group-hover:text-white transition-colors">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Showcase Section */}
      <section id="philosophy" className="py-48 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-[120px] rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />
              <div className="aspect-[4/5] glass rounded-[60px] overflow-hidden transform transition-all duration-1000 hover:scale-[1.03] relative z-10 p-3 backdrop-blur-2xl border border-white/10 shadow-2xl">
                 <img src="https://picsum.photos/seed/yuwen-v3/1000/1250" alt="Niu Yuwen Profile" className="w-full h-full object-cover rounded-[50px] opacity-85 grayscale hover:grayscale-0 transition-all duration-1000 ease-out" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                 <div className="absolute bottom-12 left-12 right-12 z-20">
                    <div className="glass p-8 rounded-[32px] border-white/20 backdrop-blur-3xl shadow-2xl">
                      <p className="text-lg italic text-slate-100 leading-relaxed font-sinology tracking-wider">
                        "在数据的荒原中，寻找智慧的绿洲。"
                      </p>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="w-8 h-[1px] bg-cyan-400" />
                        <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">Yuwen Insights</span>
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-12">
              <div className="space-y-6">
                <span className="text-cyan-400 font-bold text-xs tracking-[0.5em] uppercase px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5">Vision & Strategy</span>
                <h2 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                  重塑 <span className="font-sinology text-cyan-400">效率</span> <br />
                  守望 <span className="font-sinology text-amber-500">人文</span>
                </h2>
              </div>
              
              <div className="space-y-8 text-slate-300 text-xl leading-relaxed font-light">
                <p>
                  我是牛渝文，一名致力于将 <span className="text-white font-semibold">生成式 AI</span> 与 <span className="text-white font-semibold">中国传统智慧</span> 深度耦合的实践者。
                </p>
                <p className="border-l-4 border-cyan-400 pl-8 py-2 italic text-slate-400 bg-white/5 rounded-r-2xl">
                  我认为：真正的技术力不在于算法的堆砌，而在于如何通过技术释放人的创造本性。
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="p-10 rounded-[40px] glass border-cyan-400/20 backdrop-blur-2xl hover:bg-white/5 transition-colors group">
                  <h5 className="text-5xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors">150+</h5>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 font-black">Success Case</p>
                </div>
                <div className="p-10 rounded-[40px] glass border-purple-400/20 backdrop-blur-2xl hover:bg-white/5 transition-colors group">
                  <h5 className="text-5xl font-black text-white mb-3 group-hover:text-purple-400 transition-colors">12k+</h5>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 font-black">Active Community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal and Impactful */}
      <footer className="py-32 px-6 border-t border-white/5 relative z-10 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            <div className="space-y-6">
              <h2 className="text-5xl font-black tracking-tighter text-white">牛渝文 <span className="text-gradient">NIU</span></h2>
              <p className="text-slate-500 text-xs tracking-[0.5em] uppercase font-black">Architect • Strategist • Culturist</p>
              <div className="flex gap-4 pt-4">
                 {[
                   { icon: <Github size={22} />, label: 'Github' },
                   { icon: <Linkedin size={22} />, label: 'LinkedIn' },
                   { icon: <Mail size={22} />, label: 'Email' }
                 ].map((social, i) => (
                   <a key={i} href="#" className="w-16 h-16 rounded-[24px] glass flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/60 transition-all transform hover:-translate-y-3 shadow-xl">
                     {social.icon}
                   </a>
                 ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-20">
              <div className="space-y-6">
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Explore</h5>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li><a href="#about" className="hover:text-cyan-400 transition-colors">关于</a></li>
                  <li><a href="#achievements" className="hover:text-cyan-400 transition-colors">履历</a></li>
                  <li><a href="#philosophy" className="hover:text-cyan-400 transition-colors">理念</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Contact</h5>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2">微信联系 <ExternalLink size={12} /></a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2">商业合作 <ExternalLink size={12} /></a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-16 border-t border-white/5 text-slate-600 text-[10px] font-black tracking-[0.4em] uppercase">
            <p>© 2024 NIU YUWEN DIGITAL ARCHIVE. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-12">
              <span className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]" /> XI'AN HUB</span>
              <span className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]" /> POWERED BY GEMINI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
