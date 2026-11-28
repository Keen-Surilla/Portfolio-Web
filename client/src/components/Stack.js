import React from 'react';
import './Stack.css';
import { stack } from '../data/content';

// `stack` in content.js can be grouped: [{ group: 'Frontend', items: ['React', ...] }, ...]
// A plain list of strings still works too.
const groups = stack.length && typeof stack[0] === 'string'
  ? [{ group: '', items: stack }]
  : stack;

const Stack = () => (
  <section id="stack" className="section">
    <div className="section-head"><span className="section-index">02</span><h2>tech stack</h2></div>
    <div className="stack-groups">
      {groups.map((g) => (
        <div className="stack-group" key={g.group || 'all'}>
          {g.group && <h3 className="stack-group-label">{g.group}</h3>}
          <div className="stack-list">
            {g.items.map((s) => <span key={s} className="tag">{s}</span>)}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Stack;