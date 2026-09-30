import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut, Maximize2, Award } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function CertificateLightbox({ certificates, activeIndex, onClose, onNavigate }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        soundFx.playClick();
        onNavigate((activeIndex - 1 + certificates.length) % certificates.length);
        setZoomLevel(1);
      }
      if (e.key === 'ArrowRight') {
        soundFx.playClick();
        onNavigate((activeIndex + 1) % certificates.length);
        setZoomLevel(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeIndex, certificates.length, onClose, onNavigate]);

  if (activeIndex === null || !certificates[activeIndex]) return null;

  const current = certificates[activeIndex];

  const handlePrev = (e) => {
    e.stopPropagation();
    soundFx.playClick();
    onNavigate((activeIndex - 1 + certificates.length) % certificates.length);
    setZoomLevel(1);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    soundFx.playClick();
    onNavigate((activeIndex + 1) % certificates.length);
    setZoomLevel(1);
  };

  const handleZoomToggle = (e) => {
    e.stopPropagation();
    soundFx.playClick();
    setZoomLevel((prev) => (prev === 1 ? 1.5 : 1));
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(2, 6, 23, 0.95)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'lightboxFade 0.25s ease-out',
      }}
    >
      {/* Top Toolbar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1.5rem',
          right: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              background: 'rgba(0, 242, 254, 0.15)',
              border: '1px solid rgba(0, 242, 254, 0.4)',
              color: '#00f2fe',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Award size={15} />
            <span>{activeIndex + 1} / {certificates.length}</span>
          </div>
          <span style={{ color: '#fff', fontWeight: '700', fontSize: '1rem' }} className="cert-title-top">
            {current.title}
          </span>
        </div>

        {/* Action Controls: Zoom, Download, Close */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={handleZoomToggle}
            title="Toggle Zoom"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {zoomLevel > 1 ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
          </button>

          <a
            href={current.image}
            download
            onClick={(e) => e.stopPropagation()}
            title="Download Certificate Image"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            <Download size={18} />
          </a>

          <button
            onClick={onClose}
            title="Close (Esc)"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f87171',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Navigation Buttons: Left & Right */}
      <button
        onClick={handlePrev}
        aria-label="Previous Certificate"
        style={{
          position: 'absolute',
          left: '1.5rem',
          zIndex: 10,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          boxShadow: '0 0 20px rgba(0, 242, 254, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00f2fe',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        className="nav-arrow-btn"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Certificate"
        style={{
          position: 'absolute',
          right: '1.5rem',
          zIndex: 10,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          boxShadow: '0 0 20px rgba(0, 242, 254, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00f2fe',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        className="nav-arrow-btn"
      >
        <ChevronRight size={28} />
      </button>

      {/* Main Image Lightbox Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '75vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
          borderRadius: '1rem',
          border: '1px solid rgba(0, 242, 254, 0.35)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 242, 254, 0.25)',
          background: '#070c18',
        }}
      >
        <img
          src={current.image}
          alt={current.title}
          style={{
            maxWidth: '100%',
            maxHeight: '75vh',
            objectFit: 'contain',
            transform: `scale(${zoomLevel})`,
            transition: 'transform 0.3s ease',
            cursor: zoomLevel === 1 ? 'zoom-in' : 'zoom-out',
          }}
          onClick={handleZoomToggle}
        />
      </div>

      {/* Bottom Certificate Meta Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: '1.25rem',
          textAlign: 'center',
          padding: '0.75rem 1.75rem',
          background: 'rgba(15, 23, 42, 0.8)',
          borderRadius: '9999px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <span style={{ color: '#00f2fe', fontWeight: '700', marginRight: '0.5rem' }}>
          {current.issuer}:
        </span>
        <span style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
          {current.title}
        </span>
      </div>

      <style>{`
        @keyframes lightboxFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .nav-arrow-btn:hover {
          transform: scale(1.1);
          background: rgba(0, 242, 254, 0.2) !important;
          border-color: #00f2fe !important;
        }
        @media (max-width: 640px) {
          .cert-title-top {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
