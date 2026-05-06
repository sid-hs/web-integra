// components/ServiceModal.jsx
import React, { useState, useEffect } from 'react';
import './ServiceModal.css';

function ServiceModal({ isOpen, onClose, service, onImageClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
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

  if (!isOpen || !service) return null;

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlide < service.images.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{service.title}</h3>
          <span className="close-modal" onClick={onClose}>×</span>
        </div>
        <div className="modal-body">
          <div className="carousel">
            <button className="carousel-btn carousel-prev" onClick={prevSlide}>‹</button>
            <div className="carousel-inner" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {service.images.map((img, idx) => (
                <div key={idx} className="carousel-item">
                  <img
                    src={img.src}
                    alt={img.desc}
                    onClick={() => onImageClick(img)}
                  />
                </div>
              ))}
            </div>
            <button className="carousel-btn carousel-next" onClick={nextSlide}>›</button>
          </div>
          <div className="carousel-dots">
            {service.images.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${currentSlide === idx ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              />
            ))}
          </div>
          <p className="modal-description">{service.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ServiceModal;