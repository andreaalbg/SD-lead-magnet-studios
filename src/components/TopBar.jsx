import './TopBar.css';

export default function TopBar() {
  return (
    <div className="top-bar">
      <span>Encrypted Call</span>
      <div className="signal-indicator">
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>
    </div>
  );
}
