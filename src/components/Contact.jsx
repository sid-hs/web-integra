import React, { useState } from 'react';
import './Contact.css';

const FORMSPREE_URL = 'https://formspree.io/f/mjglowvd';
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setError('Hubo un error al enviar. Intenta de nuevo.');
      }
    } catch {
      setError('Error de conexión. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto">
      <div className="container">
        <h2>Contacto</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>¿Listo para transformar tu infraestructura?</h3>
            <p>Contáctanos y descubre cómo nuestras soluciones pueden impulsar tu negocio.</p>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon"><i className="fas fa-phone"></i></div>
                <div className="method-details">
                  <h4>Teléfono</h4>
                  <p>+52 56 5479 4836</p>
                  <span>Lun-Vie 9:00 - 18:00</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon"><i className="fas fa-envelope"></i></div>
                <div className="method-details">
                  <h4>Email</h4>
                  <p>contacto@integra-io.com</p>
                  <span>Respuesta en 24h</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon"><i className="fas fa-map-marker-alt"></i></div>
                <div className="method-details">
                  <h4>Oficina</h4>
                  <p>Ciudad de Puebla, México</p>
                  <span>Diagonal Defensores de la República 225 - 101A</span>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link"><i className="fab fa-github"></i></a>
              <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <i className="fas fa-user"></i>
            </div>

            <div className="form-row">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <i className="fas fa-envelope"></i>
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <i className="fas fa-phone"></i>
              </div>
            </div>

            <div className="form-group">
              <select name="service" value={formData.service} onChange={handleChange}>
                <option value="">Selecciona un servicio</option>
                <option value="cableado">Cableado Estructurado</option>
                <option value="redes">Redes Informáticas</option>
                <option value="saas">Plataformas SaaS</option>
                <option value="vps">Servidores VPS</option>
                <option value="soporte">Mesa de Ayuda</option>
                <option value="smart">Casa Inteligente</option>
              </select>
              <i className="fas fa-chevron-down"></i>
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Cuéntanos sobre tu proyecto..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <i className="fas fa-comment"></i>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              <span>{loading ? 'Enviando...' : 'Enviar mensaje'}</span>
              <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
            </button>

            {submitted && (
              <div className="success-message">
                <i className="fas fa-check-circle"></i>
                Mensaje enviado correctamente. Te contactaremos pronto.
              </div>
            )}

            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
