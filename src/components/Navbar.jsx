import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles, Send, FileCode, Terminal } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section spy
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = (e) => {
    if (e && e.type === 'touchend' && e.cancelable) {
      e.preventDefault();
    }
    const newState = soundFx.toggle();
    setSoundEnabled(newState);
  };

  const handleLinkClick = (href) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '0.75rem 0' : '1.25rem 0',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="container">
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.65rem 1.25rem',
            background: scrolled ? 'rgba(15, 23, 42, 0.9)' : 'rgba(30, 41, 59, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: scrolled ? '1px solid rgba(6, 182, 212, 0.25)' : '1px solid rgba(148, 163, 184, 0.15)',
            borderRadius: '9999px',
            boxShadow: scrolled
              ? '0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(6, 182, 212, 0.15)'
              : '0 4px 20px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#hero');
            }}
            onMouseEnter={() => soundFx.playHover()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'rgba(6, 182, 212, 0.12)',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#06B6D4',
                fontWeight: '800',
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                boxShadow: '0 0 15px rgba(6, 182, 212, 0.2)',
              }}
            >
              MDS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontWeight: '800',
                  fontSize: '0.95rem',
                  letterSpacing: '-0.02em',
                  color: '#F8FAFC',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                Muhammad Shifan
                <span style={{ color: '#06B6D4' }}>.</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <ul
            style={{
              display: 'none',
              listStyle: 'none',
              alignItems: 'center',
              gap: '0.25rem',
              margin: 0,
              padding: 0,
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    onMouseEnter={() => soundFx.playHover()}
                    style={{
                      display: 'block',
                      padding: '0.45rem 0.95rem',
                      borderRadius: '9999px',
                      fontSize: '0.85rem',
                      fontWeight: isActive ? '600' : '500',
                      color: isActive ? '#06B6D4' : '#94A3B8',
                      background: isActive ? 'rgba(6, 182, 212, 0.12)' : 'transparent',
                      border: isActive ? '1px solid rgba(6, 182, 212, 0.35)' : '1px solid transparent',
                      boxShadow: isActive ? '0 0 15px rgba(6, 182, 212, 0.2)' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Action Tools: Sound FX & Contact CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              onTouchEnd={handleSoundToggle}
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
              aria-label="Toggle Sound Effects"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: soundEnabled ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                border: soundEnabled ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid rgba(148, 163, 184, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: soundEnabled ? '#06B6D4' : '#94A3B8',
                transition: 'all 0.2s ease',
              }}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Quick Contact CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#contact');
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="desktop-only-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 1.15rem',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#0F172A',
                background: '#06B6D4',
                boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              <Send size={13} />
              Let's Talk
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle Navigation Menu"
              className="mobile-toggle-btn"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F8FAFC',
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              marginTop: '0.75rem',
              padding: '1.25rem',
              background: 'rgba(15, 23, 42, 0.96)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              borderRadius: '1.25rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 30px rgba(6, 182, 212, 0.15)',
              animation: 'fadeIn 0.2s ease-out',
            }}
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: 0, padding: 0 }}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.href);
                      }}
                      style={{
                        display: 'block',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.75rem',
                        fontSize: '0.95rem',
                        fontWeight: isActive ? '600' : '500',
                        color: isActive ? '#06B6D4' : '#94A3B8',
                        background: isActive ? 'rgba(6, 182, 212, 0.12)' : 'transparent',
                        border: isActive ? '1px solid rgba(6, 182, 212, 0.3)' : 'none',
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
              {/* Sound FX Toggle inside mobile drawer */}
              <li>
                <button
                  onClick={handleSoundToggle}
                  onTouchEnd={handleSoundToggle}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.75rem',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    color: soundEnabled ? '#06B6D4' : '#94A3B8',
                    background: soundEnabled ? 'rgba(6, 182, 212, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                    border: soundEnabled ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid rgba(148, 163, 184, 0.1)',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    {soundEnabled ? <Volume2 size={18} color="#06B6D4" /> : <VolumeX size={18} color="#94A3B8" />}
                    <span>Sound Effects</span>
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '9999px',
                      background: soundEnabled ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                      color: soundEnabled ? '#06B6D4' : '#94A3B8',
                      fontWeight: '700',
                    }}
                  >
                    {soundEnabled ? 'ON' : 'OFF'}
                  </span>
                </button>
              </li>
              <li style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(148, 163, 184, 0.15)' }}>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('#contact');
                  }}
                  className="btn-primary"
                  style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem' }}
                >
                  <Send size={15} />
                  Get in Touch
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
        @media (max-width: 899px) {
          .desktop-only-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
