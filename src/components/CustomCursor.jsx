// components/CustomCursor.jsx
import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateHover = () => {
      const hoverable = document.querySelectorAll('a, button, .service-card, .portfolio-card, .cert-card');
      hoverable.forEach(el => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    const handleClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 200);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('click', handleClick);
    updateHover();

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <div 
        className={`custom-cursor ${hovered ? 'hover' : ''} ${clicked ? 'click' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`cursor-dot ${hovered ? 'hover' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
}

export default CustomCursor;