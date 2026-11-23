import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import ProjectsPage from './components/ProjectsPage';
import Stack from './components/Stack';
import Contact from './components/Contact';
import Footer from './components/Footer';

// "#/projects" shows the all-projects page; every other hash shows the home page.
const getPage = () => (window.location.hash === '#/projects' ? 'projects' : 'home');

function App() {
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    const onHash = () => setPage(getPage());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // After switching pages, jump to the top or to the requested section.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (page === 'projects' || !id) {
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
          {page === 'projects' ? (
            <ProjectsPage />
          ) : (
            <>
              <Hero />
              <Projects />
              <Stack />
              <Contact />
            </>
          )}
          <Footer />
        </div>
      </main>
    </>
  );
}

export default App;