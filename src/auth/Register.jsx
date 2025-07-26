import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

export default function Register() {
  const { register } = useAuth(); // ✅ This is all you need
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    setError(null);

    try {
      await register({ username, password }); // ✅ handles token internally
      navigate("/assessment");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <>
      <h1>Register for an account</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onRegister(new FormData(e.target));
        }}
      >
        <label>
          Username
          <input type="text" name="username" required />
        </label>
        <br />
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <br />
        <button type="submit">Register</button>
        {error && <output style={{ color: "red" }}>{error}</output>}
      </form>
      <br />
      <Link to="/login">Already have an account? Log in here.</Link>
    </>
  );
}
