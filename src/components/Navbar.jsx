// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar({ onPrivacyClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['inicio', 'servicios', 'portafolio', 'testimonios', 'certificaciones', 'contacto'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); handleScroll('inicio'); }}>
          <span className="logo-gradient">Integra-IO</span>
          <span className="logo-dot"></span>
        </a>
        
        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="#inicio" className={activeSection === 'inicio' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleScroll('inicio'); }}>Inicio</a></li>
            <li><a href="#servicios" className={activeSection === 'servicios' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleScroll('servicios'); }}>Servicios</a></li>
            <li><a href="#portafolio" className={activeSection === 'portafolio' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleScroll('portafolio'); }}>Portafolio</a></li>
            <li><a href="#testimonios" className={activeSection === 'testimonios' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleScroll('testimonios'); }}>Testimonios</a></li>
            <li><a href="#certificaciones" className={activeSection === 'certificaciones' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleScroll('certificaciones'); }}>Certificaciones</a></li>
            <li><a href="#contacto" className={activeSection === 'contacto' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleScroll('contacto'); }}>Contacto</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onPrivacyClick(); }}>Política</a></li>
          </ul>
        </div>
        
        <div className="nav-actions">
          <a href="https://crm.integra-io.com" target="_blank" className="btn-ingresar" rel="noopener noreferrer">
            <i className="fas fa-user"></i>
            <span>Ingresar</span>
          </a>
          <button 
            className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;