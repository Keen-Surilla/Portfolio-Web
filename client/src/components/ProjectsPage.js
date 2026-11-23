import React from 'react';
import './ProjectsPage.css';
import { projects, moreProjects } from '../data/content';

const all = [...projects, ...moreProjects];

const ProjectsPage = () => (
  <section className="projects-page">
    <a href="#home" className="back-link">← back home</a>
    <h1>projects</h1>
    <p className="projects-page-intro">Web, mobile, embedded and design work from my time as a student.</p>

    <div className="projects-grid">
      {all.map((p) => (
        <article key={p.title} className="card page-card">
          <div className="page-image">
            {p.image ? <img src={p.image} alt={p.title} /> : <span className="small">Screenshot coming soon</span>}
          </div>
          <div className="page-body">
            <div className="fan-badges">
              {p.badges.map((b, i) => (
                <span key={b} className={`badge ${i === 0 ? 'solid' : ''}`}>{i === 0 ? `{ ${b} }` : b}</span>
              ))}
            </div>
            <h3>{p.title}</h3>
            <p className="small page-description">{p.description}</p>
            <div className="page-tags">{p.technologies.map((t) => <span key={t} className="tag">{t}</span>)}</div>
            {p.link ? (
              <a href={p.link} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">View project</a>
            ) : (
              <span className="small">In development</span>
            )}
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default ProjectsPage;