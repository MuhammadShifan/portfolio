import React, { useState } from 'react';
import {
  Send, Mail, Phone, MapPin, Check, Copy,
  Sparkles, MessageSquare, User, AtSign, FileText, CheckCircle2, AlertCircle, Loader2
} from 'lucide-react';
import { Github, Linkedin } from './Icons';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [copiedField, setCopiedField] = useState(null);

  const presets = [
    'Discuss MERN Stack Opportunity',
    'Full Stack Web Development Project',
    'Freelance Consultation',
    'Just saying hello!',
  ];

  const handlePresetClick = (preset) => {
    soundFx.playClick();
    setFormData((prev) => ({ ...prev, subject: preset }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please enter your name';
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim()) errors.subject = 'Please enter a subject';
    if (!formData.message.trim()) {
      errors.message = 'Please provide a message';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    return errors;
  };

  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });

    if (!isValid) {
      soundFx.playClick();
      return;
    }

    soundFx.playSuccess();
    setStatus('submitting');

    try {
      // 1. Send to Web3Forms (For Email)
      const web3Response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "5bee97d9-e4bc-4167-9c41-f56917c44f39",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      // 2. Send to Local Backend (For MongoDB Storage)
      const dbResponse = await fetch("https://portfolio-ru2d.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const web3Result = await web3Response.json();

      // Check if both were successful (or at least the email went through)
      if (web3Result.success && dbResponse.ok) {
        setStatus('success');
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00f2fe', '#a855f7', '#10b981', '#ec4899'],
        });
      } else {
        setStatus('idle');
        alert("Failed to process the message completely. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatus('idle');
      alert("An error occurred. Please try again later.");
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTouched({});
    setStatus('idle');
  };

  const handleCopy = (text, field) => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section id="contact" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ width: '100%', maxWidth: '1280px', boxSizing: 'border-box' }}>
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Send size={14} />
            <span>LET'S BUILD SOMETHING GREAT</span>
          </div>
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch & Connect</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind, an engineering role open, or want to collaborate on modern web architecture? Drop a message below!
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
            alignItems: 'start',
            width: '100%',
            boxSizing: 'border-box',
          }}
          className="contact-grid"
        >
          {/* Left Column: Direct Info & Quick Copy Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
            <div
              className="glass-panel"
              style={{
                padding: 'clamp(1.25rem, 3.5vw, 2rem)',
                border: '1px solid rgba(0, 242, 254, 0.25)',
                background: 'linear-gradient(145deg, rgba(0, 242, 254, 0.04) 0%, rgba(15, 23, 42, 0.8) 100%)',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>
                Muhammad Shifan S
              </h3>
              <p style={{ color: '#38bdf8', fontSize: '0.95rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                Full Stack MERN Developer • Software Engineer
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', boxSizing: 'border-box' }}>
                {/* Email Direct Item */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    borderRadius: '0.85rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    width: '100%',
                    boxSizing: 'border-box',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0, flex: '1 1 180px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: 'rgba(0, 242, 254, 0.12)',
                        border: '1px solid rgba(0, 242, 254, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#00f2fe',
                        flexShrink: 0,
                      }}
                    >
                      <Mail size={18} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', display: 'block' }}>
                        Email Address
                      </span>
                      <div
                        style={{
                          color: '#fff',
                          fontWeight: '600',
                          fontSize: 'clamp(0.8rem, 2.8vw, 0.92rem)',
                          overflowWrap: 'break-word',
                          wordBreak: 'break-word',
                        }}
                      >
                        muhammasshifan@gmail.com
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy('muhammasshifan@gmail.com', 'email')}
                    title="Copy Email"
                    style={{
                      padding: '0.45rem 0.75rem',
                      borderRadius: '8px',
                      background: copiedField === 'email' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                      border: copiedField === 'email' ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                      color: copiedField === 'email' ? '#34d399' : '#cbd5e1',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                    }}
                  >
                    {copiedField === 'email' ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Phone Item */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    borderRadius: '0.85rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    width: '100%',
                    boxSizing: 'border-box',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0, flex: '1 1 180px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: 'rgba(168, 85, 247, 0.12)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#a855f7',
                        flexShrink: 0,
                      }}
                    >
                      <Phone size={18} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', display: 'block' }}>
                        Phone & WhatsApp
                      </span>
                      <div style={{ color: '#fff', fontWeight: '600', fontSize: 'clamp(0.82rem, 2.8vw, 0.92rem)' }}>
                        +91 6381403151
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy('+916381403151', 'phone')}
                    title="Copy Phone"
                    style={{
                      padding: '0.45rem 0.75rem',
                      borderRadius: '8px',
                      background: copiedField === 'phone' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                      border: copiedField === 'phone' ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                      color: copiedField === 'phone' ? '#34d399' : '#cbd5e1',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                    }}
                  >
                    {copiedField === 'phone' ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedField === 'phone' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div
              className="glass-panel"
              style={{
                padding: 'clamp(1rem, 3.5vw, 1.5rem)',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                Quick Subject Suggestions:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%', boxSizing: 'border-box' }}>
                {presets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handlePresetClick(preset)}
                    onMouseEnter={() => soundFx.playHover()}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '9999px',
                      background: formData.subject === preset ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      border: formData.subject === preset ? '1px solid #00f2fe' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: formData.subject === preset ? '#00f2fe' : '#cbd5e1',
                      fontSize: 'clamp(0.75rem, 2.5vw, 0.8rem)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left',
                      maxWidth: '100%',
                      boxSizing: 'border-box',
                      whiteSpace: 'normal',
                      lineHeight: 1.35,
                    }}
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Modern Glassmorphic Lead Collection Form */}
          <div
            className="glass-panel"
            style={{
              padding: 'clamp(1.25rem, 4vw, 2.5rem)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(10, 15, 30, 0.8) 100%)',
              boxShadow: '0 20px 50px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 242, 254, 0.1)',
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}
          >
            {status === 'success' ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '3rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.25rem',
                  animation: 'fadeIn 0.3s ease-out',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '2px solid #10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981',
                    boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)',
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>

                <h3 style={{ fontSize: '1.75rem', color: '#fff', fontWeight: '800' }}>
                  Message Transmitted!
                </h3>

                <p style={{ color: '#cbd5e1', maxWidth: '440px', lineHeight: 1.6 }}>
                  Thank you, <strong style={{ color: '#00f2fe' }}>{formData.name}</strong>. Your inquiry has been received. Muhammad Shifan will get back to you shortly at <strong style={{ color: '#fff' }}>{formData.email}</strong>.
                </p>

                <button
                  onClick={handleReset}
                  className="btn-secondary"
                  style={{ marginTop: '1rem', padding: '0.65rem 1.5rem', fontSize: '0.9rem' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ width: '100%', boxSizing: 'border-box' }}>
                <div style={{ marginBottom: '1.75rem' }}>
                  <h3 style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)', color: '#fff', fontWeight: '800', marginBottom: '0.35rem' }}>
                    Send Direct Message
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                    Fill in the details below to initiate direct correspondence.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem', width: '100%', boxSizing: 'border-box' }}>
                  {/* Name Field with Floating Label */}
                  <div className="floating-field" style={{ width: '100%', boxSizing: 'border-box' }}>
                    <div style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}>
                      <input
                        type="text"
                        name="name"
                        id="contact-name"
                        placeholder=" "
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{
                          width: '100%',
                          maxWidth: '100%',
                          boxSizing: 'border-box',
                          padding: '1.1rem 1rem 1.1rem 2.8rem',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: touched.name && errors.name ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '0.85rem',
                          color: '#fff',
                          fontSize: '0.95rem',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                        }}
                      />
                      <label
                        htmlFor="contact-name"
                        style={{
                          position: 'absolute',
                          left: '2.8rem',
                          top: formData.name ? '0.35rem' : '1.1rem',
                          fontSize: formData.name ? '0.72rem' : '0.9rem',
                          color: formData.name ? '#00f2fe' : '#94a3b8',
                          pointerEvents: 'none',
                          transition: 'all 0.2s ease',
                          fontFamily: formData.name ? 'var(--font-mono)' : 'inherit',
                        }}
                      >
                        Your Name *
                      </label>
                      <User size={18} color="#64748b" style={{ position: 'absolute', left: '1rem', top: '1.1rem' }} />
                    </div>
                    {touched.name && errors.name && (
                      <span style={{ fontSize: '0.75rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.3rem' }}>
                        <AlertCircle size={12} /> {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email Field with Floating Label */}
                  <div className="floating-field" style={{ width: '100%', boxSizing: 'border-box' }}>
                    <div style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}>
                      <input
                        type="email"
                        name="email"
                        id="contact-email"
                        placeholder=" "
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{
                          width: '100%',
                          maxWidth: '100%',
                          boxSizing: 'border-box',
                          padding: '1.1rem 1rem 1.1rem 2.8rem',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: touched.email && errors.email ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '0.85rem',
                          color: '#fff',
                          fontSize: '0.95rem',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                        }}
                      />
                      <label
                        htmlFor="contact-email"
                        style={{
                          position: 'absolute',
                          left: '2.8rem',
                          top: formData.email ? '0.35rem' : '1.1rem',
                          fontSize: formData.email ? '0.72rem' : '0.9rem',
                          color: formData.email ? '#00f2fe' : '#94a3b8',
                          pointerEvents: 'none',
                          transition: 'all 0.2s ease',
                          fontFamily: formData.email ? 'var(--font-mono)' : 'inherit',
                        }}
                      >
                        Email Address *
                      </label>
                      <AtSign size={18} color="#64748b" style={{ position: 'absolute', left: '1rem', top: '1.1rem' }} />
                    </div>
                    {touched.email && errors.email && (
                      <span style={{ fontSize: '0.75rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.3rem' }}>
                        <AlertCircle size={12} /> {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div className="floating-field" style={{ width: '100%', boxSizing: 'border-box' }}>
                    <div style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}>
                      <input
                        type="text"
                        name="subject"
                        id="contact-subject"
                        placeholder=" "
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{
                          width: '100%',
                          maxWidth: '100%',
                          boxSizing: 'border-box',
                          padding: '1.1rem 1rem 1.1rem 2.8rem',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: touched.subject && errors.subject ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '0.85rem',
                          color: '#fff',
                          fontSize: '0.95rem',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                        }}
                      />
                      <label
                        htmlFor="contact-subject"
                        style={{
                          position: 'absolute',
                          left: '2.8rem',
                          top: formData.subject ? '0.35rem' : '1.1rem',
                          fontSize: formData.subject ? '0.72rem' : '0.9rem',
                          color: formData.subject ? '#00f2fe' : '#94a3b8',
                          pointerEvents: 'none',
                          transition: 'all 0.2s ease',
                          fontFamily: formData.subject ? 'var(--font-mono)' : 'inherit',
                        }}
                      >
                        Subject *
                      </label>
                      <FileText size={18} color="#64748b" style={{ position: 'absolute', left: '1rem', top: '1.1rem' }} />
                    </div>
                    {touched.subject && errors.subject && (
                      <span style={{ fontSize: '0.75rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.3rem' }}>
                        <AlertCircle size={12} /> {errors.subject}
                      </span>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="floating-field" style={{ width: '100%', boxSizing: 'border-box' }}>
                    <div style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}>
                      <textarea
                        name="message"
                        id="contact-message"
                        rows={4}
                        placeholder=" "
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{
                          width: '100%',
                          maxWidth: '100%',
                          boxSizing: 'border-box',
                          padding: '1.1rem 1rem 1.1rem 2.8rem',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: touched.message && errors.message ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '0.85rem',
                          color: '#fff',
                          fontSize: '0.95rem',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          resize: 'vertical',
                        }}
                      />
                      <label
                        htmlFor="contact-message"
                        style={{
                          position: 'absolute',
                          left: '2.8rem',
                          top: formData.message ? '0.35rem' : '1.1rem',
                          fontSize: formData.message ? '0.72rem' : '0.9rem',
                          color: formData.message ? '#00f2fe' : '#94a3b8',
                          pointerEvents: 'none',
                          transition: 'all 0.2s ease',
                          fontFamily: formData.message ? 'var(--font-mono)' : 'inherit',
                        }}
                      >
                        Project Details / Message *
                      </label>
                      <MessageSquare size={18} color="#64748b" style={{ position: 'absolute', left: '1rem', top: '1.1rem' }} />
                    </div>
                    {touched.message && errors.message && (
                      <span style={{ fontSize: '0.75rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.3rem' }}>
                        <AlertCircle size={12} /> {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Satisfying Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    onMouseEnter={() => soundFx.playHover()}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      fontSize: '1rem',
                      marginTop: '0.5rem',
                      cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                      boxSizing: 'border-box',
                    }}
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 0.9fr 1.1fr !important;
            gap: 3rem !important;
          }
        }
        .floating-field input:focus, .floating-field textarea:focus {
          border-color: #00f2fe !important;
          background: rgba(0, 242, 254, 0.05) !important;
          box-shadow: 0 0 20px rgba(0, 242, 254, 0.2) !important;
        }
        .floating-field input:focus + label, .floating-field textarea:focus + label {
          top: 0.35rem !important;
          font-size: 0.72rem !important;
          color: #00f2fe !important;
          font-family: var(--font-mono) !important;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
