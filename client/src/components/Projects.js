import React, { useState } from 'react';
import './Projects.css';
import { projects } from '../data/content';
import ProjectLink from './ProjectLink';

const positions = ['left', 'center', 'right'];

const FanCard = ({ project: p, pos, onSelect }) => {
  const isSide = pos !== 'center';

  // Side cards are clickable (and keyboard accessible): clicking brings them to the middle.
  const onKeyDown = (e) => {
    if (isSide && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <article
      className={`card fan-card fan-${pos}`}
      onClick={isSide ? onSelect : undefined}
      onKeyDown={onKeyDown}
      role={isSide ? 'button' : undefined}
      tabIndex={isSide ? 0 : undefined}
      aria-label={isSide ? `Show ${p.title} in the middle` : undefined}
    >
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
        <ProjectLink href={p.link} className="fan-link" tabIndex={isSide ? -1 : undefined} />
      ) : (
        <span className="small fan-link">In development</span>
      )}
    </article>
  );
};

const Projects = () => {
  const featured = projects.slice(0, 3);
  // order[slot] = index of the project in that slot: [left, center, right]
  const [order, setOrder] = useState([0, 1, 2]);

  // Clicking a side card swaps it with the one in the middle.
  const select = (slot) =>
    setOrder((o) => {
      const next = [...o];
      [next[slot], next[1]] = [next[1], next[slot]];
      return next;
    });

  return (
    <section id="projects" className="section">
      <div className="section-head">
        <span className="section-index">01</span>
        <h2>projects</h2>
        <a href="#/projects" className="section-link">all projects →</a>
      </div>
      <div className="fan">
        {featured.map((p, i) => {
          const slot = order.indexOf(i);
          return <FanCard key={p.title} project={p} pos={positions[slot]} onSelect={() => select(slot)} />;
        })}
      </div>
    </section>
  );
};

export default Projects;