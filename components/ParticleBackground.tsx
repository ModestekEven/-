
import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    const colors = ['#22d3ee', '#818cf8', '#d946ef', '#3b82f6', '#f472b6'];

    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 250,
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      baseSize: number;
      opacity: number;
      life: number;
      isBurst: boolean;

      constructor(x: number, y: number, color: string, isBurst = false) {
        this.x = x;
        this.y = y;
        this.isBurst = isBurst;
        
        if (isBurst) {
          const angle = Math.random() * Math.PI * 2;
          const force = Math.random() * 8 + 2;
          this.vx = Math.cos(angle) * force;
          this.vy = Math.sin(angle) * force;
          this.life = 1.0;
        } else {
          this.vx = (Math.random() - 0.5) * 1.2;
          this.vy = (Math.random() - 0.5) * 1.2;
          this.life = -1; // Permanent
        }
        
        this.baseSize = Math.random() * 2 + 1;
        this.size = this.baseSize;
        this.color = color;
        this.opacity = isBurst ? 1 : 0.6;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Add glow effect
        ctx.shadowBlur = this.isBurst ? 15 : 5;
        ctx.shadowColor = this.color;
        
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.isBurst ? this.life : this.opacity;
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.isBurst) {
          this.life -= 0.02;
          this.vx *= 0.96; // Friction
          this.vy *= 0.96;
        } else {
          // Bounce off edges
          if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
          if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;

          // Mouse interaction: move away from cursor
          if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
              const force = (mouse.radius - distance) / mouse.radius;
              const angle = Math.atan2(dy, dx);
              this.x -= Math.cos(angle) * force * 3;
              this.y -= Math.sin(angle) * force * 3;
              this.size = this.baseSize + force * 5;
            } else {
              this.size = this.baseSize;
            }
          } else {
            this.size = this.baseSize;
          }
        }

        this.draw();
      }
    }

    const init = () => {
      particles = [];
      const particleCount = (canvas.width * canvas.height) / 7000;
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color));
      }
    };

    const drawConnections = () => {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].isBurst) continue;
        for (let j = i + 1; j < particles.length; j++) {
          if (particles[j].isBurst) continue;
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (1 - (distance / 150)) * 0.25;
            ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and filter out dead burst particles
      particles = particles.filter(p => !p.isBurst || p.life > 0);
      particles.forEach(p => p.update());
      
      drawConnections();

      // Mouse-to-Particle dynamic connections
      if (mouse.x !== null && mouse.y !== null) {
        particles.forEach(p => {
          if (p.isBurst) return;
          const dx = mouse.x! - p.x;
          const dy = mouse.y! - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const opacity = (1 - (dist / 180)) * 0.4;
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x!, mouse.y!);
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const createBurst = (x: number, y: number) => {
      for (let i = 0; i < 20; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color, true));
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleClick = (e: MouseEvent) => {
      createBurst(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);
    window.addEventListener('mouseleave', handleMouseLeave);

    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-90"
    />
  );
};

export default ParticleBackground;
