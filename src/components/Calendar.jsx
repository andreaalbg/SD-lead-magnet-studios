import { useState, useMemo } from 'react';
import './Calendar.css';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/* ── Fake scheduled events (for visual fidelity) ── */
const SCHEDULED = [
  { day: 10, time: '09:00', title: 'Team Standup', color: 'var(--accent-cyan)' },
  { day: 13, time: '14:30', title: 'Dr. Elena Vance', color: 'var(--accent-yellow)', active: true },
  { day: 13, time: '16:00', title: 'Design Review', color: 'var(--card-green)' },
  { day: 17, time: '11:00', title: 'Strategy Call', color: 'var(--accent-cyan)' },
  { day: 21, time: '10:00', title: 'Product Sync', color: 'var(--card-green)' },
  { day: 25, time: '15:00', title: 'Client Check-in', color: 'var(--accent-yellow)' },
];

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function Calendar() {
  const now = new Date();
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState(now.getDate());

  const today = now.getDate();
  const isCurrentMonth = viewMonth === now.getMonth() && viewYear === now.getFullYear();

  /* Build grid of days */
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrev = new Date(viewYear, viewMonth, 0).getDate();

    const cells = [];

    // Previous month trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({ day: daysInPrev - i, outside: true });
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const hasEvent = SCHEDULED.some((e) => e.day === d);
      cells.push({ day: d, outside: false, hasEvent });
    }

    // Next month leading days
    const remaining = 7 - (cells.length % 7);
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        cells.push({ day: i, outside: true });
      }
    }

    return cells;
  }, [viewMonth, viewYear]);

  const dayEvents = useMemo(() => {
    return SCHEDULED.filter((e) => e.day === selectedDay);
  }, [selectedDay]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  return (
    <div className="calendar">
      {/* Header */}
      <div className="calendar-header">
        <h2 className="calendar-title">Schedule</h2>
        <div className="calendar-nav">
          <button className="cal-nav-btn" onClick={prevMonth} aria-label="Previous month">
            <ChevronLeft />
          </button>
          <span className="cal-month-label">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button className="cal-nav-btn" onClick={nextMonth} aria-label="Next month">
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Day names */}
      <div className="calendar-grid day-names">
        {DAYS.map((d) => (
          <div key={d} className="day-name">{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="calendar-grid day-cells">
        {calendarDays.map((cell, i) => {
          const isToday = isCurrentMonth && !cell.outside && cell.day === today;
          const isSelected = isCurrentMonth && !cell.outside && cell.day === selectedDay;

          return (
            <button
              key={i}
              className={[
                'day-cell',
                cell.outside ? 'outside' : '',
                isToday ? 'today' : '',
                isSelected ? 'selected' : '',
              ].join(' ')}
              onClick={() => !cell.outside && setSelectedDay(cell.day)}
              disabled={cell.outside}
            >
              <span>{cell.day}</span>
              {cell.hasEvent && !cell.outside && <span className="dot" />}
            </button>
          );
        })}
      </div>

      {/* Upcoming events */}
      <div className="calendar-events">
        <div className="events-label">
          {dayEvents.length > 0
            ? `Events on ${MONTHS[viewMonth]} ${selectedDay}`
            : 'No events scheduled'}
        </div>
        <div className="events-list">
          {dayEvents.map((ev, i) => (
            <div key={i} className={`event-card${ev.active ? ' event-active' : ''}`}>
              <div className="event-color-bar" style={{ backgroundColor: ev.color }} />
              <div className="event-info">
                <span className="event-time">{ev.time}</span>
                <span className="event-title">{ev.title}</span>
              </div>
              {ev.active && <span className="event-live-badge">LIVE</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
