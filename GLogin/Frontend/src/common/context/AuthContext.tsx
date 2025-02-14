import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loginWithGoogle: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const loginWithGoogle = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const logout = () => {
    axios
      .get("http://localhost:5000/logout", { withCredentials: true })
      .then(() => {
        setUser(null);
      });
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
