// components/Lightbox.jsx
import React, { useEffect } from 'react';
import './Lightbox.css';

function Lightbox({ isOpen, onClose, image }) {
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
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <span className="lightbox-close" onClick={onClose}>×</span>
        <img id="lightbox-image" src={image.src} alt={image.desc} />
        <div className="lightbox-caption">{image.desc}</div>
      </div>
    </div>
  );
}

export default Lightbox;