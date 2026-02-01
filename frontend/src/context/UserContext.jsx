import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  console.log(token);
  console.log(user);

  useEffect(() => {
    if (token) {
      // Optionally decode token or fetch /me from API
      const savedUser = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      setToken(token);
      setUser(savedUser);
    }
  }, []);

  const values = {
    user,
    setUser,

    token,
    setToken,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
