'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthResponse, User } from '@/types/auth/AuthResponse';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (authData: AuthResponse) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('authToken');
      const savedUser = localStorage.getItem('authUser');
      
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (authData: AuthResponse) => {
    setToken(authData.token);
    setUser(authData.user);
    
    localStorage.setItem('authToken', authData.token);
    localStorage.setItem('authUser', JSON.stringify(authData.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('authUser', JSON.stringify(userData));
  };

  const value = {
    isAuthenticated: !!token && !!user,
    user,
    token,
    login,
    logout,
    updateUser,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth должен быть использован внутри AuthProvider');
  }
  return context;
} 