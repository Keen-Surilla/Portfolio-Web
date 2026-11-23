import React from 'react';
import './Awards.css';
import { awards } from '../data/content';

const Awards = () => (
  <section id="awards" className="section">
    <div className="section-head"><span className="section-index">04</span><h2>awards</h2></div>
    <div className="awards-grid">
      {awards.map((a) => (
        <div key={a.note} className="card award">
          <h3>{a.title}</h3>
          <p className="small">{a.note}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Awards;