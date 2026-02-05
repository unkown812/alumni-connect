import React, { useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import "../styles/auth.css";

export default function VerificationForm({ currentUser, onVerified }) {

  const [form, setForm] = useState({
    full_name: currentUser.full_name || "",
    department: "",
    passingYear: "",

    // ✅ NEW FIELDS (logic only)
    education: "",
    experience: "",
    technologies: "",
    company: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const studentsRef = collection(db, "students");

      const q = query(
        studentsRef,
        where("full_name", "==", form.full_name.trim()),
        where("department", "==", form.department),
        where("passingYear", "==", Number(form.passingYear))
      );

      const snap = await getDocs(q);

      if (snap.empty) {
        setError(
          "Details do not match college records. Please check name, department and passing year."
        );
        setLoading(false);
        return;
      }

      const studentDoc = snap.docs[0];

      const user = auth.currentUser;
      if (!user) {
        setError("Your session has expired. Please log in again.");
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", user.uid);

      // ✅ SAVE EVERYTHING HERE
      await updateDoc(userRef, {
        isVerified: true,
        verifiedAt: serverTimestamp(),
        studentRecordId: studentDoc.id,

        alumniProfile: {
          education: form.education,
          experience: form.experience,
          technologies: form.technologies,
          company: form.company,
          role: form.role,
        },
      });

      onVerified({
        ...currentUser,
        isVerified: true,
      });

    } catch (err) {
      console.error("Verification error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* LEFT SIDE (UNCHANGED UI) */}
        <div className="auth-hero">
          <div>
            <div className="auth-logo">
              <div className="auth-logo-badge">V</div>
              <div className="auth-logo-text">VPM POLYTECHNIC</div>
            </div>

            <h1 className="auth-title">Steps to verify your record</h1>
            <p className="auth-subtitle">
              Fill this form using the same details that appear in your college records.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="auth-form-wrapper">
          <div className="auth-card">

            {error && <div className="auth-error">{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>

              {/* EXISTING FIELDS (same UI) */}
              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Full name"
                required
              />

              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                required
              >
                <option value="">Select department</option>
                <option value="CO">Computer</option>
                <option value="IF">IT</option>
                <option value="IE">Industrial</option>
                <option value="ME">Mechanical</option>
                <option value="CE">Civil</option>
              </select>

              <input
                type="number"
                name="passingYear"
                value={form.passingYear}
                onChange={handleChange}
                placeholder="Passing year"
                required
              />

              {/* ✅ NEW FIELDS (same style, same card) */}
              <input
                name="education"
                placeholder="Education (Diploma/Degree)"
                value={form.education}
                onChange={handleChange}
              />

              <input
                name="experience"
                placeholder="Work experience (e.g. 3 years)"
                value={form.experience}
                onChange={handleChange}
              />

              <input
                name="technologies"
                placeholder="Technologies (Java, React, Python)"
                value={form.technologies}
                onChange={handleChange}
              />

              <input
                name="company"
                placeholder="Current company"
                value={form.company}
                onChange={handleChange}
              />

              <input
                name="role"
                placeholder="Job role"
                value={form.role}
                onChange={handleChange}
              />

              <button disabled={loading}>
                {loading ? "Verifying..." : "Verify and continue"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
