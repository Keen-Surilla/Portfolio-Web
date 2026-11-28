import React from 'react';
import './Hero.css';
import { profile, hero, stats } from '../data/content';
import { emailProps } from '../utils/email';
import GazePhoto from "./GazePhoto";

// Small inline icons (no extra packages needed).
const ICONS = {
  code: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
  monitor: <><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></>,
  phone: <><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></>,
  rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></>,
  pencil: <><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></>,
  figma: <><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" /><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" /><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" /><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" /><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" /></>,
};

// Which icon goes with which chip word (add your own words here).
const CHIP_ICON = {
  'full-stack': 'code',
  web: 'monitor',
  'mobile apps': 'phone',
  mobile: 'phone',
  figma: 'figma',
  'cool new stuff': 'rocket',
  'rough ideas': 'pencil',
};

const Icon = ({ name }) =>
  ICONS[name] ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  ) : null;

// Turns [[word]] into a chip with an icon.
const renderIntro = (text) =>
  text.split(/(\[\[.*?\]\])/g).map((part, i) => {
    if (!part.startsWith('[[')) return part;
    const word = part.slice(2, -2);
    return (
      <span key={i} className="chip"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <Icon name={CHIP_ICON[word.toLowerCase()]} />
        {word}
      </span>
    );
  });

const Hero = () => (
  <section id="home" className="hero" style={{ position: 'relative' }}>
    {/* dotted corner background */}
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', top: 0, right: 0, width: 460, height: 320,
        pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(circle, rgba(128,128,128,0.55) 1.3px, transparent 1.6px)',
        backgroundSize: '16px 16px',
        WebkitMaskImage: 'radial-gradient(ellipse at top right, #000 0%, transparent 70%)',
        maskImage: 'radial-gradient(ellipse at top right, #000 0%, transparent 70%)',
      }}
    />
    <div className="hero-top" style={{ position: 'relative', zIndex: 1 }}>
      <GazePhoto alt={profile.name} className="hero-photo" fallback={profile.photo} />
      <div className="hero-text">
        <h1>{profile.name}</h1>
        <p className="hero-intro">{renderIntro(hero.intro)}</p>
        <p className="hero-now">{hero.now}</p>
        <div className="hero-links">
          {profile.links.map((l) => {
            const props = l.label === 'email'
              ? emailProps(profile.email)
              : { href: l.href, target: '_blank', rel: 'noopener noreferrer' };
            return (
              <a key={l.label} {...props}>
                {l.label}
                <span aria-hidden="true" style={{ display: 'inline-block', marginLeft: 4, fontSize: '0.85em' }}>↗</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>

    <div className="stats">
      {stats.map((s) => (
        <div key={s.label} className="stat">
          <span className="stat-value">{s.value}</span>
          <span className="small">{s.label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Hero;