import React, { useState } from 'react';
import { GraduationCap, Award, Briefcase, Sparkles, BookOpen, Code, Lightbulb, Compass, CheckCircle2, ChevronRight } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function AboutEducation() {
  const [activeTab, setActiveTab] = useState('education');

  const stats = [
    { label: 'Internships Completed', value: '4+', icon: <Briefcase size={22} color="#06B6D4" />, color: '#06B6D4' },
    { label: 'Projects Engineered', value: '10+', icon: <Code size={22} color="#06B6D4" />, color: '#06B6D4' },
    { label: 'Certifications Earned', value: '8+', icon: <Award size={22} color="#06B6D4" />, color: '#06B6D4' },
    { label: 'Academic CGPA', value: '7', icon: <GraduationCap size={22} color="#06B6D4" />, color: '#06B6D4' },
  ];

  const educations = [
    {
      degree: 'Master of Computer Applications (MCA - Online)',
      institution: 'Bharathiar University',
      duration: 'Ongoing / Enrolled',
      grade: 'Advanced Computer Applications & Systems Engineering',
      desc: 'Deepening core software engineering fundamentals, advanced database architecture, distributed systems, and scalable web design.',
      current: true,
    },
    {
      degree: 'Bachelor of Commerce (Computer Applications) - B.Com CA',
      institution: 'SRM Trichy Arts and Science College, Bharathidasan University',
      duration: '2023 – 2026',
      grade: 'CGPA: 7 / 10 (68%)',
      desc: 'Built strong foundations in programming logic, relational databases, business algorithms, and web application development while actively building full-stack projects.',
      current: false,
    },
  ];

  const strengths = [
    { title: 'Full Stack Problem Solving', desc: 'Transforming complex client workflows into intuitive, performant web applications.' },
    { title: 'Rapid Tech Adaptability', desc: 'Quickly mastering new frameworks, libraries, and cloud infrastructures like Docker and AWS.' },
    { title: 'Clean Architecture Mindset', desc: 'Writing maintainable, modular, and DRY code with comprehensive error handling.' },
    { title: 'Effective Communication', desc: 'Clear collaboration across multidisciplinary teams during internships and team sprints.' },
  ];

  return (
    <section id="about" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} />
            <span>DISCOVER MY JOURNEY</span>
          </div>
          <h2 className="section-title">
            About Me & <span className="gradient-text">Academic Background</span>
          </h2>
          <p className="section-subtitle">
            An ambitious Full Stack Developer combining business acumen with modern engineering practices to build impactful digital solutions.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3.5rem',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-panel"
              onMouseEnter={() => soundFx.playHover()}
              style={{
                padding: '1.75rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                border: '1px solid rgba(148, 163, 184, 0.15)',
                background: '#1E293B',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: 'rgba(6, 182, 212, 0.12)',
                  border: '1px solid rgba(6, 182, 212, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 15px rgba(6, 182, 212, 0.15)',
                }}
              >
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#F8FAFC', lineHeight: 1.1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: '500', marginTop: '0.2rem' }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main 2-Column Story & Tabs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
          }}
          className="about-grid"
        >
          {/* Left Column: Personal Narrative Card */}
          <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#1E293B', border: '1px solid rgba(148, 163, 184, 0.15)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    padding: '0.4rem',
                    borderRadius: '8px',
                    background: 'rgba(6, 182, 212, 0.12)',
                    color: '#06B6D4',
                  }}
                >
                  <Lightbulb size={20} />
                </div>
                <h3 style={{ fontSize: '1.5rem', color: '#F8FAFC' }}>Engineering Philosophy</h3>
              </div>

              <p style={{ color: '#94A3B8', fontSize: '1.025rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Hello! I am <strong style={{ color: '#F8FAFC' }}>Muhammad Shifan S</strong>, an energetic and detail-oriented Full Stack Developer based in Tamil Nadu, India.
                My passion lies at the intersection of robust backend systems and mesmerizing, responsive user interfaces.
              </p>

              <p style={{ color: '#94A3B8', fontSize: '0.975rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Throughout my academic tenure at <strong style={{ color: '#06B6D4' }}>SRM Trichy Arts and Science College</strong> and multiple industry internships at <span style={{ color: '#F8FAFC' }}>Vinsup Infotech, Zidio Development, NoviTech R&D Pvt Ltd, and SkillForge E-Learning Solutions Pvt Ltd</span>, I have transformed abstract business ideas into production-ready web apps.
                I am currently expanding my capabilities into <strong style={{ color: '#06B6D4' }}>Python, Artificial Intelligence, Machine Learning, and Deep Learning,</strong> while strengthening my full-stack development and software engineering skills.
              </p>

              {/* Strengths List */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                {strengths.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '1rem',
                      borderRadius: '0.85rem',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(148, 163, 184, 0.12)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#06B6D4', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                      <CheckCircle2 size={16} color="#06B6D4" />
                      <span>{item.title}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#94A3B8', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Quick Action */}
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(148, 163, 184, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94A3B8', fontSize: '0.85rem' }}>
                <Compass size={16} color="#06B6D4" />
                <span>Based in Tamil Nadu, India • Open to Remote & Onsite</span>
              </div>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  soundFx.playClick();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: '#06B6D4',
                }}
              >
                <span>Connect with me</span>
                <ChevronRight size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Academic & Education Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div
                  style={{
                    padding: '0.4rem',
                    borderRadius: '8px',
                    background: 'rgba(6, 182, 212, 0.12)',
                    color: '#06B6D4',
                  }}
                >
                  <GraduationCap size={22} />
                </div>
                <h3 style={{ fontSize: '1.5rem', color: '#F8FAFC' }}>Education History</h3>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>ACADEMICS</span>
            </div>

            {educations.map((edu, idx) => (
              <div
                key={idx}
                className="glass-panel"
                onMouseEnter={() => soundFx.playHover()}
                style={{
                  padding: '2rem',
                  position: 'relative',
                  border: edu.current ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid rgba(148, 163, 184, 0.15)',
                  background: '#1E293B',
                }}
              >
                {/* Active Tag */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      fontFamily: 'var(--font-mono)',
                      background: edu.current ? 'rgba(6, 182, 212, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                      color: edu.current ? '#06B6D4' : '#94A3B8',
                      border: edu.current ? '1px solid rgba(6, 182, 212, 0.35)' : '1px solid rgba(148, 163, 184, 0.15)',
                    }}
                  >
                    {edu.duration}
                  </span>
                  {edu.current && (
                    <span className="status-badge" style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}>
                      <span className="status-dot"></span>
                      Enrolled
                    </span>
                  )}
                </div>

                <h4 style={{ fontSize: '1.25rem', color: '#F8FAFC', marginBottom: '0.35rem' }}>
                  {edu.degree}
                </h4>

                <div style={{ color: '#06B6D4', fontWeight: '600', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                  {edu.institution}
                </div>

                <div
                  style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    background: 'rgba(6, 182, 212, 0.12)',
                    color: '#06B6D4',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                  }}
                >
                  {edu.grade}
                </div>

                <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  {edu.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
}
