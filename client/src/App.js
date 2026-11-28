import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import ProjectsPage from './components/ProjectsPage';
import Stack from './components/Stack';
import Certificates from './components/Certificates';
import CertificatesPage from './components/CertificatesPage';
import Footer from './components/Footer';
import GuideCursor from './components/GuideCursor';

// "#/projects" and "#/certificates" show their own full pages; every other hash shows the home page.
const getPage = () => {
  const hash = window.location.hash;
  if (hash === '#/projects') return 'projects';
  if (hash === '#/certificates') return 'certificates';
  return 'home';
};

function App() {
  const [page, setPage] = useState(getPage);
  const firstRun = useRef(true);

  useEffect(() => {
    const onHash = () => setPage(getPage());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // After switching pages, jump to the top or to the requested section.
  useEffect(() => {
    // Opening the site always starts at the top of the home page. A leftover "#projects"
    // in the address (from earlier clicks or a saved tab) is dropped instead of scrolling there.
    if (firstRun.current) {
      firstRun.current = false;
      if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
      if (page === 'home' && window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
    const id = window.location.hash.slice(1);
    if (page !== 'home' || !id) {
      window.scrollTo(0, 0);
      return;
    }
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView();
    });
  }, [page]);

  return (
    <>
      <Sidebar page={page} />
      <main className="main">
        <div className="main-inner">
          {page === 'projects' && <ProjectsPage />}
          {page === 'certificates' && <CertificatesPage />}
          {page === 'home' && (
            <>
              <Hero />
              <Projects />
              <Stack />
              <Certificates />
            </>
          )}
          <Footer />
        </div>
      </main>
      <GuideCursor />
    </>
  );
}

export default App;