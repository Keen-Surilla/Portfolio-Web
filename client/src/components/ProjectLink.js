import React from 'react';
import './ProjectLink.css';

// Picks the label from where the link goes.
const labelFor = (url) => {
  let host = '';
  try { host = new URL(url).hostname.replace(/^www\./, ''); } catch (e) { /* ignore */ }
  if (host === 'github.com') return 'source code';
  if (host.endsWith('figma.com')) return 'view design';
  return 'live demo'; // anything else is a deployed site
};

const ProjectLink = ({ href, label, className = '', ...rest }) => (
  <a
    href={href}
    className={`project-link ${className}`}
    target="_blank"
    rel="noopener noreferrer"
    {...rest}
  >
    {label || labelFor(href)}
    <span className="project-link-arrow" aria-hidden="true">↗</span>
  </a>
);

export default ProjectLink;