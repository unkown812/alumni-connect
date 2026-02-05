import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function GoogleAuthButton() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;

      // Save user if first time
      await setDoc(
        doc(db, "users", user.uid),
        {
          full_name: user.displayName,
          email: user.email,
          role: "alumni",
          isVerified: false,
          createdAt: serverTimestamp(),
          provider: "google",
        },
        { merge: true }
      );

      navigate("/dashboard");
    } catch (err) {
      console.error("Google login error:", err);
      alert("Google login failed");
    }
  };

  return (
    <button
      type="button"
      className="google-btn"
      onClick={handleGoogleLogin}
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google logo"
      />
      <span>Continue with Google</span>
    </button>
  );
}
