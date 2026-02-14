import './AgentCard.css';

export default function AgentCard({ label, name, time }) {
  return (
    <div className="agent-card">
      {/* Decorative elements */}
      <div className="shape-glow" />
      <div className="shape-circle" />

      {/* Status sticker */}
      <div className="status-sticker">
        On<br />Air
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
