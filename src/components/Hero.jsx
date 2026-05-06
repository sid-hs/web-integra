// components/Hero.jsx
import React, { useEffect, useRef } from 'react';
import './Hero.css';

function Hero() {
  const heroRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = heroRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const handleScroll = () => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="inicio" ref={heroRef}>
      <div className="hero-bg">
        <div className="hero-particles"></div>
        <div className="hero-gradient"></div>
      </div>
      
      <div className="container hero-content">
        <div className="hero-badge reveal">
          <i className="fas fa-bolt"></i>
          <span>Soluciones Tecnológicas de Vanguardia</span> 
        </div>
        
        <h1 className="reveal">
          Transformamos tu
          <span className="gradient-text"> Infraestructura Tecnológica</span>
        </h1>
        
        <p className="reveal">
          Integra-IO ofrece soluciones integrales en infraestructura tecnológica 
          para empresas y hogares, con estándares de calidad internacional y 
          soporte 24/7.
        </p>
        
        <div className="hero-buttons reveal">
          <button className="btn-primary" onClick={handleScroll}>
            Solicitar Cotización
            <i className="fas fa-arrow-right"></i>
          </button>
          <button className="btn-secondary" onClick={() => {
            document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <i className="fas fa-play"></i>
            Ver Servicios
          </button>
        </div>
        
        <div className="hero-stats reveal">
          <div className="stat">
            <div className="stat-number">500+</div>
            <div className="stat-label">Proyectos Completados</div>
          </div>
          <div className="stat">
            <div className="stat-number">98%</div>
            <div className="stat-label">Clientes Satisfechos</div>
          </div>
          <div className="stat">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Soporte Técnico</div>
          </div>
        </div>
      </div>
      
      <div className="hero-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="var(--dark)"></path>
        </svg>
      </div>
    </header>
  );
}

export default Hero;