// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServiceModal from './components/ServiceModal';
import PrivacyModal from './components/PrivacyModal';
import Lightbox from './components/Lightbox';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';

function App() {
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [lightboxImage, setLightboxImage] = useState({ src: '', desc: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const openServiceModal = (service) => {
    setCurrentService(service);
    setServiceModalOpen(true);
  };

  const openLightbox = (image) => {
    setLightboxImage(image);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader">
          <div className="loader-ring"></div>
          <div className="loader-ring"></div>
          <div className="loader-ring"></div>
          <span className="loader-text">Integra-IO</span>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <CustomCursor />
      <Navbar onPrivacyClick={() => setPrivacyModalOpen(true)} />
      <Hero />
      <Services onServiceClick={openServiceModal} />
      <Portfolio />
      <Testimonials />
      <Certifications />
      <Contact />
      <Footer />
      <ScrollToTop />
      
      <ServiceModal 
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        service={currentService}
        onImageClick={openLightbox}
      />
      
      <PrivacyModal 
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
      
      <Lightbox 
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        image={lightboxImage}
      />
    </div>
  );
}

export default App;