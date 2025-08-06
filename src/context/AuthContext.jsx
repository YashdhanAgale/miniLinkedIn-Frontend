import { createContext, useState, useEffect } from "react";
import axios from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/profile/me", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false)); 
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );
    setUser(res.data);
    navigate("/");
  };

  const register = async (name, email, password, bio) => {
    const res = await axios.post(
      "/auth/signup",
      { name, email, password, bio },
      { withCredentials: true }
    );
    setUser(res.data);
    navigate("/login");
  };

  const logout = async () => {
    await axios.post("/auth/logout", {}, { withCredentials: true });
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
