import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "../api/useMutation";
import { useAuth } from "./AuthContext";

export default function Register() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const { mutate } = useMutation("/users/register");

  const onRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    setError(null);
    try {
      const response = await mutate({ username, password });

      if (!response?.token) {
        throw new Error("Registration failed: No token returned");
      }

      localStorage.setItem("token", response.token);
      setToken(response.token);
      navigate("/assessment");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <>
      <h1>Register for an account</h1>
      <form action={onRegister}>
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
