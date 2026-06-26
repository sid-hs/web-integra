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
    let startTime = performance.now();
    let prevPhase = -1;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const word = 'INTEGRA-IO';
    const letters = word.split('');
    const colors = ['#3b82f6','#60a5fa','#2563eb','#93c5fd','#f97316','#fb923c','#ea580c','#fdba74','#ffffff','#94a3b8'];
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

    const maxSize = Math.min(canvas.width, canvas.height);
    const fontSize = maxSize * 0.20;
    const letterSpacing = fontSize * 0.65;
    const spread = fontSize * 0.3;
    const totalWidth = letters.length * letterSpacing;
    const startX = (canvas.width - totalWidth) / 2;
    const centerY = canvas.height / 2;
    const wordCenterX = canvas.width / 2;
    const wordCenterY = centerY;
    const ppLetter = 200;
    const particles = [];

    letters.forEach((letter, idx) => {
      const cx = startX + idx * letterSpacing + letterSpacing * 0.5;
      const cy = centerY;
      for (let i = 0; i < ppLetter; i++) {
        particles.push({
          char: charset[Math.floor(Math.random() * charset.length)],
          targetChar: letter,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: fontSize * (0.03 + Math.random() * 0.07),
          tx: cx + (Math.random() - 0.5) * spread,
          ty: cy + (Math.random() - 0.5) * spread * 1.5,
          sx: 0, sy: 0,
          orbitAngle: 0, orbitRadius: 0, orbitSpeed: 0.5 + Math.random(),
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.12,
          alpha: 1,
          seed: Math.random() * 100,
        });
      }
    });

    const phaseTimes = [0, 2500, 4500, 6500, 8000];
    const totalDuration = 10000;

    function animate(now) {
      if (!mounted) return;
      const elapsed = now - startTime;

      let phase = 0;
      for (let i = phaseTimes.length - 1; i >= 0; i--) {
        if (elapsed >= phaseTimes[i]) { phase = i; break; }
      }

      if (phase !== prevPhase) {
        if (phase === 1) {
          particles.forEach(p => {
            const dx = p.x - wordCenterX;
            const dy = p.y - wordCenterY;
            p.orbitAngle = Math.atan2(dy, dx);
            p.orbitRadius = Math.sqrt(dx*dx + dy*dy);
          });
        }
        if (phase === 2) {
          particles.forEach(p => { p.sx = p.x; p.sy = p.y; });
        }
        prevPhase = phase;
      }

      const phaseEnd = phase < 3 ? phaseTimes[phase + 1] : totalDuration;
      const pt = (elapsed - phaseTimes[phase]) / (phaseEnd - phaseTimes[phase]);

      const solidTextAlpha = Math.min(Math.max((elapsed - 5000) / 1500, 0), 1) * (phase < 4 ? 1 : Math.max(1 - pt, 0));

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle glow behind text position
      if (solidTextAlpha > 0) {
        const gradient = ctx.createRadialGradient(wordCenterX, wordCenterY, 0, wordCenterX, wordCenterY, fontSize * 4);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${0.15 * solidTextAlpha})`);
        gradient.addColorStop(0.5, `rgba(249, 115, 22, ${0.08 * solidTextAlpha})`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      particles.forEach(p => {
        switch (phase) {
          case 0:
            p.x += Math.sin(elapsed * 0.004 * p.seed) * 5
                 + Math.cos(elapsed * 0.006 * p.seed * 1.3) * 3;
            p.y += Math.cos(elapsed * 0.003 * p.seed) * 5
                 + Math.sin(elapsed * 0.007 * p.seed * 0.7) * 3;
            p.rot += p.rotSpeed * 2;
            break;
          case 1: {
            p.orbitAngle += p.orbitSpeed * 0.04;
            p.orbitRadius *= 0.998;
            p.x = wordCenterX + p.orbitRadius * Math.cos(p.orbitAngle);
            p.y = wordCenterY + p.orbitRadius * Math.sin(p.orbitAngle);
            p.rot += p.rotSpeed;
            break;
          }
          case 2: {
            const t = Math.min(pt * 1.3 + (p.seed * 0.003), 1);
            const e = 1 - Math.pow(1 - t, 3);
            p.x = p.sx + (p.tx - p.sx) * e;
            p.y = p.sy + (p.ty - p.sy) * e;
            p.rot *= 0.97;
            if (e > 0.6 && Math.random() < 0.05) {
              p.char = p.targetChar;
            }
            break;
          }
          case 3:
            p.x += (p.tx - p.x) * 0.03;
            p.y += (p.ty - p.y) * 0.03;
            p.rot *= 0.96;
            if (Math.random() < 0.03) p.char = p.targetChar;
            break;
          case 4: {
            const t = Math.min(pt, 1);
            const speed = 3 + t * 15;
            p.x += (Math.random() - 0.5) * speed;
            p.y += (Math.random() - 0.5) * speed;
            p.rot += p.rotSpeed * t * 3;
            p.alpha = Math.max(1 - t * 1.2, 0);
            break;
          }
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.font = `${p.size}px "Courier New", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      });

      if (solidTextAlpha > 0) {
        const textSize = maxSize * 0.12;
        ctx.save();
        ctx.globalAlpha = solidTextAlpha;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Glow layers
        ctx.shadowColor = '#3b82f6';
        ctx.shadowBlur = textSize * 0.5;
        ctx.font = `900 ${textSize}px "Orbitron", monospace`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText('INTEGRA-IO', wordCenterX, wordCenterY);

        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = textSize * 0.3;
        ctx.fillStyle = '#ffffff';
        ctx.fillText('INTEGRA-IO', wordCenterX, wordCenterY);

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.fillText('INTEGRA-IO', wordCenterX, wordCenterY);
        ctx.restore();
      }

      if (elapsed >= totalDuration) {
        if (mounted) onComplete();
        return;
      }

      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);

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