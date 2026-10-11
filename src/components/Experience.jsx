import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronDown, ChevronUp, Sparkles, ExternalLink, Award } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function Experience({ onOpenCertificate }) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const experiences = [
    {
      company: 'Vinsup Infotech Private Limited',
      role: 'DevStack Full Stack Internship',
      period: 'Internship Period',
      location: 'Tamil Nadu, India',
      badge: 'Full Stack MERN',
      certImage: '/assets/certificates/vinsup_internship.jpeg',
      summary: 'Architected and built full-stack MERN stack modules, engineered RESTful API endpoints, and integrated responsive frontend views.',
      highlights: [
        'Engineered responsive web applications utilizing React.js, Node.js, Express, and MongoDB.',
        'Implemented secure JWT-based user authentication and role authorization mechanisms.',
        'Created modular REST API routes with robust error handling and database index optimizations.',
        'Collaborated with senior engineers in Agile sprints and code review pipelines.',
      ],
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs', 'Git'],
      color: '#06B6D4',
    },
    {
      company: 'Zidio Development',
      role: 'Web Development Internship (3 Months)',
      period: '3 Months Intensive',
      location: 'Remote / Hybrid',
      badge: 'Frontend & APIs',
      certImage: '/assets/certificates/zidio_internship.jpeg',
      summary: 'Developed rich, interactive UI components and streamlined client-server state synchronization with modern JavaScript.',
      highlights: [
        'Built dynamic, responsive web interfaces with pixel-perfect design accuracy and fluid animations.',
        'Integrated asynchronous backend services and REST APIs with seamless data handling.',
        'Streamlined state management patterns and reusable UI component architectures.',
        'Enhanced cross-browser compatibility and mobile viewport responsiveness.',
      ],
      tech: ['JavaScript (ES6+)', 'React.js', 'HTML5', 'CSS3', 'REST APIs', 'Bootstrap'],
      color: '#06B6D4',
    },
    {
      company: 'NoviTech R&D Private Limited',
      role: 'Web Development Internship',
      period: 'Internship & R&D Projects',
      location: 'Tamil Nadu, India',
      badge: 'MERN & UI Engineering',
      certImage: '/assets/certificates/novitech_internship.jpeg',
      summary: 'Engineered responsive web layouts, mastered modern debugging tools, and contributed to full stack client modules.',
      highlights: [
        'Developed clean, structured web applications adhering to modern UX/UI guidelines.',
        'Applied debugging techniques and DOM optimizations for smooth 60fps animations.',
        'Completed full stack masterclass benchmarks and deployed working web prototypes.',
        'Participated in daily standups and collaborative development sprints.',
      ],
      tech: ['JavaScript', 'HTML5', 'CSS3', 'React.js', 'Node.js Basics', 'Git Workflow'],
      color: '#06B6D4',
    },
    {
      company: 'SkillForge E-Learning Solutions',
      role: 'Web Development Internship',
      period: 'Web Systems Track',
      location: 'Remote',
      badge: 'Web Systems',
      certImage: '/assets/certificates/skillforge_internship.jpeg',
      summary: 'Engineered interactive e-learning and portal components with emphasis on accessibility, performance, and user engagement.',
      highlights: [
        'Created responsive e-learning web interfaces and interactive quiz/content components.',
        'Optimized client-side rendering speed and image asset loading performance.',
        'Designed modular CSS styling systems and intuitive navigation structures.',
        'Achieved top scores in frontend design accuracy and code quality assessments.',
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'UI/UX Principles'],
      color: '#06B6D4',
    },
  ];

  const toggleExpand = (index) => {
    soundFx.playClick();
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <section id="experience" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <Briefcase size={14} />
            <span>CAREER MILESTONES</span>
          </div>
          <h2 className="section-title">
            Internship & <span className="gradient-text">Work Experience</span>
          </h2>
          <p className="section-subtitle">
            Hands-on professional engineering experience across fast-paced technology firms, building real-world MERN applications and scalable web systems.
          </p>
        </div>

        {/* Interactive Vertical Timeline */}
        <div
          style={{
            position: 'relative',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {/* Central Glowing Laser Line */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              left: '28px',
              width: '3px',
              background: 'linear-gradient(180deg, #06B6D4 0%, #0891b2 100%)',
              boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)',
              borderRadius: '9999px',
              zIndex: 1,
            }}
            className="timeline-laser-line"
          />

          {/* Timeline Nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {experiences.map((exp, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div
                  key={exp.company}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '2rem',
                    zIndex: 2,
                  }}
                  className="timeline-item"
                >
                  {/* Timeline Glowing Node Icon */}
                  <div
                    onClick={() => toggleExpand(index)}
                    onMouseEnter={() => soundFx.playHover()}
                    style={{
                      width: '58px',
                      height: '58px',
                      borderRadius: '50%',
                      background: '#0F172A',
                      border: '2px solid #06B6D4',
                      boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: isExpanded ? 'scale(1.15)' : 'scale(1)',
                    }}
                  >
                    <Briefcase size={22} color="#06B6D4" />
                  </div>

                  {/* Experience Card */}
                  <div
                    className="glass-panel"
                    style={{
                      flex: 1,
                      padding: '2rem',
                      border: isExpanded ? '1px solid rgba(6, 182, 212, 0.5)' : '1px solid rgba(148, 163, 184, 0.15)',
                      background: '#1E293B',
                      boxShadow: isExpanded ? '0 15px 40px -10px rgba(0,0,0,0.8), 0 0 25px rgba(6, 182, 212, 0.2)' : undefined,
                    }}
                  >
                    {/* Top Row: Role, Company & Period */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        flexWrap: 'wrap',
                        marginBottom: '1rem',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                          <h3 style={{ fontSize: '1.35rem', color: '#F8FAFC', fontWeight: '800' }}>
                            {exp.role}
                          </h3>
                          <span
                            style={{
                              padding: '0.2rem 0.65rem',
                              borderRadius: '9999px',
                              fontSize: '0.75rem',
                              fontFamily: 'var(--font-mono)',
                              fontWeight: '700',
                              background: 'rgba(6, 182, 212, 0.12)',
                              color: '#06B6D4',
                              border: '1px solid rgba(6, 182, 212, 0.35)',
                            }}
                          >
                            {exp.badge}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '1.1rem', color: '#06B6D4', fontWeight: '600' }}>
                          {exp.company}
                        </h4>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            color: '#94A3B8',
                            fontSize: '0.85rem',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          <Calendar size={14} color="#06B6D4" />
                          <span>{exp.period}</span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            color: '#64748b',
                            fontSize: '0.8rem',
                          }}
                        >
                          <MapPin size={13} />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Summary paragraph */}
                    <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {exp.summary}
                    </p>

                    {/* Expandable Key Highlights */}
                    {isExpanded && (
                      <div style={{ marginTop: '1rem', animation: 'fadeIn 0.3s ease-out' }}>
                        <h5 style={{ fontSize: '0.9rem', color: '#F8FAFC', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
                          Key Contributions & Achievements:
                        </h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
                          {exp.highlights.map((h, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                              <CheckCircle2 size={16} color="#06B6D4" style={{ marginTop: '3px', flexShrink: 0 }} />
                              <span style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.5 }}>
                                {h}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Badges & Action Buttons */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        marginTop: '1.25rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid rgba(148, 163, 184, 0.15)',
                      }}
                    >
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            style={{
                              padding: '0.25rem 0.65rem',
                              borderRadius: '6px',
                              background: 'rgba(15, 23, 42, 0.6)',
                              border: '1px solid rgba(148, 163, 184, 0.12)',
                              color: '#94A3B8',
                              fontSize: '0.8rem',
                              fontFamily: 'var(--font-mono)',
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {/* View Certificate Button */}
                        <button
                          onClick={() => {
                            soundFx.playClick();
                            onOpenCertificate && onOpenCertificate(exp.certImage, exp.company);
                          }}
                          onMouseEnter={() => soundFx.playHover()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.45rem 0.85rem',
                            borderRadius: '8px',
                            background: 'rgba(6, 182, 212, 0.12)',
                            border: '1px solid rgba(6, 182, 212, 0.35)',
                            color: '#06B6D4',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                          }}
                        >
                          <Award size={14} />
                          <span>View Certificate</span>
                        </button>

                        {/* Toggle Details */}
                        <button
                          onClick={() => toggleExpand(index)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.45rem 0.75rem',
                            borderRadius: '8px',
                            background: 'rgba(15, 23, 42, 0.6)',
                            border: '1px solid rgba(148, 163, 184, 0.12)',
                            color: '#94A3B8',
                            fontSize: '0.8rem',
                          }}
                        >
                          <span>{isExpanded ? 'Less' : 'Details'}</span>
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
