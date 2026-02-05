// src/api/auth.js
const API_URL = "http://localhost:4000"; // change if needed

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    // try to read JSON error
    try {
      const json = await res.json();
      return json;
    } catch {
      throw new Error("Login failed");
    }
  }
  return res.json(); // expected { token: "..." }
}
