import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext"; // ✅ no more useMutation

export default function Login() {
  const { login } = useAuth(); // ✅ this is the correct login from AuthContext
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    setError(null);

    try {
      await login({ username, password }); // ✅ login handles fetch + token
      navigate("/");
    } catch (e) {
      setError(e.message || "Login failed");
    }
  };

  return (
    <>
      <h1>Login to your account</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin(new FormData(e.target));
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
        <button>Login</button>
        {error && <output style={{ color: "red" }}>{error}</output>}
      </form>
      <br />
      <Link to="/register">Don’t have an account? Register here.</Link>
    </>
  );
}
