import React, { useState, useEffect } from 'react'
import Nav from "../Nav/Nav";

function Home() {
  // Path to the background image (adjust if needed for your build setup)
  const bgUrl = require('../ImgUploader/file/bad.jpeg');

  // Animation state for fade-in
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Blurred background image */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // No filter, show original colors
        transition: 'filter 0.3s',
      }} />
      {/* Overlay for content readability */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        background: 'rgba(255,255,255,0.65)',
        paddingBottom: 40,
        opacity: fadeIn ? 1 : 0,
        transform: fadeIn ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
      }}>
        <Nav />
        <div style={{ maxWidth: 900, margin: '40px auto', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 40, background: 'rgba(255,255,255,0.92)' }}>
          <h1 style={{ color: '#1a237e', fontSize: 38, marginBottom: 10, textAlign: 'center', letterSpacing: 1 }}>Welcome to Sport Club Management System</h1>
          <p style={{ color: '#333', fontSize: 20, textAlign: 'center', marginBottom: 40 }}>
            Manage your club members, events, and resources with ease. Streamline operations and enhance your club experience!
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: 30 }}>
            {[
              { title: 'User Management', desc: 'Add, update, and view club members.', icon: '👥' },
              { title: 'Events', desc: 'Organize and track club events and activities.', icon: '🏆' },
              { title: 'Gallery', desc: 'Upload and view club photos.', icon: '📸' },
              { title: 'Contact Us', desc: 'Get in touch with club administrators.', icon: '☎️' },
              { title: 'Register', desc: 'Sign up to join the club.', icon: '📝' },
              { title: 'Login', desc: 'Access your member dashboard.', icon: '🔑' },
            ].map((card, idx) => (
              <FeatureCard key={card.title} index={idx} {...card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ title, desc, icon, index }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200 + index * 180);
    return () => clearTimeout(timer);
  }, [index]);
  return (
    <div
      style={{
        flex: '1 1 220px',
        background: '#e3eafc',
        borderRadius: 10,
        padding: 24,
        margin: 10,
        minWidth: 200,
        textAlign: 'center',
        boxShadow: '0 1px 6px rgba(26,35,126,0.07)',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1), transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 12 }}>{icon}</div>
      <h2 style={{ color: '#1a237e', fontSize: 22, margin: '10px 0' }}>{title}</h2>
      <p style={{ color: '#333', fontSize: 16 }}>{desc}</p>
    </div>
  );
}

export default Home
