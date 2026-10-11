import React, { useState } from 'react';
import { Award, ExternalLink, Maximize2, ShieldCheck } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function Certifications({ onSelectCertificate, certificates }) {
  const [filter, setFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All 8 Certificates' },
    { id: 'internship', label: 'Internship Credentials' },
    { id: 'course', label: 'Masterclasses & Courses' },
  ];

  const filtered = filter === 'all'
    ? certificates
    : certificates.filter(c => c.type === filter);

  return (
    <section id="certifications" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <Award size={14} />
            <span>VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="section-title">
            Certifications & <span className="gradient-text">Masterclasses</span>
          </h2>
          <p className="section-subtitle">
            A verified portfolio of 8 industry certifications, internship completions, and specialized Full Stack engineering masterclasses.
          </p>
        </div>

        {/* Filter Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          {filterTabs.map((tab) => {
            const isSelected = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playClick();
                  setFilter(tab.id);
                }}
                onMouseEnter={() => soundFx.playHover()}
                style={{
                  padding: '0.6rem 1.35rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: isSelected ? '700' : '500',
                  color: isSelected ? '#0F172A' : '#94A3B8',
                  background: isSelected ? '#06B6D4' : '#1E293B',
                  border: isSelected ? '1px solid #06B6D4' : '1px solid rgba(148, 163, 184, 0.15)',
                  boxShadow: isSelected ? '0 0 20px rgba(6, 182, 212, 0.35)' : 'none',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dedicated 8-Certificate Responsive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {filtered.map((cert, index) => {
            const originalIndex = certificates.findIndex(c => c.id === cert.id);
            return (
              <div
                key={cert.id}
                className="glass-panel interactive-card"
                onClick={() => {
                  soundFx.playClick();
                  onSelectCertificate(originalIndex);
                }}
                onMouseEnter={() => soundFx.playHover()}
                style={{
                  padding: '1.25rem',
                  borderRadius: '1.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(148, 163, 184, 0.15)',
                  background: '#1E293B',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}
              >
                {/* Certificate Image Thumbnail with Hover Zoom & Overlay */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '190px',
                    borderRadius: '0.85rem',
                    overflow: 'hidden',
                    background: '#0F172A',
                    marginBottom: '1rem',
                    border: '1px solid rgba(148, 163, 184, 0.12)',
                  }}
                  className="cert-img-container"
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    className="cert-img"
                  />

                  {/* Hover Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(15, 23, 42, 0.85)',
                      backdropFilter: 'blur(4px)',
                      opacity: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'opacity 0.25s ease',
                      color: '#06B6D4',
                    }}
                    className="cert-overlay"
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: 'rgba(6, 182, 212, 0.2)',
                        border: '1px solid #06B6D4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
                      }}
                    >
                      <Maximize2 size={20} />
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                      Click to Expand Fullscreen
                    </span>
                  </div>

                  {/* Badge on corner */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      background: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(6, 182, 212, 0.4)',
                      color: '#06B6D4',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      fontFamily: 'var(--font-mono)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {cert.issuer}
                  </div>
                </div>

                {/* Certificate Meta */}
                <div>
                  <h4
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: '700',
                      color: '#F8FAFC',
                      lineHeight: 1.35,
                      marginBottom: '0.4rem',
                    }}
                  >
                    {cert.title}
                  </h4>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(148, 163, 184, 0.12)' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                      {cert.date}
                    </span>
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: '#06B6D4',
                      }}
                    >
                      <ShieldCheck size={14} />
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .interactive-card:hover .cert-img {
          transform: scale(1.08);
        }
        .interactive-card:hover .cert-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
