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
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
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
                  className="py-4 text-[10.5px] font-bold text-[#7B8AA3] uppercase tracking-[0.15em] w-[32%]"
                >
                  {data.headers.className}
                </th>
                <th
                  scope="col"
                  className="py-4 text-[10.5px] font-bold text-[#7B8AA3] uppercase tracking-[0.15em] w-[18%]"
                >
                  {data.headers.days}
                </th>
                <th
                  scope="col"
                  className="py-4 text-[10.5px] font-bold text-[#7B8AA3] uppercase tracking-[0.15em] w-[20%]"
                >
                  {data.headers.time}
                </th>
                <th
                  scope="col"
                  className="py-4 text-[10.5px] font-bold text-[#7B8AA3] uppercase tracking-[0.15em] w-[15%]"
                >
                  {data.headers.level}
                </th>
                <th
                  scope="col"
                  className="py-4 text-[10.5px] font-bold text-[#7B8AA3] uppercase tracking-[0.15em] w-[15%] text-right"
                >
                  {data.headers.branch}
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
                  <td className="py-5 text-right font-sans text-xs text-[#7B8AA3]">
                    {row.branch}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Collapsing to a Two-Column Grid per Row on Narrow Screens (< 768px) */}
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
