import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Layers, Cpu, Database, Server, ShieldAlert } from 'lucide-react';
import { Github } from './Icons';
import { soundFx } from '../utils/sound';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(3, 7, 18, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'modalBackdropFade 0.25s ease-out',
      }}
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'linear-gradient(145deg, #0d1424 0%, #080d1a 100%)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          borderRadius: '1.5rem',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 242, 254, 0.2)',
          padding: '2.5rem',
          animation: 'modalZoomIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          aria-label="Close Project Deep Dive"
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <X size={20} />
        </button>

        {/* Top Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
            <span
              style={{
                padding: '0.3rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: '700',
                fontFamily: 'var(--font-mono)',
                background: 'rgba(0, 242, 254, 0.15)',
                color: '#00f2fe',
                border: '1px solid rgba(0, 242, 254, 0.3)',
              }}
            >
              {project.category}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
              FEATURED ARCHITECTURE
            </span>
          </div>

          <h2 style={{ fontSize: '2rem', color: '#fff', fontWeight: '800', marginBottom: '0.75rem' }}>
            {project.title}
          </h2>

          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.6 }}>
            {project.longDescription || project.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundFx.playHover()}
              className="btn-primary"
              style={{ padding: '0.7rem 1.4rem', fontSize: '0.9rem' }}
            >
              <span>Live Demonstration</span>
              <ExternalLink size={16} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundFx.playHover()}
              className="btn-secondary"
              style={{ padding: '0.7rem 1.4rem', fontSize: '0.9rem' }}
            >
              <Github size={16} />
              <span>Source Code</span>
            </a>
          )}
        </div>

        {/* Key Features & Architecture Breakdown */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          {/* Core Features */}
          <div
            style={{
              padding: '1.5rem',
              borderRadius: '1rem',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <h4 style={{ fontSize: '1.1rem', color: '#00f2fe', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={18} />
              Key Functionality
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {project.features?.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#00f2fe" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Architecture */}
          <div
            style={{
              padding: '1.5rem',
              borderRadius: '1rem',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <h4 style={{ fontSize: '1.1rem', color: '#a855f7', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={18} />
              Stack & Deployment
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#94a3b8' }}>Frontend:</span>
                <span style={{ color: '#fff', fontWeight: '600' }}>{project.techFrontend || 'React.js, Tailwind CSS'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#94a3b8' }}>Backend:</span>
                <span style={{ color: '#fff', fontWeight: '600' }}>{project.techBackend || 'Node.js, Express.js REST API'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#94a3b8' }}>Database:</span>
                <span style={{ color: '#fff', fontWeight: '600' }}>{project.techDatabase || 'MongoDB Atlas, Mongoose'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', paddingBottom: '0.2rem' }}>
                <span style={{ color: '#94a3b8' }}>CI / CD & Cloud:</span>
                <span style={{ color: '#34d399', fontWeight: '600' }}>{project.techDeployment || 'Netlify & Render Automated Pipelines'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Badges */}
        <div>
          <h5 style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
            Technologies Used:
          </h5>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.tags?.map((t) => (
              <span
                key={t}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#e2e8f0',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalBackdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalZoomIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
