import React from 'react';
import './Experience.css';
import { experience } from '../data/content';

const Experience = () => (
  <section id="experience" className="section">
    <div className="section-head"><span className="section-index">02</span><h2>experience</h2></div>
    <ul className="timeline">
      {experience.map((e) => (
        <li key={e.org} className="timeline-row">
          <span className="mono small">{e.when}</span>
          <div>
            <h3>{e.title}</h3>
            <p className="small">{e.org}</p>
          </div>
          <span className="small timeline-note">{e.note}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default Experience;