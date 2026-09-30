import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Download, Mail, Terminal, CheckCircle } from 'lucide-react';
import { Github, Linkedin, WhatsApp, Instagram } from './Icons';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [resumeDownloaded, setResumeDownloaded] = useState(false);
  const avatarCardRef = useRef(null);

  const roles = [
    'Full Stack Developer {MERN}',
    'App Developer {React Native}',
  ];

  // Typing effect loop
  useEffect(() => {
    const currentRole = roles[roleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          // Pause at full word
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  // 3D Avatar Tilt on Mouse Move
  const handleMouseMove = (e) => {
    if (!avatarCardRef.current) return;
    const rect = avatarCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({
      x: (x / (rect.width / 2)) * 12,
      y: -(y / (rect.height / 2)) * 12,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Resume Download Handler with Confetti
  const handleDownloadResume = () => {
    soundFx.playSuccess();
    setResumeDownloaded(true);

    // Fire celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f2fe', '#a855f7', '#10b981', '#ffffff']
    });

    const link = document.createElement('a');
    link.href = '/MUHAMMAD_SHIFAN_S_Resume.pdf';
    link.download = 'MUHAMMAD_SHIFAN_S_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setResumeDownloaded(false), 4000);
  };

  return (
    <section id="hero" className="section" style={{ paddingTop: 'clamp(6.5rem, 12vw, 8.5rem)', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left Column: Hero Content */}
          <div className="hero-content-col" style={{ position: 'relative', zIndex: 2 }}>
            {/* Main Heading */}
            <h1
              className="hero-heading"
              style={{
                fontWeight: '900',
                lineHeight: 1.15,
                marginBottom: '1.25rem',
                letterSpacing: '-0.03em',
              }}
            >
              Hi, I'm{' '}
              <span
                className="gradient-text hero-name"
                style={{
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                }}
              >
                Muhammad Shifan S
              </span>
            </h1>

            {/* Dynamic Role Subtitle */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                minHeight: '2.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <span style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.85rem)', fontWeight: '700', color: '#e2e8f0' }}>
                {' '}
              </span>
              <span
                className="cyan-text"
                style={{
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.85rem)',
                  fontWeight: '800',
                  fontFamily: 'var(--font-heading)',
                  borderRight: '3px solid #00f2fe',
                  paddingRight: '4px',
                  animation: 'blink 0.8s infinite',
                }}
              >
                {displayText}
              </span>
            </div>

            {/* Impactful Tagline */}
            <p
              style={{
                fontSize: '1.125rem',
                color: '#94a3b8',
                lineHeight: 1.7,
                maxWidth: '600px',
                marginBottom: '2.25rem',
                textAlign: 'justify',
              }}
            >
              Motivated Full Stack Developer specializing in the{' '}
              <strong style={{ color: '#00f2fe', fontWeight: '600' }}>MERN stack</strong> and cross-platform mobile application development with{' '}
              <strong style={{ color: '#00f2fe', fontWeight: '600' }}>React Native</strong>. Experienced in building scalable, responsive web applications and seamless mobile experiences. Proficient in RESTful API development, containerization with{' '}
              <strong style={{ color: '#00f2fe', fontWeight: '600' }}>Docker</strong>, and modern{' '}
              <strong style={{ color: '#00f2fe', fontWeight: '600' }}>CI/CD workflows</strong>. Passionate about delivering robust full-stack solutions across both web and mobile platforms.
            </p>

            {/* Call to Action Buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '2.5rem',
              }}
            >
              {/* CTA 1: View Projects */}
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  soundFx.playClick();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="btn-primary"
              >
                <span>View Projects</span>
                <ArrowRight size={18} />
              </a>

              {/* CTA 2: Download Resume */}
              <button
                onClick={handleDownloadResume}
                onMouseEnter={() => soundFx.playHover()}
                className="btn-secondary"
                style={{
                  borderColor: resumeDownloaded ? '#10b981' : undefined,
                  color: resumeDownloaded ? '#10b981' : undefined,
                }}
              >
                {resumeDownloaded ? (
                  <>
                    <CheckCircle size={18} color="#10b981" />
                    <span>Resume Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    <span>Download Resume</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Links & Quick Connect */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>CONNECT:</span>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                title="GitHub Profile"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#cbd5e1',
                  transition: 'all 0.2s ease',
                }}
                className="social-hover"
              >
                <Github size={18} />
              </a>

              <a
                href="mailto:muhammasshifan@gmail.com"
                onMouseEnter={() => soundFx.playHover()}
                title="Email Muhammad Shifan"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#cbd5e1',
                  transition: 'all 0.2s ease',
                }}
                className="social-hover"
              >
                <Mail size={18} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                title="LinkedIn Profile"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#cbd5e1',
                  transition: 'all 0.2s ease',
                }}
                className="social-hover"
              >
                <Linkedin size={18} />
              </a>

              <a
                href="https://wa.me/916381403151?text=Hi"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                title="WhatsApp"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#cbd5e1',
                  transition: 'all 0.2s ease',
                }}
                className="social-hover"
              >
                <WhatsApp size={18} />
              </a>

              <a
                href="https://www.instagram.com/_itz.mds/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                title="Instagram Profile"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#cbd5e1',
                  transition: 'all 0.2s ease',
                }}
                className="social-hover"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Right Column: 3D Floating Avatar with Interactive Parallax */}
          <div
            className="hero-avatar-col"
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* Ambient Radial Glow Rings */}
            <div
              style={{
                position: 'absolute',
                width: '130%',
                height: '130%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0, 242, 254, 0.18) 0%, rgba(168, 85, 247, 0.15) 45%, transparent 70%)',
                filter: 'blur(50px)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />

            {/* 3D Tilt Container */}
            <div
              ref={avatarCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '560px',
                perspective: '1000px',
                transition: 'transform 0.15s ease-out',
                transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
              }}
            >
              {/* Outer Cybernetic Ring */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '2rem',
                  padding: '0.65rem',
                  background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.25) 0%, rgba(168, 85, 247, 0.2) 50%, rgba(236, 72, 153, 0.15) 100%)',
                  border: '1px solid rgba(0, 242, 254, 0.4)',
                  boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 45px rgba(0, 242, 254, 0.25), 0 0 30px rgba(168, 85, 247, 0.2)',
                  backdropFilter: 'blur(20px)',
                  animation: 'floatContinuous 6s ease-in-out infinite',
                }}
              >
                {/* 3D Coding Avatar Image Frame */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 10',
                    borderRadius: '1.6rem',
                    overflow: 'hidden',
                    background: '#030712',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src="/assets/image.png"
                    alt="Muhammad Shifan S - 3D Full Stack MERN Developer Avatar"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.3s ease',
                    }}
                  />

                  {/* Subtle edge vignette overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      boxShadow: 'inset 0 0 30px rgba(3, 7, 18, 0.6)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* Floating Status Badge at bottom */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-14px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '0.45rem 1.15rem',
                    borderRadius: '9999px',
                    background: 'rgba(7, 12, 27, 0.92)',
                    border: '1px solid rgba(0, 242, 254, 0.5)',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 242, 254, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#00f2fe',
                    fontWeight: '700',
                    fontSize: 'clamp(0.7rem, 2.4vw, 0.82rem)',
                    fontFamily: 'var(--font-mono)',
                    backdropFilter: 'blur(12px)',
                    whiteSpace: 'nowrap',
                    maxWidth: '92%',
                    justifyContent: 'center',
                  }}
                >
                  <span className="status-dot" style={{ flexShrink: 0 }}></span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>MERN STACK • LIVE DEV ENVIRONMENT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-heading {
          font-size: clamp(1.85rem, 5.8vw, 4.25rem);
        }
        .hero-name {
          white-space: nowrap;
          display: inline-block;
        }
        @media (max-width: 480px) {
          .hero-heading {
            font-size: clamp(1.6rem, 6.8vw, 2.3rem);
          }
        }
        @media (max-width: 1023px) {
          .hero-avatar-col {
            order: 1;
            margin-bottom: 1rem;
          }
          .hero-content-col {
            order: 2;
          }
        }
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
            gap: 3.5rem !important;
          }
          .hero-content-col {
            order: 1;
          }
          .hero-avatar-col {
            order: 2;
          }
        }
        .social-hover:hover {
          background: rgba(0, 242, 254, 0.15) !important;
          border-color: rgba(0, 242, 254, 0.5) !important;
          color: #00f2fe !important;
          transform: translateY(-3px);
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.3);
        }
        @keyframes blink {
          0%, 100% { border-color: #00f2fe; }
          50% { border-color: transparent; }
        }
      `}</style>
    </section>
  );
}
