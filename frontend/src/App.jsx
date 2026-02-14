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
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const checkUser = async (token) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/check`,
        {
          headers: { "x-auth-token": token },
        },
      );

      if (res.data.user) {
        setUser(res.data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error checking user authentication:", error);
      // localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkUser(token);
    }
  }, []);

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
