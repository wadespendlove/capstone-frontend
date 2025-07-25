import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Assessment from "./pages/Assessment";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} /> {/* ✅ This sets "/" route */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/assessment" element={<Assessment />} />
      </Route>
    </Routes>
  );
}
