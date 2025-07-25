import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const loginMutation = useMutation(async ({ username, password }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Login failed");
    return result;
  });

  const onLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const { token } = await loginMutation.mutateAsync({ username, password });
      login(token);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Login to your account</h1>
      <form action={onLogin}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button disabled={loginMutation.isPending}>Login</button>
        {error && <output>{error}</output>}
      </form>
      <Link to="/register">Don’t have an account? Register here.</Link>
    </>
  );
}
