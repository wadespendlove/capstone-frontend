import { Link } from "react-router";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Fit4U</h1>
      <p>Ready to start your fitness journey?</p>
      <Link to="/assessment">
        <button>Take Your Fitness Assessment</button>
      </Link>
    </div>
  );
}
