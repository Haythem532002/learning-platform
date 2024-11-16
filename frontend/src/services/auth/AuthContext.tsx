import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../../types/user";

interface AuthContextType {
  authToken: string | null;
  setToken: (token: string) => void;
  user: User | null;
  setUserData: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("jwtToken")
  );
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setToken = (token: string) => {
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
  };
  const setUserData = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ authToken, setToken, user, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
