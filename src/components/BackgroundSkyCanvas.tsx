import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  color: string;
}

export const BackgroundSkyCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create stars
    const starsCount = Math.floor((width * height) / 3200);
    const stars: Star[] = [];
    for (let i = 0; i < starsCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.85,
        radius: Math.random() * 1.5 + 0.3,
        baseAlpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Floating Stardust Particles
    const particlesCount = Math.floor(width / 35);
    const particles: Particle[] = [];
    const colors = [
      'rgba(212, 175, 55, ',   // Gold
      'rgba(232, 180, 184, ',  // Rose Gold
      'rgba(255, 242, 203, ',  // Soft Cream
      'rgba(183, 110, 121, ',  // Soft Crimson
    ];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.15,
        alpha: Math.random() * 0.5 + 0.1,
        maxAlpha: Math.random() * 0.6 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // 1. Dark Navy Sky Base Gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
      skyGradient.addColorStop(0, '#03050d');
      skyGradient.addColorStop(0.4, '#080d21');
      skyGradient.addColorStop(0.85, '#0e1633');
      skyGradient.addColorStop(1, '#060a17');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Aurora Waves Animation (3 subtle luxury waves)
      const drawAuroraWave = (
        yOffsetRatio: number,
        amplitude: number,
        frequency: number,
        colorStart: string,
        colorEnd: string,
        speedMultiplier: number
      ) => {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        const yBase = height * yOffsetRatio;
        const grad = ctx.createLinearGradient(0, yBase - 150, 0, yBase + 250);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(0.3, colorStart);
        grad.addColorStop(0.7, colorEnd);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, yBase);

        for (let x = 0; x <= width; x += 15) {
          const wave1 = Math.sin(x * frequency + time * speedMultiplier) * amplitude;
          const wave2 = Math.cos(x * (frequency * 0.5) - time * (speedMultiplier * 0.7)) * (amplitude * 0.5);
          const y = yBase + wave1 + wave2;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      };

      // Aurora 1: Deep Rose Gold & Magenta Bloom
      drawAuroraWave(
        0.3,
        45,
        0.003,
        'rgba(183, 110, 121, 0.12)',
        'rgba(232, 180, 184, 0.04)',
        0.8
      );

      // Aurora 2: Celestial Gold Wave
      drawAuroraWave(
        0.4,
        60,
        0.002,
        'rgba(212, 175, 55, 0.14)',
        'rgba(243, 229, 171, 0.03)',
        1.2
      );

      // Aurora 3: Deep Royal Violet & Emerald Glow
      drawAuroraWave(
        0.25,
        35,
        0.004,
        'rgba(88, 28, 135, 0.10)',
        'rgba(13, 148, 136, 0.05)',
        0.6
      );

      // 3. Glowing Luminous Moon (Top Right)
      const moonX = width * 0.82;
      const moonY = Math.min(height * 0.18, 160);
      const moonRadius = Math.min(width * 0.07, 50);

      ctx.save();
      // Outer Moon Glow
      const moonGlow = ctx.createRadialGradient(moonX, moonY, moonRadius * 0.2, moonX, moonY, moonRadius * 4);
      moonGlow.addColorStop(0, 'rgba(255, 245, 215, 0.35)');
      moonGlow.addColorStop(0.3, 'rgba(212, 175, 55, 0.15)');
      moonGlow.addColorStop(0.7, 'rgba(232, 180, 184, 0.05)');
      moonGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = moonGlow;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius * 4, 0, Math.PI * 2);
      ctx.fill();

      // Moon Body
      const moonGrad = ctx.createRadialGradient(moonX - moonRadius * 0.3, moonY - moonRadius * 0.3, 0, moonX, moonY, moonRadius);
      moonGrad.addColorStop(0, '#ffffff');
      moonGrad.addColorStop(0.5, '#fef0c7');
      moonGrad.addColorStop(0.85, '#e6ca65');
      moonGrad.addColorStop(1, '#a3821d');
      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // Subtle Moon Crater Shading
      ctx.fillStyle = 'rgba(163, 130, 29, 0.12)';
      ctx.beginPath();
      ctx.arc(moonX - moonRadius * 0.2, moonY + moonRadius * 0.1, moonRadius * 0.25, 0, Math.PI * 2);
      ctx.arc(moonX + moonRadius * 0.25, moonY - moonRadius * 0.15, moonRadius * 0.2, 0, Math.PI * 2);
      ctx.arc(moonX + moonRadius * 0.1, moonY + moonRadius * 0.35, moonRadius * 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 4. Twinkling Stars
      stars.forEach((star) => {
        star.phase += star.twinkleSpeed;
        const currentAlpha = star.baseAlpha + Math.sin(star.phase) * 0.3;
        const alpha = Math.max(0.1, Math.min(1, currentAlpha));

        ctx.fillStyle = `rgba(255, 252, 235, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Extra cross-flare for large stars
        if (star.radius > 1.2 && alpha > 0.6) {
          ctx.strokeStyle = `rgba(212, 175, 55, ${alpha * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.radius * 3, star.y);
          ctx.lineTo(star.x + star.radius * 3, star.y);
          ctx.moveTo(star.x, star.y - star.radius * 3);
          ctx.lineTo(star.x, star.y + star.radius * 3);
          ctx.stroke();
        }
      });

      // 5. Floating Stardust / Fireflies Particles
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(time + p.y * 0.01) * 0.2;
        p.y += p.vy;

        // Reset particle if floating off screen
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Outer particle halo
        ctx.fillStyle = `${p.color}${p.alpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
