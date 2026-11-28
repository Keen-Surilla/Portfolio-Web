import React from 'react';
import './Certificates.css';
import { certificates } from '../data/content';
import CertCard from './CertCard';

// Group by category in the order they first appear (Training, then Technical events).
const groups = certificates.reduce((acc, c) => {
  const key = c.category || 'Other';
  (acc[key] = acc[key] || []).push(c);
  return acc;
}, {});

const CertificatesPage = () => (
  <section className="projects-page">
    <a href="#home" className="back-link">← back home</a>
    <h1>training &amp; events</h1>
    <p className="projects-page-intro">Courses I’ve completed and technical events I’ve joined or helped organize.</p>

    {Object.entries(groups).map(([name, items]) => (
      <div key={name} className="cert-group">
        <p className="cert-group-title">{name}</p>
        <div className={`cert-grid ${name === 'Technical events' ? 'cert-grid--wide' : ''}`}>
          {items.map((c) => <CertCard key={c.title} cert={c} />)}
        </div>
      </div>
    ))}
  </section>
);

export default CertificatesPage;