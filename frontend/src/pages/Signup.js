import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../api/api";
import toast from "react-hot-toast";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("All fields are required");
      return false;
    }

    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    setError("");

    if (!validateForm()) {
      toast.error("Please check the form");
      return;
    }

    setLoading(true);
    try {
      const data = await signupUser(name, email, password);

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Account created successfully! 🎉");
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMessage = error.message || "Signup failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>✨ Create Account</h2>

        {error && <div className="auth-error">{error}</div>}

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          type="text"
          disabled={loading}
          required
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          type="email"
          disabled={loading}
          required
        />

        <input
          placeholder="Password (minimum 6 characters)"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          type="password"
          disabled={loading}
          required
        />

        <input
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError("");
          }}
          onKeyPress={handleKeyPress}
          type="password"
          disabled={loading}
          required
        />

        <button 
          onClick={handleSignup} 
          disabled={loading || !name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="auth-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

        <p className="auth-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
