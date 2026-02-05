export default function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <span className="icon">{icon}</span>
      <div>
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </div>
  );
}