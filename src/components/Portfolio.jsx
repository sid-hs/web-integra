// components/Portfolio.jsx
import React from 'react';
import './Portfolio.css';

const portfolioItems = [
  { title: "Data Center Corporativo", category: "Infraestructura", image: "https://picsum.photos/id/102/800/600" },
  { title: "Oficina Inteligente", category: "Automatización", image: "https://picsum.photos/id/106/800/600" },
  { title: "Red WiFi Estadio", category: "Redes", image: "https://picsum.photos/id/180/800/600" },
  { title: "Cloud Migration", category: "SaaS", image: "https://picsum.photos/id/367/800/600" }
];

function Portfolio() {
  return (
    <section id="portafolio">
      <div className="container">
        <h2>Proyectos Destacados</h2>
        <div className="portfolio-grid">
          {portfolioItems.map((item, index) => (
            <div key={index} className="portfolio-card">
              <img src={item.image} alt={item.title} />
              <div className="portfolio-info">
                <h3>{item.title}</h3>
                <p>{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;