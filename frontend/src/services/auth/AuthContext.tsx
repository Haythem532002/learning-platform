import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  authToken: string | null;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("jwtToken")
  );

  const setToken = (token: string) => {
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
  };

  return (
    <AuthContext.Provider value={{ authToken, setToken }}>
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
