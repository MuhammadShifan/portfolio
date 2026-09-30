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
    title: 'DevStack Full Stack Internship Certificate',
    issuer: 'Vinsup Infotech Private Limited',
    type: 'internship',
    date: 'Internship Period',
    image: '/assets/certificates/vinsup_internship.jpeg',
  },
  {
    id: 2,
    title: 'Web Development Internship (3 Months)',
    issuer: 'Zidio Development',
    type: 'internship',
    date: '3 Months Intensive',
    image: '/assets/certificates/zidio_internship.jpeg',
  },
  {
    id: 3,
    title: 'Web Development R&D Internship Certificate',
    issuer: 'NoviTech R&D Private Limited',
    type: 'internship',
    date: 'Internship 2025',
    image: '/assets/certificates/novitech_internship.jpeg',
  },
  {
    id: 4,
    title: 'Web Development Internship Certification',
    issuer: 'SkillForge E-Learning Solutions',
    type: 'internship',
    date: 'Internship 2024',
    image: '/assets/certificates/skillforge_completion.png',
  },
  {
    id: 5,
    title: 'DevStack Full Stack Development Certificate',
    issuer: 'Vinsup Infotech Private Limited',
    type: 'course',
    date: 'Specialization 2024',
    image: '/assets/certificates/vinsup_course.jpg',
  },
  {
    id: 6,
    title: 'Web Development Training Program',
    issuer: 'Zidio Development',
    type: 'course',
    date: 'Certified Training',
    image: '/assets/certificates/zidio_training.jpg',
  },
  {
    id: 7,
    title: '30-Day Masterclass in Full Stack Development',
    issuer: 'NoviTech R&D',
    type: 'course',
    date: 'Masterclass 2024',
    image: '/assets/certificates/novitech_course.png',
  },
  {
    id: 8,
    title: 'Full Stack Web Development Professional Certification',
    issuer: 'SkillForge E-Learning',
    type: 'course',
    date: 'Specialization 2024',
    image: '/assets/certificates/skillforge_course.png',
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
