function PlatformCard({
  title,
  subtitle,
  active,
  onClick,
}) {
  return (
    <div
      className={`platform-card ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="badge">
        {active ? "★ Standard platform" : "+ Additional platform"}
      </div>

      <h2>{title}</h2>

      <p>{subtitle}</p>

      <ul>
        <li>Access included with all platforms</li>
        <li>Free access to TradingView included</li>
      </ul>

      <button className="choose-btn">
        {active ? "✓" : "Choose"}
      </button>
    </div>
  );
}

export default PlatformCard;