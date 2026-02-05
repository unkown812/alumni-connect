// src/components/AlumniDetailsForm.jsx
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import "../styles/auth.css";

export default function AlumniDetailsForm({ currentUser, onCompleted }) {
  const existing = currentUser.alumniProfile || {};

  const [form, setForm] = useState({
    gender: existing.gender || "",
    currentCity: existing.currentCity || "",
    company: existing.company || "",
    jobTitle: existing.jobTitle || "",
    phone: existing.phone || "",
    address: existing.address || "",
    
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        setError("Your session has expired. Please log in again.");
        setSaving(false);
        return;
      }

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        alumniProfile: {
          ...form,
        },
      });

      const updatedUser = {
        ...currentUser,
        alumniProfile: { ...form },
      };

      if (onCompleted) onCompleted(updatedUser);
    } catch (err) {
      console.error("Save alumni details error:", err);
      setError("Failed to save details. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        
        <div className="auth-hero">
          <div>
            <div className="auth-logo">
              <div className="auth-logo-badge">V</div>
              <div className="auth-logo-text">VPM</div>
            </div>
            <h1 className="auth-title">Complete your alumni profile.</h1>
            <p className="auth-subtitle">
              Fill these details so juniors and faculty know where you are and
              how to reach you.
            </p>

            <ol
              style={{
                marginTop: 12,
                paddingLeft: 20,
                fontSize: 14,
                color: "#e5e7eb",
                lineHeight: 1.6,
              }}
            >
              <li>Select your <strong>gender</strong>.</li>
              <li>Enter your <strong>current city</strong> (City, Country).</li>
              <li>
                Fill your <strong>company / organisation</strong> and{" "}
                <strong>job title / role</strong>.
              </li>
              <li>
                Add a <strong>phone number</strong> and your{" "}
                <strong>residential address</strong>.
              </li>
              <li>
                (Optional) Paste a <strong>profile photo URL</strong> and your{" "}
                <strong>LinkedIn profile link</strong>.
              </li>
              <li>
                Finally, click <strong>Save details</strong> to go to your
                alumni dashboard.
              </li>
            </ol>

            <p
              style={{
                marginTop: 16,
                fontSize: 12,
                color: "#cbd5f5",
              }}
            >
              You can update these details anytime later from your alumni
              dashboard.
            </p>
          </div>

          <p className="auth-footer-text">
            Accurate details help the institute and juniors connect with you
            better.
          </p>
        </div>

       
        <div className="auth-form-wrapper">
          <div className="auth-card">
            <div className="auth-card-header">
              <h2 className="auth-heading">
                Welcome, {currentUser.full_name || "Alumni"}
              </h2>
              <p className="auth-caption">
                Tell us about your current work and location.
              </p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              {/* Gender */}
              <div className="auth-field">
                <label className="auth-label">Gender</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">⚧</span>
                  <select
                    name="gender"
                    className="auth-input"
                    value={form.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Current city */}
              <div className="auth-field">
                <label className="auth-label">Current city</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">📍</span>
                  <input
                    name="currentCity"
                    className="auth-input"
                    placeholder="City, Country"
                    value={form.currentCity}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Company */}
              <div className="auth-field">
                <label className="auth-label">Company / Organization</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">🏢</span>
                  <input
                    name="company"
                    className="auth-input"
                    placeholder="Where are you working?"
                    value={form.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Job title */}
              <div className="auth-field">
                <label className="auth-label">Job title / Role</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">💼</span>
                  <input
                    name="jobTitle"
                    className="auth-input"
                    placeholder="Software Engineer, Manager, etc."
                    value={form.jobTitle}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="auth-field">
                <label className="auth-label">Phone number</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">📞</span>
                  <input
                    name="phone"
                    className="auth-input"
                    placeholder="Optional contact number"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="auth-field">
                <label className="auth-label">Residential address</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">🏠</span>
                  <textarea
                    name="address"
                    className="auth-input"
                    style={{ minHeight: 70, resize: "vertical" }}
                    placeholder="Street, Area, City, PIN"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div className="auth-field">
                <label className="auth-label">Profile photo URL</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">🖼️</span>
                  <input
                    name="photoUrl"
                    className="auth-input"
                    placeholder="https://..."
                    value={form.photoUrl}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* LinkedIn URL */}
              <div className="auth-field">
                <label className="auth-label">LinkedIn profile URL</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">🔗</span>
                  <input
                    name="linkedinUrl"
                    className="auth-input"
                    placeholder="https://linkedin.com/in/username"
                    value={form.linkedinUrl}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save details"}
              </button>
            </form>

            <p className="auth-bottom-hint">
              After saving, you will be redirected to your alumni dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
