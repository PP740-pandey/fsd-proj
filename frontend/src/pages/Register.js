import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      setMsg("Registered successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setMsg("Registration failed. Email may already exist.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>
        {msg && <p style={styles.msg}>{msg}</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="name" placeholder="Full Name"
            value={form.name} onChange={handleChange}
            style={styles.input} required
          />
          <input
            name="email" type="email" placeholder="Email"
            value={form.email} onChange={handleChange}
            style={styles.input} required
          />
          <input
            name="password" type="password" placeholder="Password"
            value={form.password} onChange={handleChange}
            style={styles.input} required
          />
          <button type="submit" style={styles.btn}>Register</button>
        </form>
        <p style={styles.footer}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", marginTop: "80px" },
  card: {
    background: "#fff", padding: "40px", borderRadius: "8px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)", width: "360px"
  },
  title: { marginBottom: "20px", textAlign: "center" },
  input: {
    display: "block", width: "100%", padding: "10px", marginBottom: "14px",
    border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px",
    boxSizing: "border-box"
  },
  btn: {
    width: "100%", padding: "10px", backgroundColor: "#1a1a2e",
    color: "#fff", border: "none", borderRadius: "4px",
    fontSize: "15px", cursor: "pointer"
  },
  msg: { color: "green", marginBottom: "10px", textAlign: "center" },
  footer: { textAlign: "center", marginTop: "16px", fontSize: "14px" }
};

export default Register;
