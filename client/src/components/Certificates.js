import React from 'react';
import './Certificates.css';
import { certificates } from '../data/content';
import CertCard from './CertCard';

// Homepage section: selected training (featured ones) + the technical events.
const Certificates = () => {
  const training = certificates.filter((c) => c.category === 'Training' && c.featured);
  const events = certificates.filter((c) => c.category === 'Technical events');

  return (
    <section id="certificates" className="section">
      <div className="section-head">
        <span className="section-index">03</span>
        <h2>training &amp; events</h2>
        <a href="#/certificates" className="section-link">all training &amp; events →</a>
      </div>

      <div className="cert-group">
        <p className="cert-group-title">Selected training</p>
        <div className="cert-grid">
          {training.map((c) => <CertCard key={c.title} cert={c} />)}
        </div>
      </div>

      <div className="cert-group">
        <p className="cert-group-title">Technical events</p>
        <div className="cert-grid cert-grid--wide">
          {events.map((c) => <CertCard key={c.title} cert={c} />)}
        </div>
      </div>
    </section>
  );
};

export default Certificates;