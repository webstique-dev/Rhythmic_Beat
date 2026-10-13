import { Navbar } from './components/Navbar';
import { PortalHero } from './components/PortalHero';
import { StatementFold } from './components/StatementFold';
import { DanceStyles } from './components/DanceStyles';
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

        {/* 4. Dance Styles (Two columns with Throwable physical card deck) */}
        <DanceStyles />

        {/* 5. Academy Roster (Hairline-ruled rows, display names, metadata details) */}
        <RosterSection />

        {/* 6. Weekly Schedule (Table with uppercase headers, responsive narrow 2-col collapsing) */}
        <ScheduleSection />
      </main>

      {/* 7. Close & Footer (Contact channels, verified branch locations, bottom cropped wordmark) */}
      <CloseSection />
    </div>
  );
}
