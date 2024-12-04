import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  userPhone: string | null;
  boundWalletAddress: string | null;
  login: (credentials: {email?: string, phone?: string}) => Promise<void>;
  bindWallet: (address: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [boundWalletAddress, setBoundWalletAddress] = useState<string | null>(null);

  const login = async (credentials: {email?: string, phone?: string}) => {
    // Implement login logic
    setIsAuthenticated(true);
    setUserEmail(credentials.email || null);
    setUserPhone(credentials.phone || null);
  };

  const bindWallet = async (address: string) => {
    setBoundWalletAddress(address);
  };

  const value = {
    isAuthenticated,
    userEmail,
    userPhone,
    boundWalletAddress,
    login,
    bindWallet
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
