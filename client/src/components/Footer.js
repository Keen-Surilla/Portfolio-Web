import React from 'react';
import './Footer.css';
import { profile } from '../data/content';

const Footer = () => (
  <footer className="footer">
    <p className="small">© {new Date().getFullYear()} {profile.name}</p>
    <div className="footer-links">
      {profile.links.filter((l) => l.href.startsWith('http')).map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
      ))}
    </div>
  </footer>
);

export default Footer;