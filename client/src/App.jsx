import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PortalHero } from './components/PortalHero';
import { OurStorySection } from './components/OurStorySection';
import { GalleryShowcaseSection } from './components/GalleryShowcaseSection';
import { DanceReelsSection } from './components/DanceReelsSection';
import { StageArenaSection } from './components/StageArenaSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { StatementFold } from './components/StatementFold';
import { ScheduleSection } from './components/ScheduleSection';
import { CloseSection } from './components/CloseSection';
import { ContactPage } from './components/ContactPage';
import { AboutUsPage } from './components/AboutUsPage';
import { CoursesPage } from './components/CoursesPage';
import { CourseDetailsPage } from './components/CourseDetailsPage';
import { WorkshopsPage } from './components/WorkshopsPage';
import { WorkshopDetailsPage } from './components/WorkshopDetailsPage';
import { OurFacilitiesPage } from './components/OurFacilitiesPage';
import { FranchisePage } from './components/FranchisePage';
import { GalleryPage } from './components/GalleryPage';
import { UpcomingWorkshopModal } from './components/UpcomingWorkshopModal';
import { WorkshopFloatingButton } from './components/WorkshopFloatingButton';
import { DisciplineBanner } from './components/DisciplineBanner';
import { getNextUpcomingWorkshop } from './data/workshops';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [isNearbyWorkshopOpen, setIsNearbyWorkshopOpen] = useState(false);
  const [isWorkshopModalOpen, setIsWorkshopModalOpen] = useState(false);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState(null);
  const [bookingWorkshop, setBookingWorkshop] = useState(null);

  // 3-second automatic popup for nearby workshop card (once per session)
  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem('rbdc_workshop_popup_dismissed');
      if (!dismissed) {
        const timer = setTimeout(() => {
          setIsNearbyWorkshopOpen(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore storage restrictions if cookies/storage disabled
    }
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);

      if (path === '/' && window.location.hash) {
        setTimeout(() => {
          const id = window.location.hash.slice(1);
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const handleCloseWorkshopModal = () => {
    setIsWorkshopModalOpen(false);
    try {
      sessionStorage.setItem('rbdc_workshop_popup_dismissed', 'true');
    } catch {
      // storage unavailable
    }
  };

  const handleBookSlot = (workshop) => {
    const target = workshop || getNextUpcomingWorkshop();
    setBookingWorkshop(target);
    setIsWorkshopModalOpen(false);
    try {
      sessionStorage.setItem('rbdc_workshop_popup_dismissed', 'true');
    } catch {
      // storage unavailable
    }
    navigate('/contact-us');
  };

  const handleViewWorkshopDetails = (workshopId) => {
    setIsWorkshopModalOpen(false);
    try {
      sessionStorage.setItem('rbdc_workshop_popup_dismissed', 'true');
    } catch {
      // storage unavailable
    }
    navigate(`/workshops/${workshopId}`);
  };

  const renderCurrentView = () => {
    // Dynamic Workshop Details Page Route: /workshops/:id
    if (currentPath.startsWith('/workshops/')) {
      const workshopId = currentPath.replace('/workshops/', '').split('/')[0];
      if (workshopId) {
        return (
          <WorkshopDetailsPage
            workshopId={workshopId}
            onNavigate={navigate}
            onBookSlot={handleBookSlot}
          />
        );
      }
    }

    // Dynamic Course / Discipline Details Page Route: /courses/:id or /disciplines/:id
    if (currentPath.startsWith('/courses/') || currentPath.startsWith('/disciplines/')) {
      const cleanPath = currentPath.startsWith('/courses/')
        ? currentPath.replace('/courses/', '')
        : currentPath.replace('/disciplines/', '');
      const courseId = cleanPath.split('?')[0].split('#')[0].split('/')[0];
      const searchParams = new URLSearchParams(
        cleanPath.includes('?')
          ? cleanPath.split('?')[1]
          : (typeof window !== 'undefined' ? window.location.search : '')
      );
      const initialTab = searchParams.get('tab');
      if (courseId) {
        return (
          <CourseDetailsPage
            courseId={courseId}
            initialTab={initialTab}
            onNavigate={navigate}
          />
        );
      }
    }

    switch (currentPath) {
      case '/about-us':
      case '/about':
        return <AboutUsPage onNavigate={navigate} />;
      case '/courses':
        return <CoursesPage onNavigate={navigate} />;
      case '/workshops':
        return (
          <WorkshopsPage
            onNavigate={navigate}
            onBookSlot={handleBookSlot}
          />
        );
      case '/our-facilities':
      case '/facilities':
        return <OurFacilitiesPage onNavigate={navigate} />;
      case '/franchise':
        return <FranchisePage onNavigate={navigate} />;
      case '/gallery':
        return <GalleryPage onNavigate={navigate} />;
      case '/contact-us':
      case '/contact':
        return (
          <ContactPage
            onNavigateHome={() => navigate('/')}
            bookingWorkshop={bookingWorkshop}
            onClearBookingWorkshop={() => setBookingWorkshop(null)}
          />
        );
      case '/':
      default:
        return (
          <>
            {/* 1. Portal Hero */}
            <PortalHero />

            {/* 2. Our Story & Heritage */}
            <OurStorySection />

            {/* 3. Motion Archive (Gallery) */}
            <GalleryShowcaseSection />

            {/* 4. Dance Reels in Motion */}
            <DanceReelsSection />

            {/* 5. Stage Arena Experience */}
            <StageArenaSection />

            {/* 6. Voices of the Court */}
            <TestimonialsSection />

            {/* 7. Philosophy & Creed (Bungee Movement) */}
            {/* <StatementFold /> */}

            {/* 8. Weekly Schedule */}
            {/* <ScheduleSection /> */}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F1F3F5] text-[#222222] flex flex-col overflow-x-clip selection:bg-[#145A96]/20 selection:text-[#222222]">
      {/* Fixed Navigation Bar */}
      <Navbar currentPath={currentPath} onNavigate={navigate} />

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-x-clip">
        {renderCurrentView()}
      </main>

      {/* Academy Disciplines & Movement Arts Banner */}
      <DisciplineBanner onSelectDiscipline={() => navigate('/courses')} />

      {/* Close & Footer */}
      <CloseSection />

      {/* Fixed Animated Floating Circle Button for Upcoming Workshop (hidden on dedicated workshop details page to keep booking UI clean & unobstructed) */}
      {!currentPath.startsWith('/workshops/') && (
        <WorkshopFloatingButton
          isOpen={isNearbyWorkshopOpen}
          onToggle={() => setIsNearbyWorkshopOpen((prev) => !prev)}
          onClose={() => setIsNearbyWorkshopOpen(false)}
          onNavigate={navigate}
          onSelectWorkshop={(workshopId) => {
            navigate(`/workshops/${workshopId}`);
          }}
        />
      )}

      {/* Upcoming Workshop Modal Dialog */}
      <UpcomingWorkshopModal
        isOpen={isWorkshopModalOpen}
        selectedWorkshopId={selectedWorkshopId}
        onClose={handleCloseWorkshopModal}
        onBookSlot={handleBookSlot}
        onViewDetails={handleViewWorkshopDetails}
      />
    </div>
  );
}
