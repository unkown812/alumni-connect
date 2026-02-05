import StatCard from "../components/StatCard";
import AlumniTable from "../components/AlumniTable";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="stats">
        <StatCard title="Total Alumni" value="1,203" icon="🎓" />
        <StatCard title="New Registrations" value="74" icon="🧑‍💻" />
        <StatCard title="Upcoming Events" value="5" icon="📅" />
        <StatCard title="Engagement Rate" value="56%" icon="📈" />
      </div>
      <AlumniTable />
    </div>
  );
}