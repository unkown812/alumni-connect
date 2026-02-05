import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AddFaculty from "./AddFaculty";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function FacultyDashboard() {
  const [alumni, setAlumni] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ================= AUTH + LOAD ================= */
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      const uSnap = await getDoc(doc(db, "users", user.uid));
      if (!uSnap.exists() || uSnap.data().role !== "faculty") {
        navigate("/dashboard");
        return;
      }

      setCurrentUser({ id: uSnap.id, ...uSnap.data() });

      const q = query(collection(db, "users"), where("role", "==", "alumni"));
      const snap = await getDocs(q);
      setAlumni(snap.docs.map((d) => ({ id: d.id, ...d.data() })));

      setLoading(false);
    });

    return () => unsub();
  }, [navigate]);

  /* ================= LOGOUT ================= */
  async function handleLogout() {
    await signOut(auth);
    navigate("/login");
  }

  /* ================= COUNTS ================= */
  const verifiedCount = alumni.filter((a) => a.isVerified).length;
  const pendingCount = alumni.length - verifiedCount;

function downloadPDF() {
  const docPDF = new jsPDF();

  docPDF.text("VPM Polytechnic - Alumni List", 14, 15);

  const rows = alumni.map((a) => [
    a.full_name || "-",
    a.email,
    a.batch || "-",
    a.isVerified ? "Verified" : "Pending",
  ]);

  autoTable(docPDF, {
    startY: 25,
    head: [["Name", "Email", "Batch", "Status"]],
    body: rows,
  });

  docPDF.save("alumni_list.pdf");
}


  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <div style={{ background: "#f5f7fb", minHeight: "100vh" }}>
      {/* HEADER */}
      <div
        style={{
          background: "#063970",
          color: "#fff",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "0 0 12px 12px",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Vidya Prasarak Mandal Polytechnic</h2>
          <p style={{ margin: 0, fontSize: 14 }}>Faculty Dashboard</p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            color: "#fff",
            border: "none",
            padding: "8px 14px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 1200, margin: "24px auto", padding: "0 16px" }}>

        {/* ================= STATS ================= */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {/* Registered */}
          <div className="card">
            <h1 style={{ color: "#2563eb" }}>{alumni.length}</h1>
            <p>Registered Alumni</p>
          </div>

          {/* Verified */}
          <div className="card">
            <h1 style={{ color: "green" }}>{verifiedCount}</h1>
            <p>Verified Alumni</p>
          </div>

          {/* Pending */}
          <div className="card">
            <h1 style={{ color: "red" }}>{pendingCount}</h1>
            <p>Pending Alumni</p>
          </div>

          {/* PDF Download */}
          <div className="card">
            <button
              onClick={downloadPDF}
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                padding: "10px 14px",
                borderRadius: 8,
                cursor: "pointer",
                width: "100%",
              }}
            >
              Download PDF
            </button>
            <p style={{ marginTop: 8 }}>Export Alumni List</p>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="faculty-page">
          <div className="faculty-card">
            <h3>Alumni Verification</h3>

            <table className="faculty-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Batch</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {alumni.map((a) => (
                  <tr key={a.id}>
                    <td>{a.full_name || "-"}</td>
                    <td>{a.email}</td>
                    <td>{a.batch || "-"}</td>
                    <td>
                      {a.isVerified ? (
                        <span className="status-verified">Verified</span>
                      ) : (
                        <span className="status-pending">Pending</span>
                      )}
                    </td>
                    <td>
                      {!a.isVerified && (
                        <button className="verify-btn">Verify</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add faculty */}
          {currentUser?.isMaster && <AddFaculty currentUser={currentUser} />}
        </div>
      </div>
    </div>
  );
}