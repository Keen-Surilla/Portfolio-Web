import React from 'react';
import './Stack.css';
import { stack } from '../data/content';

const Stack = () => (
  <section id="stack" className="section">
    <div className="section-head"><span className="section-index">02</span><h2>stack</h2></div>
    <div className="stack-list">{stack.map((s) => <span key={s} className="tag">{s}</span>)}</div>
  </section>
);

export default Stack;