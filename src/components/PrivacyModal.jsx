// components/PrivacyModal.jsx
import React, { useEffect } from 'react';
import './PrivacyModal.css';

function PrivacyModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="privacy-modal-overlay" onClick={onClose}>
      <div className="privacy-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="privacy-modal-header">
          <h3>Política de Privacidad</h3>
          <span className="privacy-close-modal" onClick={onClose}>×</span>
        </div>
        <div className="privacy-modal-body">
          <h4>1. Información que recopilamos</h4>
          <p>En Integra-IO recopilamos información que usted nos proporciona directamente, como nombre, correo electrónico, número de teléfono y detalles de su empresa cuando solicita nuestros servicios.</p>
          
          <h4>2. Uso de la información</h4>
          <p>Utilizamos su información para proporcionar y mejorar nuestros servicios, comunicarnos con usted, procesar transacciones y cumplir con requisitos legales.</p>
          
          <h4>3. Protección de datos</h4>
          <p>Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, alteración o divulgación.</p>
          
          <h4>4. Cookies</h4>
          <p>Utilizamos cookies para mejorar su experiencia en nuestro sitio web. Puede controlar las cookies a través de la configuración de su navegador.</p>
          
          <h4>5. Contacto</h4>
          <p>Si tiene preguntas sobre esta política de privacidad, contáctenos a través de privacidad@integra-io.com</p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyModal;