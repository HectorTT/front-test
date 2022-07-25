import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import KarloStore from "./components/KarloStore";
import { Container } from "@mui/material";

export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<KarloStore />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
