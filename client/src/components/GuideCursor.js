import React, { useEffect, useRef, useState } from 'react';
import './GuideCursor.css';

// A small labeled cursor that greets first-time visitors, introduces the links under
// the intro, glides to each sidebar link, then fades away. It runs once per browser.
// Test it again with ?guide in the address (e.g. localhost:3000/?guide).
//
// While it moves, it broadcasts its position as a "guide-gaze" event so the hero photo
// can look at it. When it finishes it sends { detail: null }, so the photo goes back
// to following the visitor's mouse.
const NAME = 'Keen';
const STORAGE_KEY = 'portfolio-guide-seen';

// hero: matched by the link text inside .hero-links; nav: matched by the link address.
const STEPS = [
  { text: 'Hi! I’m Keen, welcome to my portfolio! 👋', hold: 2600 },
  { hero: 'github', text: 'This is my GitHub.' },
  { hero: 'facebook', text: 'This is my Facebook.' },
  { hero: 'email', text: 'And this is my email.' },
  { nav: 'projects', text: 'Things I’ve built.' },
  { nav: 'stack', text: 'The tools I work with.' },
  { nav: 'certificates', text: 'My training and events.' },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const visibleRect = (el) => {
  const r = el.getBoundingClientRect();
  const ok = r.width && r.height && r.top >= 0 && r.bottom <= window.innerHeight;
  return ok ? r : null;
};

const findHeroLink = (label) => {
  for (const el of document.querySelectorAll('.hero-links a')) {
    if (el.textContent.trim().toLowerCase().startsWith(label)) return visibleRect(el);
  }
  return null;
};

const findNavLink = (key) => {
  for (const el of document.querySelectorAll(`a[href*="${key}"]`)) {
    const r = visibleRect(el);
    if (r) return r;
  }
  return null;
};

const sendGaze = (detail) => window.dispatchEvent(new CustomEvent('guide-gaze', { detail }));

const GuideCursor = () => {
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [text, setText] = useState('');
  const cursorRef = useRef(null);

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).has('guide');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const smallOrTouch = window.matchMedia('(max-width: 900px), (hover: none)').matches;
    if (reduceMotion || smallOrTouch) return undefined;

    let seen = false;
    try { seen = window.localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) { /* storage blocked */ }
    if (seen && !forced) return undefined;

    let cancelled = false;
    const stop = () => { cancelled = true; setLeaving(true); setTimeout(() => setActive(false), 450); };
    const onInput = () => stop();

    const run = async () => {
      await sleep(1500); // let the page settle first
      if (cancelled) return;
      try { window.localStorage.setItem(STORAGE_KEY, '1'); } catch (e) { /* ignore */ }

      // Start near the intro text
      setPos({ x: window.innerWidth * 0.58, y: window.innerHeight * 0.2 });
      setText(STEPS[0].text);
      setActive(true);
      window.addEventListener('keydown', onInput);
      window.addEventListener('pointerdown', onInput);
      await sleep(STEPS[0].hold);

      for (const step of STEPS.slice(1)) {
        if (cancelled) return;
        const r = step.hero ? findHeroLink(step.hero) : findNavLink(step.nav);
        if (r) {
          setPos({ x: r.left + r.width * 0.4, y: r.top + r.height * 0.6 });
          await sleep(1000); // wait for the glide
          if (cancelled) return;
          setText(step.text);
          await sleep(1600);
        }
      }
      if (!cancelled) stop();
    };
    run();

    return () => {
      cancelled = true;
      window.removeEventListener('keydown', onInput);
      window.removeEventListener('pointerdown', onInput);
    };
  }, []);

  // While the guide is on screen, tell the hero photo where it is, every frame.
  useEffect(() => {
    if (!active) return undefined;
    let raf;
    const loop = () => {
      const el = cursorRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        sendGaze({ x: r.left, y: r.top });
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      sendGaze(null); // hand control back to the visitor's mouse
    };
  }, [active]);

  if (!active) return null;

  const flip = pos.x > window.innerWidth - 340;

  return (
    <div
      ref={cursorRef}
      className={`guide-cursor${leaving ? ' is-leaving' : ''}${flip ? ' flip' : ''}`}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      aria-hidden="true"
    >
      <svg className="guide-arrow" viewBox="0 0 24 24">
        <path d="M3 2l7 18 2.6-7.4L20 10 3 2z" fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <div className="guide-bubble" key={text}>
        <small>{NAME}</small>
        {text}
      </div>
    </div>
  );
};

export default GuideCursor;