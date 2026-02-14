import { useState, useEffect, useCallback, useRef } from 'react';
import TextureOverlay from '../components/TextureOverlay';
import TopBar from '../components/TopBar';
import AgentCard from '../components/AgentCard';
import ControlButton from '../components/ControlButton';
import EndCallButton from '../components/EndCallButton';
import Calendar from '../components/Calendar';
import './CallInterface.css';

/* ── SVG Icons ── */

const MicIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const KeypadIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const SpeakerIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

/* ── Helper ── */

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = (totalSeconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

/* ── Page Component ── */

export default function CallInterface() {
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [callActive, setCallActive] = useState(true);
  const timerRef = useRef(null);

  /* Timer */
  useEffect(() => {
    if (callActive) {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [callActive]);

  const handleEndCall = useCallback(() => {
    setCallActive(false);
  }, []);

  return (
    <>
      <TextureOverlay />

      {/* ElevenLabs Conversational AI Widget */}
      <elevenlabs-convai agent-id="agent_4201kh8v5788eqt9m80z4ck63wfv" />

      <div className="desktop-layout">
        {/* Phone frame */}
        <div className="phone-frame">
          <div className="call-container">
            <TopBar />

            <AgentCard
              label="Speaking with"
              name={
                <>
                  Dr. Elena
                  <br />
                  Vance
                </>
              }
              time={formatTime(seconds)}
            />

            <div className="controls-area">
              <div className="secondary-controls">
                <ControlButton
                  icon={<MicIcon />}
                  label="Mute"
                  active={muted}
                  onClick={() => setMuted((m) => !m)}
                />
                <ControlButton icon={<KeypadIcon />} label="Keypad" />
                <ControlButton
                  icon={<SpeakerIcon />}
                  label="Speaker"
                  active={speakerOn}
                  onClick={() => setSpeakerOn((s) => !s)}
                />
              </div>

              <EndCallButton onClick={handleEndCall} />
            </div>
          </div>
        </div>

        {/* Calendar sidebar – only visible on desktop */}
        <div className="calendar-sidebar">
          <Calendar />
        </div>
      </div>
    </>
  );
}
