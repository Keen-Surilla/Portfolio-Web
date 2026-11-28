import React, { useState, useEffect, useRef } from 'react';
import './Sidebar.css';
import useTheme from '../hooks/useTheme';
import { emailProps } from '../utils/email';
import { profile, nav } from '../data/content';

const icons = {
  system: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  light: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  dark: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
};

const Icon = ({ children }) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const Sidebar = ({ page }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const lockRef = useRef(null); // section the visitor just clicked in the sidebar
  const { preference, setPreference } = useTheme();

  // Highlight the section being read. The last section (Contact) is short, so
  // when the page is scrolled all the way down we always pick the last one.
  useEffect(() => {
    if (page !== 'home') return undefined;
    const ids = nav.map((n) => n.id);

    const update = () => {
      // After a sidebar click, keep that item highlighted until the visitor scrolls by hand.
      if (lockRef.current) {
        setActive(lockRef.current);
        return;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }
      let current = '';
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
      });
      setActive(current);
    };

    const release = () => { lockRef.current = null; };
    const userEvents = ['wheel', 'touchmove', 'keydown', 'pointerdown'];

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    userEvents.forEach((e) => window.addEventListener(e, release, { passive: true }));
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      userEvents.forEach((e) => window.removeEventListener(e, release));
    };
  }, [page]);

  // On the full pages, the matching sidebar item stays highlighted.
  const pageId = page === 'projects' || page === 'certificates' ? page : null;
  const current = pageId || active;

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <a href="#home" className="sidebar-brand">{profile.name}</a>
        <button className="sidebar-burger" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          <span></span><span></span><span></span>
        </button>
      </div>

      <div className={`sidebar-body ${open ? 'active' : ''}`}>
        <nav className="sidebar-nav">
          {nav.map((item) => (
            <a
              key={item.id}
              href={item.id === pageId ? `#/${item.id}` : `#${item.id}`}
              className={`sidebar-link ${current === item.id ? 'current' : ''}`}
              onClick={() => {
                lockRef.current = item.id;
                setActive(item.id);
                setOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="theme-switch" role="group" aria-label="Theme">
            {['system', 'light', 'dark'].map((mode) => (
              <button
                key={mode}
                className={preference === mode ? 'on' : ''}
                onClick={() => setPreference(mode)}
                aria-label={`${mode} theme`}
                aria-pressed={preference === mode}
                title={mode}
              >
                <Icon>{icons[mode]}</Icon>
              </button>
            ))}
          </div>
          <p className="small">For work, collabs and everything else, reach me at</p>
          <a {...emailProps(profile.email)} className="sidebar-email">
            <svg className="sidebar-email-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            <span>{profile.email}</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;