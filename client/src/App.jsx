import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PortalHero } from './components/PortalHero';
import { StatementFold } from './components/StatementFold';
import { OurStorySection } from './components/OurStorySection';
import { DanceStyles } from './components/DanceStyles';
import { StageArenaSection } from './components/StageArenaSection';
import { GalleryShowcaseSection } from './components/GalleryShowcaseSection';
import { DanceReelsSection } from './components/DanceReelsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ScheduleSection } from './components/ScheduleSection';
import { CloseSection } from './components/CloseSection';
import { ContactPage } from './components/ContactPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      if (window.location.pathname === '/' && window.location.hash) {
        setTimeout(() => {
          const id = window.location.hash.slice(1);
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path) => {
    window.history.pushState(null, '', path);
    const pathname = path.split('#')[0] || '/';
    setCurrentPath(pathname);

    if (path.includes('#')) {
      const hash = '#' + path.split('#')[1];
      setTimeout(() => {
        const id = hash.slice(1);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isContactPage = currentPath === '/contact';

  return (
    <div className="min-h-screen w-full bg-[#F8FAFD] text-[#10203A] flex flex-col overflow-x-clip selection:bg-[#EAF1FB] selection:text-[#10203A]">
      {/* 1. Fixed Navigation Bar */}
      <Navbar currentPath={currentPath} onNavigate={navigate} />

      {/* Main Content Area */}
      {isContactPage ? (
        <main className="flex-1 w-full overflow-x-clip">
          <ContactPage onNavigateHome={() => navigate('/')} />
        </main>
      ) : (
        <main className="flex-1 w-full overflow-x-clip">
          {/* 2. Portal Hero */}
          <PortalHero />

          {/* 3. Statement Fold (Philosophy: id="philosophy") */}
          {/* <StatementFold /> */}

          {/* 4. Our Story & Heritage */}
          <OurStorySection />

          {/* 5. Motion Archive (Gallery: id="gallery") */}
          <GalleryShowcaseSection />

          {/* 6. Dance Reels in Motion (Reels: id="reels") */}
          <DanceReelsSection />

          {/* 7. Dance Styles (Styles: id="styles") */}
          {/* <DanceStyles /> */}

          {/* 8. Stage Arena Experience (Arena: id="arena") */}
          <StageArenaSection />

          {/* 9. Voices of the Court */}
          <TestimonialsSection />

          {/* 10. Weekly Schedule (Schedule: id="schedule") */}
          <ScheduleSection />
        </main>
      )}

      {/* Close & Footer (Branches: id="branches", Contact: id="contact") */}
      <CloseSection />
    </div>
  );
}
