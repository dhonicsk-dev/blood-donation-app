import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Donors from "./Donors";
import Register from "./Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Donors />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f6fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    background: "#fff",
    padding: 30,
    borderRadius: 10,
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
  }
};