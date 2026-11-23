import React, { useState } from 'react';
import './Contact.css';
import { profile } from '../data/content';
import { emailProps } from '../utils/email';

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {}
  };

  return (
    <section id="contact" className="section">
      <div className="section-head"><span className="section-index">03</span><h2>say hello</h2></div>
      <p className="contact-text">For work, collabs, or just to say hi, drop me a line.</p>
      <div className="contact-email card">
        <span className="mono">{profile.email}</span>
        <button className="btn btn-secondary" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
      </div>
      <div className="contact-actions">
        <a className="btn btn-primary" {...emailProps(profile.email)}>Send an email</a>
        <span className="small">{profile.location}</span>
      </div>
    </section>
  );
};

export default Contact;