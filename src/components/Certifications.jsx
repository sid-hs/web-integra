// components/Certifications.jsx
import React from 'react';
import './Certifications.css';

const certifications = [
  { name: "ISO 27001", description: "Seguridad de la Información", icon: "fa-shield-alt" },
  { name: "Cisco Certified", description: "Networking Professional", icon: "fa-certificate" },
  { name: "Microsoft Partner", description: "Soluciones Cloud", icon: "fa-microsoft" },
  { name: "CompTIA Security+", description: "Ciberseguridad", icon: "fa-lock" }
];

function Certifications() {
  return (
    <section id="certificaciones">
      <div className="container">
        <h2>Certificaciones</h2>
        <div className="cert-grid">
          {certifications.map((cert, index) => (
            <div key={index} className="cert-card">
              <i className={`fas ${cert.icon}`}></i>
              <h3>{cert.name}</h3>
              <p>{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;