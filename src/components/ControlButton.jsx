import './ControlButton.css';

export default function ControlButton({ icon, label, active = false, onClick }) {
  return (
    <div className="control-group">
      <button
        className={`control-btn${active ? ' active' : ''}`}
        aria-label={label}
        onClick={onClick}
      >
        {icon}
      </button>
      <span className="control-label">{label}</span>
    </div>
  );
}
