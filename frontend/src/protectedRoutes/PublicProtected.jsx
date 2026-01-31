import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";

const PublicProtected = ({ children }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      navigate("/dashboard", { replace: true });
    }
  }, [user]);

  return <div>{children}</div>;
};

export default PublicProtected;
