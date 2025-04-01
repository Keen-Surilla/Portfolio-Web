import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <h2 className="section-title">
          <span className="code-symbol">{'<'}</span>
          <span>About Me</span>
          <span className="code-symbol">{'/>'}</span>
        </h2>

        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
            I am a UI/UX designer passionate about creating intuitive and user-centered digital experiences. With a strong eye for detail and a focus on usability, I design seamless interfaces that enhance engagement and functionality.
            </p>
            
            <div className="about-details">
              <div className="about-item">
                <span className="about-label">Experience:</span>
                <span className="about-value">2 months</span>
              </div>
              <div className="about-item">
                <span className="about-label">Projects Completed:</span>
                <span className="about-value">4</span>
              </div>
              <div className="about-item">
                <span className="about-label">Clients Served:</span>
                <span className="about-value">0</span>
              </div>
            </div>
          </div>

          <div className="about-image-container">
            <img 
              src="/about.jpg" 
              alt="Keen Draylin Surilla" 
              className="about-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 