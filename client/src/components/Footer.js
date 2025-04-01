import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          <span className="code-symbol">{'<'}</span>
          <span>Made with</span>
          <span className="heart">❤</span>
          <span>by</span>
          <span className="name">Keen</span>
          <span className="code-symbol">{'/>'}</span>
        </div>
        
        <div className="footer-links">
          <a href="https://github.com/dashboard" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.facebook.com/share/1A5rAmA7nP/" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 