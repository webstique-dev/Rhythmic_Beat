import { useState } from 'react';
import { scheduleSectionData } from '../data/schedule';

export const ScheduleSection = ({
  data = scheduleSectionData,
}) => {
  const [filter, setFilter] = useState('all');

  const filteredRows =
    filter === 'all'
      ? data.rows
      : data.rows.filter(
          (row) =>
            row.level.toLowerCase().includes(filter.toLowerCase()) ||
            row.days.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <section
      id="schedule"
      className="relative w-full py-24 sm:py-32 border-b border-[rgba(16,32,58,0.14)]"
      style={{ backgroundColor: '#F8FAFD' }}
      aria-label="Weekly Studio Schedule"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[rgba(16,32,58,0.14)]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F28C1E]" />
              <span className="text-[11px] font-semibold text-[#10203A] uppercase tracking-[0.15em]">
                {data.label}
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#10203A] tracking-[-0.025em]">
              {data.headline}
            </h2>
          </div>

          {/* Quick Filter Buttons (Outlined pills / rules, no filled area) */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] rounded-full transition-colors border ${
                filter === 'all'
                  ? 'border-[#10203A] text-[#10203A]'
                  : 'border-[rgba(16,32,58,0.14)] text-[#7B8AA3] hover:border-[rgba(16,32,58,0.3)]'
              }`}
            >
              All Batches
            </button>
            <button
              type="button"
              onClick={() => setFilter('beginner')}
              className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] rounded-full transition-colors border ${
                filter === 'beginner'
                  ? 'border-[#10203A] text-[#10203A]'
                  : 'border-[rgba(16,32,58,0.14)] text-[#7B8AA3] hover:border-[rgba(16,32,58,0.3)]'
              }`}
            >
              Beginner & Kids
            </button>
            <button
              type="button"
              onClick={() => setFilter('intermediate')}
              className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] rounded-full transition-colors border ${
                filter === 'intermediate'
                  ? 'border-[#10203A] text-[#10203A]'
                  : 'border-[rgba(16,32,58,0.14)] text-[#7B8AA3] hover:border-[rgba(16,32,58,0.3)]'
              }`}
            >
              Intermediate
            </button>
          </div>
        </div>

        {/* Desktop / Tablet Table View (hidden on narrow screens < 768px) */}
        <div className="hidden md:block overflow-x-auto mt-6">
          <table className="w-full text-left border-collapse" role="table">
            <thead>
              <tr className="border-b border-[rgba(16,32,58,0.14)]">
                <th
                  scope="col"
                  className="py-4 text-[10.5px] font-bold text-[#7B8AA3] uppercase tracking-[0.15em] w-[28%]"
                >
                  {data.headers.className}
                </th>
                <th
                  scope="col"
                  className="py-4 text-[10.5px] font-bold text-[#7B8AA3] uppercase tracking-[0.15em] w-[15%]"
                >
                  {data.headers.days}
                </th>
                <th
                  scope="col"
                  className="py-4 text-[10.5px] font-bold text-[#7B8AA3] uppercase tracking-[0.15em] w-[17%]"
                >
                  {data.headers.time}
                </th>
                <th
                  scope="col"
                  className="py-4 text-[10.5px] font-bold text-[#7B8AA3] uppercase tracking-[0.15em] w-[14%]"
                >
                  {data.headers.level}
                </th>
                <th
                  scope="col"
                  className="py-4 text-[10.5px] font-bold text-[#7B8AA3] uppercase tracking-[0.15em] w-[14%]"
                >
                  {data.headers.branch}
                </th>
                <th
                  scope="col"
                  className="py-4 text-[10.5px] font-bold text-[#7B8AA3] uppercase tracking-[0.15em] w-[12%] text-right"
                >
                  {data.headers.enquiry || "ENQUIRY"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(16,32,58,0.1)]">
              {filteredRows.map((row) => (
                <tr
                  key={row.id}
                  className="group hover:bg-[#EAF1FB]/40 transition-colors duration-150"
                >
                  {/* First Column: Display-Face Class Name + Discipline */}
                  <td className="py-5 pr-4">
                    <span className="font-display font-semibold text-lg text-[#10203A] block group-hover:text-[#1E5BB8] transition-colors">
                      {row.className}
                    </span>
                    <span className="font-sans text-xs text-[#7B8AA3] mt-0.5 block">
                      {row.discipline}
                    </span>
                  </td>

                  {/* Days */}
                  <td className="py-5 pr-4 font-sans text-xs font-medium text-[#10203A]">
                    {row.days}
                  </td>

                  {/* Hours */}
                  <td className="py-5 pr-4 font-sans text-xs text-[#4A5B78] font-mono">
                    {row.time}
                  </td>

                  {/* Level */}
                  <td className="py-5 pr-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#10203A]">
                      <span className="w-1 h-1 rounded-full bg-[#F28C1E]" />
                      {row.level}
                    </span>
                  </td>

                  {/* Studio Branch */}
                  <td className="py-5 pr-4 font-sans text-xs text-[#7B8AA3]">
                    {row.branch}
                  </td>

                  {/* Enquiry Column */}
                  <td className="py-5 text-right pl-2">
                    <a
                      href={`https://wa.me/919655551055?text=${encodeURIComponent(
                        `Hi RBDC Team, I would like to enquire about the ${row.className} (${row.discipline}) batch.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[rgba(16,32,58,0.22)] text-[11px] font-semibold text-[#10203A] tracking-[0.04em] bg-white/90 hover:bg-[#10203A] hover:text-white hover:border-[#10203A] transition-all duration-200 shadow-sm whitespace-nowrap"
                      aria-label={`Enquire about ${row.className}`}
                    >
                      <span>Enquire</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F28C1E] group-hover/btn:scale-125 transition-transform" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Collapsing to a Card Layout per Row on Narrow Screens (< 768px) */}
        <div className="block md:hidden mt-6 divide-y divide-[rgba(16,32,58,0.14)]">
          {filteredRows.map((row) => (
            <div key={row.id} className="py-5 grid grid-cols-2 gap-y-3 gap-x-4">
              {/* Row Header across both columns */}
              <div className="col-span-2">
                <span className="font-display font-semibold text-base text-[#10203A] block">
                  {row.className}
                </span>
                <span className="font-sans text-[11px] text-[#7B8AA3] block">
                  {row.discipline}
                </span>
              </div>

              {/* Col 1: Days */}
              <div>
                <span className="text-[9.5px] uppercase tracking-[0.14em] text-[#7B8AA3] block font-bold">
                  Days
                </span>
                <span className="text-xs font-medium text-[#10203A] mt-0.5 block">
                  {row.days}
                </span>
              </div>

              {/* Col 2: Time */}
              <div>
                <span className="text-[9.5px] uppercase tracking-[0.14em] text-[#7B8AA3] block font-bold">
                  Time
                </span>
                <span className="text-xs font-mono text-[#4A5B78] mt-0.5 block">
                  {row.time}
                </span>
              </div>

              {/* Col 1: Level */}
              <div>
                <span className="text-[9.5px] uppercase tracking-[0.14em] text-[#7B8AA3] block font-bold">
                  Level
                </span>
                <span className="text-xs text-[#10203A] mt-0.5 block flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#F28C1E]" />
                  {row.level}
                </span>
              </div>

              {/* Col 2: Studio */}
              <div>
                <span className="text-[9.5px] uppercase tracking-[0.14em] text-[#7B8AA3] block font-bold">
                  Studio
                </span>
                <span className="text-xs text-[#7B8AA3] mt-0.5 block">
                  {row.branch}
                </span>
              </div>

              {/* Col 1 & 2: Responsive Enquiry Button */}
              <div className="col-span-2 pt-1.5">
                <a
                  href={`https://wa.me/919655551055?text=${encodeURIComponent(
                    `Hi RBDC Team, I would like to enquire about the ${row.className} (${row.discipline}) batch.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-[rgba(16,32,58,0.22)] bg-white text-xs font-semibold text-[#10203A] tracking-[0.04em] hover:bg-[#10203A] hover:text-white transition-all shadow-sm active:scale-[0.99]"
                  aria-label={`Enquire about ${row.className}`}
                >
                  <span>Enquire for Batch</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F28C1E]" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Notice */}
        <div className="mt-8 pt-6 border-t border-[rgba(16,32,58,0.1)] flex items-center justify-between text-xs text-[#7B8AA3]">
          <span className="uppercase tracking-[0.12em]">
            Timings subject to seasonal masterclass schedules
          </span>
          <span className="font-mono text-[#10203A]">IST (UTC+05:30)</span>
        </div>
      </div>
    </section>
  );
};
