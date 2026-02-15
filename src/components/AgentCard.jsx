import './AgentCard.css';

export default function AgentCard({ label, name, time, isSpeaking, status }) {
  const connected = status === 'connected';

  return (
    <div className={`agent-card${isSpeaking ? ' speaking' : ''}`}>
      {/* Decorative elements */}
      <div className="shape-glow" />
      <div className="shape-circle" />

      {/* Status sticker */}
      <div className={`status-sticker${connected ? '' : ' disconnected'}`}>
        {connected ? <>On<br />Air</> : <>Off<br />Air</>}
      </div>

      {/* Call metadata */}
      <div className="call-meta">
        <div className="label-text">{label}</div>
        <h1 className="agent-name">{name}</h1>
        <div className="call-time">{time}</div>
      </div>
    </div>
  );
}
