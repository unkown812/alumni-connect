export default function Topbar() {
  return (
    <header className="topbar">
      <h3>Alumni Dashboard</h3>
      <div className="profile">
        <img src="/profile.jpg" alt="Admin" className="avatar" />
        <div>
          <strong>John Doe</strong>
          <p>Admin</p>
        </div>
      </div>
    </header>
  );
}