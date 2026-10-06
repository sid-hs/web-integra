// App.jsx
import { useState, useEffect, useRef } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServiceModal from './components/ServiceModal';
import PrivacyModal from './components/PrivacyModal';
import Lightbox from './components/Lightbox';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';

const LoadingAnimation = ({ onComplete }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let mounted = true;
    let startTime = null;
    let started = false;

    const WORD = 'INTEGRA-IO';
    const COLORS = ['#3b82f6', '#60a5fa', '#2563eb', '#93c5fd', '#f97316', '#fb923c', '#ea580c', '#fdba74', '#ffffff'];

    // Línea de tiempo de la animación (ms)
    const T_SPIRAL = 2200;  // el destello gira en espiral hacia el centro
    const T_EXPLODE = 3050; // estallido: flash y ondas expansivas
    const T_FORM = 5100;    // las partículas convergen y forman la palabra
    const T_FADE = 7000;    // fundido a negro y salida

    const clamp01 = (v) => Math.min(Math.max(v, 0), 1);

    let wordCenterX = 0;
    let wordCenterY = 0;
    let textSize = 100;
    let wordPoints = [];
    let particles = [];
    let sparks = [];
    let trail = [];
    let exploded = false;

    // Muestrea los píxeles de la palabra para obtener los puntos objetivo
    const layoutWord = () => {
      wordCenterX = canvas.width / 2;
      wordCenterY = canvas.height / 2;
      const sampleSize = 120;
      const fontSpec = `900 ${sampleSize}px Orbitron, "Courier New", monospace`;
      const off = document.createElement('canvas');
      const measureCtx = off.getContext('2d');
      measureCtx.font = fontSpec;
      const wordW = Math.max(Math.ceil(measureCtx.measureText(WORD).width), 1);
      off.width = wordW + 20;
      off.height = Math.ceil(sampleSize * 1.6);
      const octx = off.getContext('2d');
      octx.font = fontSpec;
      octx.textBaseline = 'middle';
      octx.fillStyle = '#fff';
      octx.fillText(WORD, 10, off.height / 2);
      const px = octx.getImageData(0, 0, off.width, off.height).data;
      const maxSize = Math.min(canvas.width, canvas.height);
      const scale = Math.min(canvas.width * 0.82, maxSize * 3.4) / wordW;
      textSize = sampleSize * scale;
      const pts = [];
      for (let y = 0; y < off.height; y += 3) {
        for (let x = 0; x < off.width; x += 3) {
          if (px[(y * off.width + x) * 4 + 3] > 128) {
            pts.push({
              x: wordCenterX + (x - off.width / 2) * scale,
              y: wordCenterY + (y - off.height / 2) * scale,
            });
          }
        }
      }
      for (let i = pts.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [pts[i], pts[j]] = [pts[j], pts[i]];
      }
      const maxPts = Math.max(700, Math.min(2400, Math.round(canvas.width * canvas.height / 520)));
      wordPoints = pts.slice(0, maxPts);
    };

    const spawnParticles = () => {
      particles = wordPoints.map((t) => {
        const ang = Math.random() * Math.PI * 2;
        const sp = 2 + Math.random() * 12;
        return {
          x: wordCenterX + (Math.random() - 0.5) * 8,
          y: wordCenterY + (Math.random() - 0.5) * 8,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp,
          tx: t.x,
          ty: t.y,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          size: 1.3 + Math.random() * 2.2,
          delay: Math.random() * 0.35,
        };
      });
    };

    const retargetParticles = () => {
      if (!particles.length || !wordPoints.length) return;
      particles.forEach((p, i) => {
        const t = wordPoints[i % wordPoints.length];
        p.tx = t.x;
        p.ty = t.y;
      });
    };

    const emitSparks = (x, y) => {
      for (let i = 0; i < 2; i++) {
        sparks.push({
          x, y,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          life: 0,
          maxLife: 26 + Math.random() * 30,
          color: ['#f97316', '#60a5fa', '#ffffff'][(Math.random() * 3) | 0],
          size: 1 + Math.random() * 1.6,
        });
      }
      if (sparks.length > 350) sparks.splice(0, sparks.length - 350);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (started) {
        layoutWord();
        retargetParticles();
      }
    };

    function animate(now) {
      if (!mounted) return;
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const explodedNow = elapsed >= T_SPIRAL;
      if (explodedNow && !exploded) {
        exploded = true;
        spawnParticles();
      }
      const formT = clamp01((elapsed - T_EXPLODE) / (T_FORM - T_EXPLODE));
      const solidAlpha = clamp01((elapsed - (T_FORM - 300)) / 900);
      const fadeT = clamp01((elapsed - (T_FADE - 650)) / 650);

      ctx.globalCompositeOperation = 'lighter';

      // Fase 1: destello girando en espiral hacia el centro
      if (!explodedNow) {
        const prog = clamp01(elapsed / T_SPIRAL);
        const rMax = Math.min(canvas.width, canvas.height) * 0.42;
        const r = rMax * Math.pow(1 - prog, 1.22);
        const theta = -Math.PI / 2 + prog * 4.3 * 2 * Math.PI;
        const cx = wordCenterX + r * Math.cos(theta);
        const cy = wordCenterY + r * Math.sin(theta);
        trail.push({ x: cx, y: cy });
        if (trail.length > 46) trail.shift();
        emitSparks(cx, cy);

        // Estela continua que se afina hacia la cola (naranja → azul → blanco)
        ctx.lineCap = 'round';
        for (let i = 1; i < trail.length; i++) {
          const t = i / trail.length;
          ctx.globalAlpha = t * t * 0.85;
          ctx.strokeStyle = t > 0.8 ? '#ffffff' : (i % 2 ? '#f97316' : '#3b82f6');
          ctx.lineWidth = 0.5 + t * 5;
          ctx.beginPath();
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
          ctx.lineTo(trail[i].x, trail[i].y);
          ctx.stroke();
        }

        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 26);
        glow.addColorStop(0, 'rgba(255,255,255,0.95)');
        glow.addColorStop(0.3, 'rgba(147,197,253,0.7)');
        glow.addColorStop(0.65, 'rgba(59,130,246,0.3)');
        glow.addColorStop(1, 'rgba(59,130,246,0)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = glow;
        ctx.fillRect(cx - 26, cy - 26, 52, 52);
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Chispas que va dejando el destello
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life++;
        if (s.life >= s.maxLife) { sparks.splice(i, 1); continue; }
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.955;
        s.vy *= 0.955;
        ctx.globalAlpha = 1 - s.life / s.maxLife;
        ctx.fillStyle = s.color;
        ctx.fillRect(s.x, s.y, s.size, s.size);
      }

      // Fase 2: estallido en el centro (flash + ondas expansivas)
      if (exploded) {
        const ft = clamp01((elapsed - T_SPIRAL) / 520);
        if (ft < 1) {
          const rad = 30 + ft * 240;
          const flash = ctx.createRadialGradient(wordCenterX, wordCenterY, 0, wordCenterX, wordCenterY, rad);
          flash.addColorStop(0, `rgba(255,255,255,${(1 - ft) * 0.9})`);
          flash.addColorStop(0.3, `rgba(147,197,253,${(1 - ft) * 0.5})`);
          flash.addColorStop(0.65, `rgba(249,115,22,${(1 - ft) * 0.35})`);
          flash.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.globalAlpha = 1;
          ctx.fillStyle = flash;
          ctx.fillRect(wordCenterX - rad, wordCenterY - rad, rad * 2, rad * 2);
        }
        const rings = [
          { rgb: '147,197,253', lag: 0, max: Math.min(canvas.width, canvas.height) * 0.55 },
          { rgb: '251,146,60', lag: 0.12, max: Math.min(canvas.width, canvas.height) * 0.45 },
        ];
        rings.forEach((ring) => {
          const rt = clamp01((elapsed - T_SPIRAL) / 900 - ring.lag);
          if (rt <= 0 || rt >= 1) return;
          const e = 1 - Math.pow(1 - rt, 2);
          ctx.globalAlpha = (1 - rt) * 0.8;
          ctx.strokeStyle = `rgb(${ring.rgb})`;
          ctx.lineWidth = 3 * (1 - rt) + 0.5;
          ctx.beginPath();
          ctx.arc(wordCenterX, wordCenterY, e * ring.max, 0, Math.PI * 2);
          ctx.stroke();
        });
      }

      // Resplandor que anticipa la palabra
      if (solidAlpha > 0) {
        const halo = ctx.createRadialGradient(wordCenterX, wordCenterY, 0, wordCenterX, wordCenterY, textSize * 3);
        halo.addColorStop(0, `rgba(59,130,246,${0.16 * solidAlpha})`);
        halo.addColorStop(0.5, `rgba(249,115,22,${0.09 * solidAlpha})`);
        halo.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = halo;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Fase 3: las partículas del estallido convergen y forman la palabra
      if (exploded) {
        for (const p of particles) {
          if (formT <= 0) {
            p.vx *= 0.94;
            p.vy *= 0.94;
          } else {
            const localT = clamp01((formT - p.delay) / (1 - p.delay));
            if (localT > 0) {
              const dx = p.tx - p.x;
              const dy = p.ty - p.y;
              if (localT < 0.55) {
                const d = Math.hypot(dx, dy) + 1;
                const swirl = 0.4 * (1 - localT / 0.55);
                p.vx += (-dy / d) * swirl;
                p.vy += (dx / d) * swirl;
              }
              const k = 0.004 + localT * 0.03;
              p.vx = (p.vx + dx * k) * 0.87;
              p.vy = (p.vy + dy * k) * 0.87;
            } else {
              p.vx *= 0.95;
              p.vy *= 0.95;
            }
          }
          p.x += p.vx;
          p.y += p.vy;
        }
        const dissolve = 1 - solidAlpha * 0.85;
        for (const p of particles) {
          ctx.globalAlpha = Math.min(1, dissolve);
          ctx.fillStyle = p.color;
          const sz = p.size * (1 - solidAlpha * 0.3);
          ctx.fillRect(p.x - sz / 2, p.y - sz / 2, sz, sz);
        }
      }

      // Palabra sólida con doble resplandor (azul + naranja)
      if (solidAlpha > 0) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        ctx.save();
        ctx.globalAlpha = solidAlpha;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `900 ${textSize}px "Orbitron", monospace`;
        ctx.shadowColor = '#3b82f6';
        ctx.shadowBlur = textSize * 0.5;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(WORD, wordCenterX, wordCenterY);
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = textSize * 0.3;
        ctx.fillText(WORD, wordCenterX, wordCenterY);
        ctx.shadowBlur = 0;
        ctx.fillText(WORD, wordCenterX, wordCenterY);
        ctx.restore();
      }

      // Fundido final a negro
      if (fadeT > 0) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        ctx.fillStyle = `rgba(0,0,0,${fadeT})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (elapsed >= T_FADE) {
        if (mounted) onComplete();
        return;
      }

      animId = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener('resize', resize);

    // Espera la fuente Orbitron (con tope de tiempo) para muestrear la palabra con su tipografía real
    const begin = () => {
      if (!mounted || started) return;
      started = true;
      layoutWord();
      animId = requestAnimationFrame(animate);
    };
    if (document.fonts && document.fonts.load) {
      Promise.race([
        document.fonts.load('900 120px "Orbitron"'),
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]).then(begin, begin);
    } else {
      begin();
    }

    return () => {
      mounted = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [onComplete]);

  return (
    <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'block', background: '#000' }} />
  );
};

function App() {
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [lightboxImage, setLightboxImage] = useState({ src: '', desc: '' });
  const [loading, setLoading] = useState(true);

  const openServiceModal = (service) => {
    setCurrentService(service);
    setServiceModalOpen(true);
  };

  const openLightbox = (image) => {
    setLightboxImage(image);
    setLightboxOpen(true);
  };

  if (loading) {
    return <LoadingAnimation onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="app">
      <CustomCursor />
      <Navbar onPrivacyClick={() => setPrivacyModalOpen(true)} />
      <Hero />
      <Services onServiceClick={openServiceModal} />
      <Portfolio />
      <Testimonials />
      <Certifications />
      <Contact />
      <Footer />
      <ScrollToTop />
      
      <ServiceModal 
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        service={currentService}
        onImageClick={openLightbox}
      />
      
      <PrivacyModal 
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
      
      <Lightbox 
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        image={lightboxImage}
      />
    </div>
  );
}

export default App;