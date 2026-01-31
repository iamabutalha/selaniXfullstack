import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import LandingPage from "./Pages/LandingPage";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { Toaster } from "react-hot-toast";
import { UserContext } from "./context/UserContext";
import AuthProtected from "./protectedRoutes/AuthProtected";
import PublicProtected from "./protectedRoutes/PublicProtected";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signup"
          element={
            <PublicProtected>
              <Signup />
            </PublicProtected>
          }
        />
        <Route
          path="/login"
          element={
            <PublicProtected>
              <Login />
            </PublicProtected>
          }
        />

        <Route
          path="/dashboard"
          element={
            <AuthProtected>
              <Dashboard />
            </AuthProtected>
          }
        />
      </Routes>
    </>
  );
}

export default App;
