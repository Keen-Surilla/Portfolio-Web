import React, { useEffect, useRef, useState } from 'react';
import './GuideCursor.css';

// A small labeled cursor that greets first-time visitors, introduces the links under
// the intro, glides to each sidebar link, then fades away. It runs automatically once per
// browser; afterwards a small "take the tour again" pill at the bottom replays it.
// Test the first-visit tour again with ?guide in the address (e.g. localhost:3000/?guide).
//
// While it moves, it broadcasts its position as a "guide-gaze" event so the hero photo
// can look at it. When it finishes it sends { detail: null }, so the photo goes back
// to following the visitor's mouse.
const NAME = 'Keen';
const STORAGE_KEY = 'portfolio-guide-seen';
const PILL_KEY = 'portfolio-guide-pill-hidden';

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

const ARROW = 'M3.5 2.5l6.5 16.5 2.4-6.6L19 10 3.5 2.5z';

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

// The tour is for desktop mice only (not touch screens, small screens or reduced motion).
const canRunTour = () => {
  if (typeof window === 'undefined') return false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smallOrTouch = window.matchMedia('(max-width: 900px), (hover: none)').matches;
  return !(reduceMotion || smallOrTouch);
};

// First visit (or ?guide in the address) starts the tour by itself.
const shouldAutoRun = (page) => {
  if (!canRunTour() || page !== 'home') return false;
  if (new URLSearchParams(window.location.search).has('guide')) return true;
  try { return window.localStorage.getItem(STORAGE_KEY) !== '1'; } catch (e) { return true; }
};

const readSession = (key) => {
  try { return window.sessionStorage.getItem(key) === '1'; } catch (e) { return false; }
};

const GuideCursor = ({ page = 'home' }) => {
  const [canTour] = useState(canRunTour);
  const [runId, setRunId] = useState(() => (shouldAutoRun(page) ? 1 : 0));
  const [running, setRunning] = useState(runId > 0); // true from the start of a tour until it has faded out
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [text, setText] = useState('');
  const [pillHidden, setPillHidden] = useState(() => readSession(PILL_KEY));
  const cursorRef = useRef(null);
  const pageRef = useRef(page);

  useEffect(() => { pageRef.current = page; }, [page]);

  // The tour itself. Runs again whenever runId goes up (the pill adds 1).
  useEffect(() => {
    if (!runId) return undefined;

    let cancelled = false;
    let timer;
    const stopListening = () => {
      window.removeEventListener('keydown', onInput); // eslint-disable-line no-use-before-define
      window.removeEventListener('pointerdown', onInput); // eslint-disable-line no-use-before-define
    };
    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      stopListening();
      setLeaving(true);
      timer = setTimeout(() => { setActive(false); setRunning(false); }, 450);
    };
    function onInput() { finish(); } // any key press or click ends the tour
    const alive = () => {
      if (cancelled) return false;
      if (pageRef.current !== 'home') { finish(); return false; } // visitor left the home page
      return true;
    };

    const run = async () => {
      setRunning(true);
      setLeaving(false);
      await sleep(runId === 1 ? 1500 : 800); // let the page settle (or scroll back to the top)
      if (!alive()) return;
      try { window.localStorage.setItem(STORAGE_KEY, '1'); } catch (e) { /* ignore */ }

      // Start near the intro text
      setPos({ x: window.innerWidth * 0.58, y: window.innerHeight * 0.2 });
      setText(STEPS[0].text);
      setActive(true);
      window.addEventListener('keydown', onInput);
      window.addEventListener('pointerdown', onInput);
      await sleep(STEPS[0].hold);

      for (const step of STEPS.slice(1)) {
        if (!alive()) return;
        const r = step.hero ? findHeroLink(step.hero) : findNavLink(step.nav);
        if (r) {
          setPos({ x: r.left + r.width * 0.4, y: r.top + r.height * 0.6 });
          await sleep(1000); // wait for the glide
          if (!alive()) return;
          setText(step.text);
          await sleep(1600);
        }
      }
      finish();
    };
    run();

    return () => {
      cancelled = true;
      clearTimeout(timer);
      stopListening();
      setActive(false);
      setRunning(false);
    };
  }, [runId]);

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

  const replay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setRunning(true);
    setRunId((n) => n + 1);
  };

  const hidePill = () => {
    try { window.sessionStorage.setItem(PILL_KEY, '1'); } catch (e) { /* ignore */ }
    setPillHidden(true);
  };

  const showPill = canTour && page === 'home' && !running && !pillHidden;
  const flip = pos.x > window.innerWidth - 340; // keep the bubble on screen near the right edge
  const below = pos.y < 120; // ...and near the top edge

  return (
    <>
      {showPill && (
        <div className="tour-pill-wrap">
        <div className="tour-pill" role="group" aria-label="Site tour">
          <button type="button" className="tour-pill-main" onClick={replay}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
              <path d="M21 3v5h-5" />
            </svg>
            take the tour again
          </button>
          <button type="button" className="tour-pill-close" onClick={hidePill} aria-label="Hide this button">×</button>
        </div>
        </div>
      )}

      {active && (
        <div
          ref={cursorRef}
          className={`guide-cursor${leaving ? ' is-leaving' : ''}${flip ? ' flip' : ''}${below ? ' below' : ''}`}
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
          aria-hidden="true"
        >
          {/* Chunky, rounded arrow: a thick round-joined stroke gives soft corners; the white one is the outline */}
          <svg className="guide-arrow" viewBox="0 0 24 24">
            <path d={ARROW} fill="#fff" stroke="#fff" strokeWidth="5.5" strokeLinejoin="round" strokeLinecap="round" />
            <path d={ARROW} fill="#000" stroke="#000" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          <div className="guide-bubble" key={text}>
            <small>{NAME}</small>
            {text}
          </div>
        </div>
      )}
    </>
  );
};

export default GuideCursor;