import React from "react";
import { Link } from "react-router-dom";
import VPM from "../assets/vpm 1.webp";
import "../pages/AboutUs.css"

export default function About() {
  return (
    <div>

      <div className="branding-bar" style={{ display: "flex", alignItems: "center", padding: "12px 20px" }}>
        <img
          src={VPM}
          alt="VPM Logo"
          style={{ width: 68, height: 68, objectFit: "contain", marginRight: 12 }}
        />
        <div>
          <h1 style={{ margin: 0, fontSize: 20 }}>VPM Polytechnic</h1>
          <p style={{ margin: 0, fontSize: 12 }}>VPM Alumni Association</p>
        </div>
      </div>

      <nav className="nav-bar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/dashboard">Alumni Directory</Link></li>

        </ul>
      </nav>


      <div className="page-container">

        {/* About College */}
        <div className="content-card">
          <h2>About the Institute</h2>

          <p>
            Vidya Prasarak Mandal’s Polytechnic, located in Thane (West),
            is one of the most respected technical institutions in Maharashtra.
            The institute provides high-quality diploma education with strong
            industry exposure and practical learning.
          </p>

          <p>
            Thousands of students graduate every year and become successful
            engineers, entrepreneurs and professionals across India and abroad.
          </p>
        </div>


        {/* Why Alumni Portal */}
        <div className="content-card">
          <h2>Why Alumni Portal?</h2>

          <div className="card-grid">
            <div className="info-card">
              <h4>Verified Records</h4>
              <p>Only genuine alumni join through college verification.</p>
            </div>

            <div className="info-card">
              <h4>Networking</h4>
              <p>Connect with seniors, juniors and faculty easily.</p>
            </div>

            <div className="info-card">
              <h4>Career Growth</h4>
              <p>Share jobs, internships and opportunities.</p>
            </div>

            <div className="info-card">
              <h4>Faculty Access</h4>
              <p>Faculty can manage and verify alumni data.</p>
            </div>
          </div>
        </div>


        {/* Steps */}
        <div className="content-card">
          <h2>Steps to Use Portal</h2>

          <ol className="steps">
            <li>Create your account</li>
            <li>Login with email/password or Google</li>
            <li>Fill your college details</li>
            <li>Wait for verification</li>
            <li>Access alumni directory & events</li>
          </ol>
        </div>


        {/* Contact */}
        <div className="content-card contact-card">
          <h2>Contact Us</h2>

          <p><strong>Vidya Prasarak Mandal's Polytechnic</strong></p>
          <p>Building No. 1, Jnanadweepa, College Campus</p>
          <p>Thane (West) - 400601, Maharashtra</p>
          <p>📞 (91-22) 2536 4494</p>
          <p>📠 (91-22) 2533 9872</p>
          <p>✉ vpmpoly@vpmthane.org</p>
        </div>

      </div>
    </div>
  );
}
