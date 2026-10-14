import { Navbar } from './components/Navbar';
import { PortalHero } from './components/PortalHero';
import { StatementFold } from './components/StatementFold';
import { MilestonesSection } from './components/MilestonesSection';
import { DanceStyles } from './components/DanceStyles';
import { StageArenaSection } from './components/StageArenaSection';
import { GalleryShowcaseSection } from './components/GalleryShowcaseSection';
import { DanceReelsSection } from './components/DanceReelsSection';
import { RosterSection } from './components/RosterSection';
import { ScheduleSection } from './components/ScheduleSection';
import { CloseSection } from './components/CloseSection';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#F8FAFD] text-[#10203A] flex flex-col overflow-x-clip selection:bg-[#EAF1FB] selection:text-[#10203A]">
      {/* 1. Fixed Navigation Bar (58px height, 14px blur, hairline, navy pill) */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 w-full overflow-x-clip">
        {/* 2. Portal Hero (Sticky 100vh stage, parting ground panels, signature wordmark kinematics) */}
        <PortalHero />

        {/* 3. Statement Fold (Philosophy, clamp typography, outlined stroke numeral, drifting circular photo) */}
        <StatementFold />

        {/* 4. Academy Milestones (2,004 Founded in Trichy • 7,000+ Students • 1,000+ Shows • 1 Shared Passion) */}
        <MilestonesSection />

        {/* 5. Dance Styles (Two columns with Throwable physical card deck) */}
        <DanceStyles />

        {/* 5. Stage Arena Experience (ScrollExpand component from React Bits) */}
        <StageArenaSection />

        {/* 6. Motion Archive (FlexCarousel component from React Bits) */}
        <GalleryShowcaseSection />

        {/* 7. Dance Reels in Motion (Live video reels from assets) */}
        <DanceReelsSection />

        {/* 8. Academy Roster (Hairline-ruled rows, display names, metadata details) */}
        {/* <RosterSection /> */}

        {/* 9. Weekly Schedule (Table with uppercase headers, responsive narrow 2-col collapsing) */}
        <ScheduleSection />
      </main>

      {/* 7. Close & Footer (Contact channels, verified branch locations, bottom cropped wordmark) */}
      <CloseSection />
    </div>
  );
}
