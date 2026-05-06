// components/Services.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Services.css';

const servicesData = [
  {
    id: 1,
    title: "Cableado Estructurado",
    description: "Instalación profesional de redes de cobre Cat6A/Cat7 y fibra óptica con certificación internacional.",
    icon: "fa-network-wired",
    category: "infraestructura",
    gradient: "gradient-blue",
    features: ["Certificación Fluke", "Garantía 5 años", "Documentación completa"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    fullData: {
      title: "Cableado Estructurado",
      description: "Instalación profesional con certificación internacional. Incluye diseño, tendido, certificación y documentación.",
      images: Array(9).fill().map((_, i) => ({
        src: `https://picsum.photos/id/${1015 + i * 20}/800/600`,
        desc: `Cableado Estructurado - Imagen ${i + 1}`
      }))
    }
  },
  {
    id: 2,
    title: "Redes Informáticas",
    description: "Diseño e implementación de redes LAN y WiFi empresarial de alta densidad.",
    icon: "fa-wifi",
    category: "infraestructura",
    gradient: "gradient-purple",
    features: ["WiFi 6/E", "Seguridad avanzada", "SD-WAN"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    fullData: {
      title: "Redes Informáticas",
      description: "Redes LAN, WiFi empresarial de alta densidad y SD-WAN.",
      images: Array(9).fill().map((_, i) => ({
        src: `https://picsum.photos/id/${200 + i * 15}/800/600`,
        desc: `Redes - Imagen ${i + 1}`
      }))
    }
  },
  {
    id: 3,
    title: "Plataformas SaaS",
    description: "Implementación de soluciones en la nube y migración de datos empresariales.",
    icon: "fa-cloud",
    category: "cloud",
    gradient: "gradient-cyan",
    features: ["Alta disponibilidad", "Escalabilidad", "Backup automático"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    fullData: {
      title: "Plataformas SaaS",
      description: "Implementación de soluciones en la nube, migración de datos y optimización de costos.",
      images: Array(9).fill().map((_, i) => ({
        src: `https://picsum.photos/id/${300 + i * 25}/800/600`,
        desc: `SaaS - Imagen ${i + 1}`
      }))
    }
  },
  {
    id: 4,
    title: "Servidores VPS",
    description: "Configuración y administración de servidores virtuales con alta disponibilidad.",
    icon: "fa-server",
    category: "cloud",
    gradient: "gradient-green",
    features: ["Monitoreo 24/7", "Respaldos diarios", "Soporte dedicado"],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800",
    fullData: {
      title: "Servidores VPS",
      description: "Configuración y administración de servidores virtuales con alta disponibilidad y respaldos automáticos.",
      images: Array(9).fill().map((_, i) => ({
        src: `https://picsum.photos/id/${400 + i * 30}/800/600`,
        desc: `VPS - Configuración ${i + 1}`
      }))
    }
  },
  {
    id: 5,
    title: "Mesa de Ayuda",
    description: "Soporte técnico 24/7 con atención personalizada y resolución remota.",
    icon: "fa-headset",
    category: "soporte",
    gradient: "gradient-orange",
    features: ["SLA garantizado", "Personal certificado", "Resolución rápida"],
    image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=800",
    fullData: {
      title: "Mesa de Ayuda",
      description: "Soporte técnico 24/7 con atención personalizada y resolución remota de incidentes.",
      images: Array(9).fill().map((_, i) => ({
        src: `https://picsum.photos/id/${500 + i * 35}/800/600`,
        desc: `Soporte - Atención ${i + 1}`
      }))
    }
  },
  {
    id: 6,
    title: "Casa Inteligente",
    description: "Automatización residencial completa con control desde cualquier lugar.",
    icon: "fa-home",
    category: "infraestructura",
    gradient: "gradient-pink",
    features: ["IoT integrado", "Asistentes de voz", "Eficiencia energética"],
    image: "https://images.unsplash.com/photo-1558002038-1055e2e28e1c?w=800",
    fullData: {
      title: "Casa Inteligente",
      description: "Automatización residencial completa: iluminación, climatización, persianas, seguridad y entretenimiento.",
      images: Array(9).fill().map((_, i) => ({
        src: `https://picsum.photos/id/${600 + i * 40}/800/600`,
        desc: `Home Automation - Feature ${i + 1}`
      }))
    }
  },
  {
    id: 7,
    title: "Ensamble y Reparación",
    description: "Ensamble de equipos personalizados y reparación de hardware especializado.",
    icon: "fa-tools",
    category: "soporte",
    gradient: "gradient-red",
    features: ["Componentes originales", "Diagnóstico preciso", "Garantía"],
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800",
    fullData: {
      title: "Ensamble y Reparación",
      description: "Ensamble de equipos personalizados, reparación de hardware y mantenimiento preventivo.",
      images: Array(9).fill().map((_, i) => ({
        src: `https://picsum.photos/id/${700 + i * 45}/800/600`,
        desc: `Reparación - Proceso ${i + 1}`
      }))
    }
  },
  {
    id: 8,
    title: "Cloud Backup",
    description: "Soluciones de respaldo en la nube con recuperación ante desastres.",
    icon: "fa-database",
    category: "cloud",
    gradient: "gradient-blue",
    features: ["Backup automático", "Recuperación rápida", "Cifrado AES-256"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    fullData: {
      title: "Cloud Backup",
      description: "Soluciones de respaldo en la nube con recuperación ante desastres.",
      images: Array(9).fill().map((_, i) => ({
        src: `https://picsum.photos/id/${800 + i * 20}/800/600`,
        desc: `Cloud Backup - Imagen ${i + 1}`
      }))
    }
  },
  {
    id: 9,
    title: "Ciberseguridad",
    description: "Protección integral contra amenazas cibernéticas y auditorías de seguridad.",
    icon: "fa-shield-alt",
    category: "soporte",
    gradient: "gradient-purple",
    features: ["Firewall avanzado", "Antivirus empresarial", "Auditoría continua"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    fullData: {
      title: "Ciberseguridad",
      description: "Protección integral contra amenazas cibernéticas y auditorías de seguridad.",
      images: Array(9).fill().map((_, i) => ({
        src: `https://picsum.photos/id/${900 + i * 15}/800/600`,
        desc: `Ciberseguridad - Imagen ${i + 1}`
      }))
    }
  }
];

function Services({ onServiceClick }) {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [filteredServices, setFilteredServices] = useState(servicesData);
  const [animateCards, setAnimateCards] = useState(false);
  const sectionRef = useRef(null);

  // Filtrar servicios según categoría seleccionada
  useEffect(() => {
    setAnimateCards(true);
    
    const timer = setTimeout(() => {
      if (activeFilter === 'todos') {
        setFilteredServices(servicesData);
      } else {
        setFilteredServices(servicesData.filter(service => service.category === activeFilter));
      }
      setAnimateCards(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeFilter]);

  // Observer para animaciones de scroll
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
    
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  // Contar servicios por categoría
  const getCountByCategory = (category) => {
    if (category === 'todos') return servicesData.length;
    return servicesData.filter(s => s.category === category).length;
  };

  const filters = [
    { id: 'todos', label: 'Todos', icon: 'fa-th-large' },
    { id: 'infraestructura', label: 'Infraestructura', icon: 'fa-building' },
    { id: 'cloud', label: 'Cloud', icon: 'fa-cloud' },
    { id: 'soporte', label: 'Soporte', icon: 'fa-headset' }
  ];

  return (
    <section id="servicios" ref={sectionRef}>
      <div className="container">
        <h2 className="reveal">Nuestros Servicios</h2>
        
        {/* Filtros */}
        <div className="services-filter reveal">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <i className={`fas ${filter.icon}`}></i>
              <span>{filter.label}</span>
              <span className="filter-count">{getCountByCategory(filter.id)}</span>
            </button>
          ))}
        </div>

        {/* Indicador de resultados */}
        <div className="filter-results reveal">
          <p>
            Mostrando <strong>{filteredServices.length}</strong> de{' '}
            <strong>{servicesData.length}</strong> servicios
          </p>
        </div>

        {/* Grid de servicios con animación de filtrado */}
        <div className={`services-grid ${animateCards ? 'animating' : ''}`}>
          {filteredServices.map((service, index) => (
            <div 
              key={service.id} 
              className={`service-card reveal`}
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => onServiceClick(service.fullData)}
            >
              <div className={`service-icon ${service.gradient}`}>
                <i className={`fas ${service.icon}`}></i>
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-features">
                  {service.features.map((feature, i) => (
                    <span key={i} className="feature-tag">
                      <i className="fas fa-check-circle"></i>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="service-category-badge">
                <span className={`category-badge ${service.category}`}>
                  {service.category === 'infraestructura' && <i className="fas fa-building"></i>}
                  {service.category === 'cloud' && <i className="fas fa-cloud"></i>}
                  {service.category === 'soporte' && <i className="fas fa-headset"></i>}
                  {service.category === 'infraestructura' ? ' Infraestructura' : 
                   service.category === 'cloud' ? ' Cloud' : ' Soporte'}
                </span>
              </div>
              <div className="service-overlay"></div>
              <div className="service-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje cuando no hay resultados */}
        {filteredServices.length === 0 && (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <h3>No se encontraron servicios</h3>
            <p>Prueba con otra categoría</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Services;