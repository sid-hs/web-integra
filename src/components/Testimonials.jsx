// components/Testimonials.jsx
import React from 'react';
import './Testimonials.css';

const testimonials = [
  { name: "María González", role: "CTO", text: "Excelente servicio técnico y profesionalismo. Recomiendo totalmente Integra-IO.", image: "https://randomuser.me/api/portraits/women/1.jpg" },
  { name: "Carlos Rodríguez", role: "CEO", text: "Transformaron nuestra infraestructura tecnológica. Resultados increíbles.", image: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "Laura Martínez", role: "IT Manager", text: "El mejor soporte técnico que hemos tenido. Siempre disponibles.", image: "https://randomuser.me/api/portraits/women/2.jpg" }
];

function Testimonials() {
  return (
    <section id="testimonios">
      <div className="container">
        <h2>Lo que dicen nuestros clientes</h2>
        <div className="testimonial-grid">
          {testimonials.map((t, index) => (
            <div key={index} className="testimonial-card">
              <img src={t.image} alt={t.name} className="testimonial-img" />
              <p className="testimonial-text">"{t.text}"</p>
              <h4>{t.name}</h4>
              <span>{t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;