import React, { useState, useRef } from 'react';
import {
  ExternalLink, Layers, Sparkles, ArrowUpRight,
  CheckCircle2, ShoppingCart, BookOpen, BarChart3, Dumbbell, CheckSquare, Map
} from 'lucide-react';
import { Github } from './Icons';
import ProjectModal from './ProjectModal';
import { soundFx } from '../utils/sound';

function ProjectCard({ project, onSelect }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTilt({
      x: rotateX,
      y: rotateY,
      glowX: (x / rect.width) * 100,
      glowY: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundFx.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glowX: 50, glowY: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        height: '100%',
      }}
    >
      <div
        className="glass-panel interactive-card"
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '2rem',
          borderRadius: '1.5rem',
          transform: isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`
            : 'rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
          transition: isHovered ? 'transform 0.1s ease-out, border-color 0.3s ease' : 'transform 0.5s ease-out, border-color 0.3s ease',
          transformStyle: 'preserve-3d',
          border: isHovered ? `1px solid ${project.accentColor}` : '1px solid rgba(255, 255, 255, 0.08)',
          background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, ${project.accentColor}18 0%, rgba(15, 23, 42, 0.8) 60%)`,
          boxShadow: isHovered
            ? `0 20px 40px -15px rgba(0,0,0,0.8), 0 0 30px ${project.accentColor}33`
            : '0 10px 30px -10px rgba(0,0,0,0.5)',
        }}
      >
        <div>
          {/* Top Row: Icon + Category Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background: `${project.accentColor}18`,
                border: `1px solid ${project.accentColor}44`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: project.accentColor,
                boxShadow: `0 0 20px ${project.accentColor}22`,
              }}
            >
              {project.icon}
            </div>

            <span
              style={{
                padding: '0.3rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '700',
                fontFamily: 'var(--font-mono)',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3
            style={{
              fontSize: '1.45rem',
              color: '#fff',
              fontWeight: '800',
              marginBottom: '0.75rem',
              lineHeight: 1.25,
            }}
          >
            {project.title}
          </h3>

          {/* Project Description */}
          <p
            style={{
              color: '#94a3b8',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
            }}
          >
            {project.description}
          </p>

          {/* Key Feature Bullets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem' }}>
            {project.features.slice(0, 2).map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={14} color={project.accentColor} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Tech Stack & CTA */}
        <div>
          {/* Tech Stack Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#94a3b8',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <button
              onClick={() => {
                soundFx.playClick();
                onSelect(project);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.85rem',
                fontWeight: '700',
                color: project.accentColor,
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              <span>Architecture Deep Dive</span>
              <ArrowUpRight size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Source Code"
                  onMouseEnter={() => soundFx.playHover()}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#cbd5e1',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Github size={16} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Live Demo"
                  onMouseEnter={() => soundFx.playHover()}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: `${project.accentColor}22`,
                    border: `1px solid ${project.accentColor}55`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: project.accentColor,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const projectsData = [
    {
      id: 'lms-mern',
      title: 'Learning Management System (LMS)',
      category: 'MERN Stack',
      filterCategory: 'mern',
      icon: <BookOpen size={24} />,
      accentColor: '#00f2fe',
      description: 'Comprehensive e-learning portal built on the MERN stack with JWT authentication, role-based dashboards, and Netlify/Render CI/CD pipelines.',
      longDescription: 'An enterprise-grade LMS web platform engineered to empower instructors and students. Features seamless video course publishing, quiz modules, progress tracking, JWT token refresh authentication, and fully automated deployment via Netlify frontend & Render backend pipelines.',
      features: [
        'Secure JWT token authentication & role authorization (Admin, Instructor, Student)',
        'Course catalog with video streaming, lesson chapters, and attachment downloads',
        'Automated CI/CD integration with GitHub, Netlify & Render',
        'Interactive quizzes, certificate issuance upon course completion'
      ],
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Netlify & Render CI/CD'],
      techFrontend: 'React.js, Tailwind CSS, Context API',
      techBackend: 'Node.js, Express.js REST API, JSON Web Tokens',
      techDatabase: 'MongoDB Atlas, Mongoose Models',
      techDeployment: 'Netlify (Frontend) + Render (Backend) CI/CD Pipeline',
      githubUrl: 'https://github.com',
      liveUrl: 'https://github.com',
    },
    {
      id: 'stock-invoice',
      title: 'Stock & Invoice Manager for AS Marketing',
      category: 'Full Stack Business App',
      filterCategory: 'fullstack',
      icon: <BarChart3 size={24} />,
      accentColor: '#10b981',
      description: 'Real-time inventory management, barcode/SKU tracking, automated billing, and instant PDF invoice generation for AS Marketing.',
      longDescription: 'A custom enterprise resource planning tool designed for AS Marketing. Solved inventory discrepancy challenges through live stock tracking, batch inventory management, low-stock notifications, dynamic price calculation, and automated invoice PDF generation with custom print branding.',
      features: [
        'Real-time inventory level tracking with automated low-stock threshold alerts',
        'Instant professional PDF invoice generation and thermal receipt printing',
        'Customer ledger, GST calculation, and daily sales financial analytics',
        'Express.js backend with MongoDB transactions ensuring atomic billing operations'
      ],
      tags: ['MERN Stack', 'Node.js', 'MongoDB', 'PDFKit', 'Chart.js', 'Express.js'],
      techFrontend: 'React.js, Modern CSS, Chart.js Analytics',
      techBackend: 'Node.js, Express.js REST APIs, PDFKit Generator',
      techDatabase: 'MongoDB Atlas with transactional consistency',
      techDeployment: 'Cloud deployment with automated database backup',
      githubUrl: 'https://github.com',
      liveUrl: 'https://github.com',
    },
    {
      id: 'coffee-ecommerce',
      title: 'E-Commerce Website for Nathan Coffee Mart',
      category: 'E-Commerce MERN',
      filterCategory: 'mern',
      icon: <ShoppingCart size={24} />,
      accentColor: '#ec4899',
      description: 'Specialty coffee e-commerce store with aroma/roast filtering, interactive shopping cart, customer reviews, and Razorpay payment integration.',
      longDescription: 'A vibrant, modern direct-to-consumer e-commerce marketplace crafted for Nathan Coffee Mart. Customers can explore gourmet coffee beans by roast level, origin, and grind type, manage a dynamic shopping cart, save favorites, and securely checkout via Razorpay.',
      features: [
        'Comprehensive product catalog with roast profile & grind size selectors',
        'Persistent interactive shopping cart with coupon code discount logic',
        'Seamless checkout flow integrated with Razorpay Payment Gateway',
        'Admin inventory dashboard to add, edit, and fulfill customer orders'
      ],
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Razorpay Gateway', 'Cloudinary'],
      techFrontend: 'React.js, Modern Responsive CSS, Lucide Icons',
      techBackend: 'Node.js, Express.js, Razorpay Node SDK',
      techDatabase: 'MongoDB Atlas, Aggregation Pipelines',
      techDeployment: 'Render Backend + Netlify Frontend CI/CD',
      githubUrl: 'https://github.com',
      liveUrl: 'https://github.com',
    },
    // {
    //   id: 'gym-buddy',
    //   title: 'Gym Buddy Fitness & Nutrition Platform',
    //   category: 'Frontend Web App',
    //   filterCategory: 'frontend',
    //   icon: <Dumbbell size={24} />,
    //   accentColor: '#a855f7',
    //   description: 'Modern fitness platform featuring personalized workout routines, trainer profiles, BMI calculation, and nutritional planning.',
    //   longDescription: 'An all-in-one health and workout tracker engineered to keep users motivated. Includes interactive BMI calculators, category-based exercise directories with step-by-step guides, trainer consultation bookings, and responsive UI for mobile athletes.',
    //   features: [
    //     'Interactive BMI calculator with instant health classification and calorie recommendations',
    //     'Exercise library categorized by muscle groups with animated demos',
    //     'Trainer directory and appointment scheduling interface',
    //     'Mobile-first responsive design for quick gym floor navigation'
    //   ],
    //   tags: ['React.js', 'JavaScript ES6+', 'Modern CSS', 'Web Storage API'],
    //   techFrontend: 'React.js, CSS Glassmorphism, Responsive Grid',
    //   techBackend: 'Client-side State & Storage Engine',
    //   techDatabase: 'LocalStorage & JSON Data Stores',
    //   techDeployment: 'Vercel / GitHub Pages',
    //   githubUrl: 'https://github.com',
    //   liveUrl: 'https://github.com',
    // },
    // {
    //   id: 'task-flow',
    //   title: 'Task Flow Agile Kanban Suite',
    //   category: 'Productivity Tool',
    //   filterCategory: 'frontend',
    //   icon: <CheckSquare size={24} />,
    //   accentColor: '#38bdf8',
    //   description: 'Clean, lightning-fast Kanban productivity tool for organizing daily sprint tasks, priorities, and workflow pipelines.',
    //   longDescription: 'A streamlined task management web application crafted for developers and agile teams. Features intuitive column workflows (To Do, In Progress, Review, Done), priority tagging, due-date reminders, and local persistence.',
    //   features: [
    //     'Drag-and-drop task card reordering across custom workflow stages',
    //     'Priority tagging (Critical, High, Medium, Low) and deadline indicators',
    //     'Instant search and tag-based task filtering',
    //     'Smooth animations and zero-latency local storage state syncing'
    //   ],
    //   tags: ['React.js', 'Drag & Drop API', 'Tailwind CSS', 'Web Storage'],
    //   techFrontend: 'React.js, HTML5 Drag & Drop API, Tailwind',
    //   techBackend: 'Client-side state management',
    //   techDatabase: 'Browser LocalStorage Engine',
    //   techDeployment: 'Netlify Automated Pipeline',
    //   githubUrl: 'https://github.com',
    //   liveUrl: 'https://github.com',
    // },
    // {
    //   id: 'explore-tn',
    //   title: 'Explore Tamil Nadu Tourism Portal',
    //   category: 'Interactive Web Portal',
    //   filterCategory: 'frontend',
    //   icon: <Map size={24} />,
    //   accentColor: '#f59e0b',
    //   description: 'Multi-page immersive tourism platform celebrating all districts of Tamil Nadu with heritage guides and responsive navigation.',
    //   longDescription: 'A rich multimedia travel guide portal showcasing the historic landmarks, hill stations, temples, and cultural cuisine across Tamil Nadu. Features district-by-district itineraries and responsive navigation.',
    //   features: [
    //     'Comprehensive guide covering 38 districts with curated travel itineraries',
    //     'Heritage monument highlights with rich photography and historical context',
    //     'Interactive filtering by destination type (Beaches, Hill Stations, Temples, Heritage)',
    //     'Fully responsive multi-page layout with optimized asset delivery'
    //   ],
    //   tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design', 'Leaflet Maps'],
    //   techFrontend: 'HTML5 Semantic Structure, Custom CSS3 Grid & Flexbox, Vanilla JS',
    //   techBackend: 'Static Optimized Asset Server',
    //   techDatabase: 'JSON Landmark Data Schema',
    //   techDeployment: 'GitHub Pages Live Deployment',
    //   githubUrl: 'https://github.com',
    //   liveUrl: 'https://github.com',
    // },
  ];

  const filterTabs = [
    // { id: 'all', label: 'All Projects' },
    // { id: 'mern', label: 'MERN Stack' },
    // { id: 'fullstack', label: 'Full Stack Apps' },
    // { id: 'frontend', label: 'Frontend & UI' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(p => p.filterCategory === activeFilter);

  return (
    <section id="projects" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <Layers size={14} />
            <span>FEATURED PORTFOLIO</span>
          </div>
          <h2 className="section-title">
            Engineered <span className="gradient-text">Projects & Work</span>
          </h2>
          <p className="section-subtitle">
            Interactive 3D showcase of full-stack MERN systems, enterprise management tools, and modern web applications built from the ground up.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '3.5rem',
          }}
        >
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveFilter(tab.id);
                }}
                onMouseEnter={() => soundFx.playHover()}
                style={{
                  padding: '0.6rem 1.35rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: isSelected ? '700' : '500',
                  color: isSelected ? '#030712' : '#cbd5e1',
                  background: isSelected ? 'var(--gradient-cyan)' : 'rgba(15, 23, 42, 0.8)',
                  border: isSelected ? '1px solid #00f2fe' : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isSelected ? '0 0 20px rgba(0, 242, 254, 0.4)' : 'none',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 3D Tilt Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Project Deep Dive Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
