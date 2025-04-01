import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="code-symbol">{'<'}</span>
            <span className="title-text">Hello World</span>
            <span className="code-symbol">{'/>'}</span>
          </h1>
          <h2 className="hero-subtitle">I'm Keen Draylin Surilla a UI/UX Designer</h2>
          <p className="hero-description">
            Crafting beautiful user experiences and powerful backend solutions
          </p>
          <div className="hero-cta">
            <a href="#projects" className="cta-button primary">View My Work</a>
            <a href="#contact" className="cta-button secondary">Get In Touch</a>
          </div>
        </div>
        <div className="hero-image-container">
          <img 
            src="/me.png" 
            alt="Keen Draylin Surilla"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero; 