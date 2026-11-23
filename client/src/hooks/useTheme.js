import { useState, useEffect } from 'react';

const KEY = 'theme-preference'; // 'system' | 'light' | 'dark'
const MODES = ['system', 'light', 'dark'];

const getPreference = () => {
  try {
    const saved = localStorage.getItem(KEY);
    if (MODES.includes(saved)) return saved;
  } catch (e) {}
  return 'system';
};

const query = () => (window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null);
const getSystem = () => {
  const mq = query();
  return mq && mq.matches ? 'light' : 'dark';
};

export default function useTheme() {
  const [preference, setPreference] = useState(getPreference);
  const [system, setSystem] = useState(getSystem);

  // Follow the device setting while it changes.
  useEffect(() => {
    const mq = query();
    if (!mq) return undefined;
    const onChange = () => setSystem(mq.matches ? 'light' : 'dark');
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  const theme = preference === 'system' ? system : preference;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    try { localStorage.setItem(KEY, preference); } catch (e) {}
  }, [preference]);

  return { preference, setPreference, theme };
}