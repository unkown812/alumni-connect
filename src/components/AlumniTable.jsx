export default function AlumniTable() {
  const alumni = [
    { name: "Rahul Sharma", batch: "2018", email: "rahul@example.com", date: "01 Sep 2023" },
    { name: "Priya Mehta", batch: "2019", email: "priya@example.com", date: "28 Aug 2023" },
    { name: "Vivek Desai", batch: "2020", email: "vivek@example.com", date: "17 Aug 2023" },
  ];

  return (
    <div className="table-card">
      <h4>Latest Alumni Registrations</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>Email</th>
            <th>Registration Date</th>
          </tr>
        </thead>
        <tbody>
          {alumni.map((a, i) => (
            <tr key={i}>
              <td>{a.name}</td>
              <td>{a.batch}</td>
              <td>{a.email}</td>
              <td>{a.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}