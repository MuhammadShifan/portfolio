import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, Phone, Heart, Terminal, Sparkles } from 'lucide-react';
import { Github, Linkedin, Instagram, WhatsApp } from './Icons';
import { soundFx } from '../utils/sound';

export default function Footer() {
  const [time, setTime] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #030712 0%, #02040a 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '4rem 0 2rem 0',
        zIndex: 2,
      }}
    >
      <div className="container">
        {/* Top Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* Col 1: Brand & Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
                  border: '1px solid rgba(0, 242, 254, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00f2fe',
                  fontWeight: '800',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.05rem',
                  boxShadow: '0 0 15px rgba(0, 242, 254, 0.3)',
                }}
              >
                MS
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: '800' }}>
                Muhammad Shifan S
              </h3>
            </div>

            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Entry-Level Full Stack Developer specialized in the MERN ecosystem. Building robust, accessible, and high-performance digital experiences.
            </p>

            {/* Live IST Clock */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.85rem',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: '#38bdf8',
              }}
            >
              <span className="status-dot"></span>
              <span>IST (India): {time || 'Loading...'}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#fff', fontWeight: '700', marginBottom: '1.25rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Quick Navigation
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              {[
                { name: 'Hero', href: '#hero' },
                { name: 'About', href: '#about' },
                { name: 'Skills', href: '#skills' },
                { name: 'Experience', href: '#experience' },
                { name: 'Projects', href: '#projects' },
                { name: 'Certificates', href: '#certifications' },
                { name: 'Contact', href: '#contact' },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    soundFx.playClick();
                    document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  style={{
                    color: '#94a3b8',
                    fontSize: '0.875rem',
                    transition: 'color 0.2s ease',
                  }}
                  className="footer-link"
                >
                  → {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Direct Connect & Socials */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#fff', fontWeight: '700', marginBottom: '1.25rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Connect & Inquiries
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <a
                href="mailto:muhammasshifan@gmail.com"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.875rem' }}
                className="footer-link"
              >
                <Mail size={15} color="#00f2fe" />
                <span>muhammasshifan@gmail.com</span>
              </a>
              <a
                href="tel:+916381403151"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.875rem' }}
                className="footer-link"
              >
                <Phone size={15} color="#a855f7" />
                <span>+91 6381403151</span>
              </a>
            </div>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                onMouseEnter={() => soundFx.playHover()}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#cbd5e1',
                  transition: 'all 0.2s',
                }}
                className="social-hover"
              >
                <Github size={17} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                onMouseEnter={() => soundFx.playHover()}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#cbd5e1',
                  transition: 'all 0.2s',
                }}
                className="social-hover"
              >
                <Linkedin size={17} />
              </a>

              <a
                href="https://wa.me/916381403151?text=Hi"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                onMouseEnter={() => soundFx.playHover()}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#cbd5e1',
                  transition: 'all 0.2s',
                }}
                className="social-hover"
              >
                <WhatsApp size={17} />
              </a>

              <a
                href="https://www.instagram.com/_itz.mds/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                onMouseEnter={() => soundFx.playHover()}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#cbd5e1',
                  transition: 'all 0.2s',
                }}
                className="social-hover"
              >
                <Instagram size={17} />
              </a>

              <a
                href="mailto:muhammasshifan@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Email"
                onMouseEnter={() => soundFx.playHover()}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#cbd5e1',
                  transition: 'all 0.2s',
                }}
                className="social-hover"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.85rem',
            color: '#64748b',
          }}
        >
          <div>
            © {new Date().getFullYear()} <strong style={{ color: '#cbd5e1' }}>Muhammad Shifan S</strong>. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>Engineered with React.js, Three.js & Passion</span>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button with Circular Progress */}
      <button
        onClick={scrollToTop}
        title="Back to Top"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(0, 242, 254, 0.35)',
          boxShadow: '0 0 25px rgba(0, 242, 254, 0.25)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00f2fe',
          zIndex: 90,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          opacity: scrollProgress > 10 ? 1 : 0,
          pointerEvents: scrollProgress > 10 ? 'auto' : 'none',
          transform: scrollProgress > 10 ? 'scale(1)' : 'scale(0.8)',
        }}
        className="top-btn"
      >
        <ArrowUp size={20} />
      </button>

      <style>{`
        .footer-link:hover {
          color: #00f2fe !important;
          transform: translateX(4px);
        }
        .top-btn:hover {
          background: rgba(0, 242, 254, 0.2) !important;
          transform: translateY(-4px) scale(1.1) !important;
          box-shadow: 0 0 30px rgba(0, 242, 254, 0.5) !important;
        }
        .social-hover:hover {
          background: rgba(0, 242, 254, 0.15) !important;
          border-color: rgba(0, 242, 254, 0.5) !important;
          color: #00f2fe !important;
          transform: translateY(-3px);
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.3);
        }
      `}</style>
    </footer>
  );
}
