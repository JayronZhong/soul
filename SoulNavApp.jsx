import React, { useState } from 'react';

/**
 * SoulNavApp - A navigation application component for Soul
 * Designed for Vercel deployment
 */
const SoulNavApp = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navigationItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '📖' },
    { id: 'features', label: 'Features', icon: '✨' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="content-section">
            <h2>Welcome to Soul</h2>
            <p>Your spiritual navigation companion</p>
          </div>
        );
      case 'about':
        return (
          <div className="content-section">
            <h2>About Soul</h2>
            <p>Soul is a navigation application designed to help you find your way through life's journey.</p>
          </div>
        );
      case 'features':
        return (
          <div className="content-section">
            <h2>Features</h2>
            <ul>
              <li>Intuitive navigation interface</li>
              <li>Personalized experience</li>
              <li>Seamless integration</li>
              <li>Responsive design</li>
            </ul>
          </div>
        );
      case 'contact':
        return (
          <div className="content-section">
            <h2>Contact Us</h2>
            <p>Get in touch with the Soul team</p>
            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for your message! We will get back to you soon.'); e.target.reset(); }}>
              <label htmlFor="contact-name" style={{ display: 'none' }}>Your Name</label>
              <input id="contact-name" type="text" placeholder="Your Name" aria-label="Your Name" required />
              <label htmlFor="contact-email" style={{ display: 'none' }}>Your Email</label>
              <input id="contact-email" type="email" placeholder="Your Email" aria-label="Your Email" required />
              <label htmlFor="contact-message" style={{ display: 'none' }}>Your Message</label>
              <textarea id="contact-message" placeholder="Your Message" aria-label="Your Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        );
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="soul-nav-app">
      <header className="app-header">
        <h1>Soul Navigation</h1>
      </header>
      
      <nav className="app-navigation">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <main className="app-content">
        {renderContent()}
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Soul Navigation App. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .soul-nav-app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
        }

        .app-header {
          padding: 2rem;
          text-align: center;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
        }

        .app-header h1 {
          margin: 0;
          font-size: 2.5rem;
          font-weight: 700;
        }

        .app-navigation {
          display: flex;
          justify-content: center;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(5px);
          flex-wrap: wrap;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid transparent;
          border-radius: 12px;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          min-width: 100px;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .nav-item.active {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .nav-icon {
          font-size: 1.5rem;
        }

        .nav-label {
          font-weight: 500;
        }

        .app-content {
          flex: 1;
          padding: 2rem;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
        }

        .content-section {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 2rem;
          animation: fadeIn 0.5s ease;
        }

        .content-section h2 {
          margin-top: 0;
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .content-section p {
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .content-section ul {
          list-style: none;
          padding: 0;
        }

        .content-section li {
          padding: 0.75rem 0;
          padding-left: 1.5rem;
          position: relative;
          font-size: 1.1rem;
        }

        .content-section li::before {
          content: '✓';
          position: absolute;
          left: 0;
          font-weight: bold;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .contact-form input,
        .contact-form textarea {
          padding: 0.75rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-size: 1rem;
          font-family: inherit;
        }

        .contact-form input::placeholder,
        .contact-form textarea::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .contact-form textarea {
          min-height: 150px;
          resize: vertical;
        }

        .contact-form button {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .contact-form button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .app-footer {
          padding: 1.5rem;
          text-align: center;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
        }

        .app-footer p {
          margin: 0;
          opacity: 0.8;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .app-header h1 {
            font-size: 1.8rem;
          }

          .app-navigation {
            padding: 1rem;
          }

          .nav-item {
            padding: 0.75rem 1rem;
            min-width: 80px;
          }

          .app-content {
            padding: 1rem;
          }

          .content-section {
            padding: 1.5rem;
          }

          .content-section h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SoulNavApp;
