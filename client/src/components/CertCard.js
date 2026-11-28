import React, { useState } from 'react';
import './Certificates.css';

// Small round-cornered logo; falls back to a letter badge when there is no icon.
const CertIcon = ({ icon, label }) => {
  const [broken, setBroken] = useState(false);
  return (
    <span className="cert-icon" aria-hidden="true">
      {icon && !broken ? (
        <img src={icon} alt="" draggable="false" onError={() => setBroken(true)} />
      ) : (
        <span className="cert-letter">{(label || '?').trim().charAt(0).toUpperCase()}</span>
      )}
    </span>
  );
};

const CertCard = ({ cert: c }) => (
  <article className={`card cert-tile ${c.link ? 'has-link' : ''}`}>
    {/* Events have no logo, so they skip the icon; add `icon` in content.js to show one */}
    {(c.category !== 'Technical events' || c.icon) && (<CertIcon icon={c.icon} label={c.issuer || c.title} />)}
    <h3>{c.title}</h3>
    {c.subtitle && <p className="cert-subtitle">{c.subtitle}</p>}
    {c.issuer && <p className="cert-issuer">{c.issuer}</p>}
    <p className="cert-date">{c.date}</p>
    {/* Courses show "verify" instead of a badge; events keep their role badge */}
    {c.category !== 'Training' && <span className="badge cert-badge">{c.type}</span>}
    {c.description && <p className="cert-description">{c.description}</p>}
    {/* Only shown when a real link is given in content.js */}
    {c.link && (
      <a
        href={c.link}
        className="cert-verify"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Verify certificate: ${c.title}`}
      >
        <span aria-hidden="true">‹</span> verify <span aria-hidden="true">›</span>
      </a>
    )}
  </article>
);

export default CertCard;