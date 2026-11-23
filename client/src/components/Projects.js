import React from 'react';
import './Projects.css';
import { projects } from '../data/content';

const positions = ['left', 'center', 'right'];

const FanCard = ({ project: p, pos }) => (
  <div className={`fan-slot fan-${pos}`}>
  <article className="card fan-card">
    <div className="fan-badges">
      {p.badges.map((b, i) => (
        <span key={b} className={`badge ${i === 0 ? 'solid' : ''}`}>{i === 0 ? `{ ${b} }` : b}</span>
      ))}
    </div>
    <div className="fan-title">
      {p.image ? <img src={p.image} alt="" className="fan-icon" /> : <span className="fan-icon" />}
      <h3>{p.title}</h3>
    </div>
    <p className="fan-description">{p.description}</p>
    {p.link ? (
      <a href={p.link} className="btn btn-primary fan-button" target="_blank" rel="noopener noreferrer">View project</a>
    ) : (
      <span className="small">In development</span>
    )}
  </article>
  </div>
);

const Projects = () => (
  <section id="projects" className="section">
    <div className="section-head">
      <span className="section-index">01</span>
      <h2>projects</h2>
      <a href="#/projects" className="section-link">all projects →</a>
    </div>
    <div className="fan">
      {projects.slice(0, 3).map((p, i) => <FanCard key={p.title} project={p} pos={positions[i]} />)}
    </div>
  </section>
);

export default Projects;