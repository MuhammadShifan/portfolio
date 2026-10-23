import React, { useState } from 'react';
import {
  Code2, Cpu, Database, Cloud, Terminal, GitBranch, Layers,
  Sparkles, Check, Server, Globe, ShieldCheck, Box, Flame, Wrench
} from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function TechnicalSkills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
  ];

  const skills = [
    // Frontend
    { name: 'JavaScript (ES6+)', category: 'frontend', icon: 'JS', color: '#f7df1e', bg: 'rgba(247, 223, 30, 0.1)' },
    { name: 'React.js', category: 'frontend', icon: '⚛️', color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.1)' },
    { name: 'HTML5 & Semantic Web', category: 'frontend', icon: '🌐', color: '#e34f26', bg: 'rgba(227, 79, 38, 0.1)' },
    { name: 'CSS3 & Modern CSS', category: 'frontend', icon: '🎨', color: '#264de4', bg: 'rgba(38, 77, 228, 0.1)' },
   
    { name: 'Bootstrap 5', category: 'frontend', icon: '🅱️', color: '#7952b3', bg: 'rgba(121, 82, 179, 0.1)' },
    { name: 'Responsive UI/UX', category: 'frontend', icon: '📱', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },

    // Backend
    { name: 'Node.js', category: 'backend', icon: '🟢', color: '#68a063', bg: 'rgba(104, 160, 99, 0.1)' },
    { name: 'Express.js', category: 'backend', icon: '⚡', color: '#ffffff', bg: 'rgba(255, 255, 255, 0.1)' },
    { name: 'RESTful API Design', category: 'backend', icon: '🔌', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)' },
    { name: 'CRUD Operations', category: 'backend', icon: '🔄', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.1)' },

    // Database
    { name: 'MongoDB', category: 'database', icon: '🍃', color: '#47a248', bg: 'rgba(71, 162, 72, 0.1)' },

    // DevOps & Cloud
    { name: 'Docker Containers', category: 'devops', icon: '🐳', color: '#2496ed', bg: 'rgba(36, 150, 237, 0.1)' },
    { name: 'Netlify & Render CI/CD', category: 'devops', icon: '🚀', color: '#00c7b7', bg: 'rgba(0, 199, 183, 0.1)' },

    // Tools
    { name: 'Git & GitHub Workflow', category: 'tools', icon: '🐙', color: '#f05032', bg: 'rgba(240, 80, 50, 0.1)' },
    { name: 'Postman API Testing', category: 'tools', icon: '📮', color: '#ff6c37', bg: 'rgba(255, 108, 55, 0.1)' },
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  const marqueeSkills = [
    'JavaScript ES6+', 'React.js', 'Node.js', 'Express.js', 'MongoDB',
    'HTML5', 'CSS3', 'Bootstrap', 'REST APIs',
    'Docker', 'AWS Cloud', 'Git & GitHub', 'JWT Auth', 'VS Code'
  ];

  return (
    <section id="skills" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <Cpu size={14} />
            <span>CORE EXPERTISE</span>
          </div>
          <h2 className="section-title">
            Technical <span className="gradient-text">Skills & Arsenal</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive suite of modern web technologies, full-stack frameworks, databases, and DevOps tools engineered for scalable applications.
          </p>
        </div>

        {/* Dynamic Continuous Marquee Ticker */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '3.5rem',
            padding: '1.25rem 0',
            background: 'rgba(15, 23, 42, 0.7)',
            borderTop: '1px solid rgba(6, 182, 212, 0.2)',
            borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Gradient Edges */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '80px',
              background: 'linear-gradient(to right, #0F172A 0%, transparent 100%)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '80px',
              background: 'linear-gradient(to left, #0F172A 0%, transparent 100%)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              width: 'max-content',
              animation: 'marqueeScroll 24s linear infinite',
            }}
            className="marquee-track"
          >
            {[...marqueeSkills, ...marqueeSkills, ...marqueeSkills].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.45rem 1.25rem',
                  borderRadius: '9999px',
                  background: '#1E293B',
                  border: '1px solid rgba(148, 163, 184, 0.12)',
                  color: '#F8FAFC',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ color: '#06B6D4' }}>✦</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Tabs Filter */}
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
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={() => soundFx.playHover()}
                style={{
                  padding: '0.6rem 1.25rem',
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
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills 3D Interactive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {filteredSkills.map((skill, idx) => (
            <div
              key={skill.name}
              className="glass-panel interactive-card"
              onMouseEnter={() => soundFx.playHover()}
              style={{
                padding: '1.5rem',
                border: '1px solid rgba(148, 163, 184, 0.15)',
                background: '#1E293B',
                transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: skill.bg,
                      border: `1px solid ${skill.color}44`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      fontWeight: '800',
                      fontFamily: 'var(--font-mono)',
                      color: skill.color,
                      boxShadow: `0 0 15px ${skill.color}22`,
                    }}
                  >
                    {skill.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: '#F8FAFC', fontWeight: '700' }}>
                      {skill.name}
                    </h4>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: '#94A3B8',
                        fontFamily: 'var(--font-mono)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {skill.experience}
                    </span>
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    color: '#06B6D4',
                  }}
                >
                  {skill.level}
                </span>
              </div>

              {/* Glowing Skill Level Bar */}
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '9999px',
                  background: 'rgba(148, 163, 184, 0.15)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: skill.level,
                    height: '100%',
                    borderRadius: '9999px',
                    background: 'linear-gradient(90deg, #0891b2, #06B6D4)',
                    boxShadow: '0 0 10px rgba(6, 182, 212, 0.4)',
                    transition: 'width 1s ease-in-out',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
