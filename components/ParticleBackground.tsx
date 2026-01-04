
import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // 优化：禁用透明度层混合提升性能
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    const mouse = { x: -1000, y: -1000, active: false };

    class Particle {
      x: number; y: number; vx: number; vy: number; radius: number;
      
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.15; // 速度减慢
        this.vy = (Math.random() - 0.5) * 0.15;
        this.radius = Math.random() * 1.0 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas!.width;
        if (this.x > canvas!.width) this.x = 0;
        if (this.y < 0) this.y = canvas!.height;
        if (this.y > canvas!.height) this.y = 0;

        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 150 * 150) {
            const force = (150 - Math.sqrt(distSq)) / 1500;
            this.vx += dx * force * 0.01;
            this.vy += dy * force * 0.01;
          }
        }
        
        this.vx *= 0.99;
        this.vy *= 0.99;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 211, 238, 0.2)';
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // 粒子数量进一步压缩，保持极简
      const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 25000), 60);
      particles = Array.from({ length: count }, () => new Particle());
    };

    const drawConnections = () => {
      if (!ctx) return;
      ctx.lineWidth = 0.3;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 120 * 120) {
            const alpha = (1 - Math.sqrt(distSq) / 120) * 0.08;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      // 绘制背景色而不是清空透明度，配合 {alpha: false} 性能更好
      ctx.fillStyle = '#010409';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);
    
    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none opacity-40" />;
};

export default ParticleBackground;
