import React, { useState } from 'react';
import ThreeBackground from './components/ThreeBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutEducation from './components/AboutEducation';
import TechnicalSkills from './components/TechnicalSkills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import CertificateLightbox from './components/CertificateLightbox';
import Contact from './components/Contact';
import Footer from './components/Footer';

const CERTIFICATES_DATA = [
  {
    id: 1,
    title: 'DevStack Full Stack Internshipshipship Certificate',
    issuer: 'Vinsup Infotech Private Limited',
    type: 'Internshipshipship',
    date: 'Internshipshipship Period',
    image: '/assets/certificates/vinsup_Internshipshipship.jpeg',
  },
  {
    id: 2,
    title: 'Web Development Internshipshipship (3 Months)',
    issuer: 'Zidio Development',
    type: 'Internshipshipship',
    date: '3 Months Intensive',
    image: '/assets/certificates/zidio_Internshipshipship.jpeg',
  },
  {
    id: 3,
    title: 'Web Development R&D Internshipshipship Certificate',
    issuer: 'NoviTech R&D Private Limited',
    type: 'Internshipshipship',
    date: 'Internshipshipship 2025',
    image: '/assets/certificates/novitech_Internshipshipship.jpeg',
  },
  {
    id: 4,
    title: 'Web Development Internshipshipship Certification',
    issuer: 'SkillForge E-Learning Solutions',
    type: 'Internshipshipship',
    date: 'Internshipshipship 2024',
    image: '/assets/certificates/skillforge_Internshipshipship.jpeg',
  },
  {
    id: 5,
    title: '30-Day Masterclass in Full Stack Development',
    issuer: 'NoviTech R&D',
    type: 'course',
    date: 'Masterclass 2024',
    image: '/assets/certificates/novitech_course.png',
  },
  {
    id: 6,
    title: 'Full Stack Web Development Professional Certification',
    issuer: 'SkillForge E-Learning',
    type: 'course',
    date: 'Specialization 2024',
    image: '/assets/certificates/skillforge_course.png',
  },
  {
    id: 7,
    title: 'Certified Full Stack Web Developer Program',
    issuer: 'NoviTech R&D',
    type: 'course',
    date: 'Certified Completion',
    image: '/assets/certificates/novitech_completion.png',
  },
  {
    id: 8,
    title: 'Web Solutions Engineering Certification',
    issuer: 'SkillForge E-Learning',
    type: 'course',
    date: 'Certified Completion',
    image: '/assets/certificates/skillforge_completion.png',
  },
];

export default function App() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handleOpenCertificate = (imageUrl) => {
    const index = CERTIFICATES_DATA.findIndex((c) => c.image === imageUrl);
    if (index !== -1) {
      setLightboxIndex(index);
    } else {
      setLightboxIndex(0);
    }
  };

  return (
    <div className="portfolio-app" style={{ position: 'relative', minHeight: '100vh', background: '#030712' }}>
      {/* 3D Interactive Three.js Particle Universe Background */}
      <ThreeBackground />

      {/* Desktop Custom Glowing Cursor */}
      <CustomCursor />

      {/* Floating Glassmorphic Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About & Education Section */}
        <AboutEducation />

        {/* 3. Technical Skills Section */}
        <TechnicalSkills />

        {/* 4. Experience Section */}
        <Experience onOpenCertificate={handleOpenCertificate} />

        {/* 5. Projects Section */}
        <Projects />

        {/* 6. Certifications Section (Dedicated Grid) */}
        <Certifications
          certificates={CERTIFICATES_DATA}
          onSelectCertificate={(idx) => setLightboxIndex(idx)}
        />

        {/* 7. Contact Section (Lead Collection Feature) */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fullscreen Certificate Lightbox */}
      {lightboxIndex !== null && (
        <CertificateLightbox
          certificates={CERTIFICATES_DATA}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </div>
  );
}
