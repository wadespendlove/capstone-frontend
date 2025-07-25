import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";

export default function Assessment() {
  const [formState, setFormState] = useState({
    goal: "",
    experience: "",
    split: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/assessment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formState),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to assign plan");

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section>
      <h1>Tell us about yourself</h1>
      <form onSubmit={handleSubmit}>
        <label>
          What’s your main fitness goal?
          <select
            name="goal"
            value={formState.goal}
            onChange={handleChange}
            required
          >
            <option value="">Select one</option>
            <option value="muscle">Build muscle</option>
            <option value="fat_loss">Lose fat</option>
            <option value="endurance">Improve endurance</option>
          </select>
        </label>

        <label>
          What’s your experience level?
          <select
            name="experience"
            value={formState.experience}
            onChange={handleChange}
            required
          >
            <option value="">Select one</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>

        <label>
          Do you have a preferred training split?
          <select name="split" value={formState.split} onChange={handleChange}>
            <option value="">No preference</option>
            <option value="push_pull_legs">Push / Pull / Legs</option>
            <option value="upper_lower">Upper / Lower</option>
            <option value="full_body">Full body</option>
          </select>
        </label>

        <button type="submit">Submit Assessment</button>
        {error && <output>{error}</output>}
      </form>
    </section>
  );
}
