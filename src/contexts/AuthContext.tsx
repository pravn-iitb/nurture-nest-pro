import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  onboardingCompleted: boolean;
  child?: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string, otp: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('nurture_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (phone: string, otp: string) => {
    // Simulate OTP verification
    if (otp === '1234') {
      const userData: User = {
        id: `user_${Date.now()}`,
        name: '',
        phone,
        onboardingCompleted: false
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('nurture_user', JSON.stringify(userData));
    } else {
      throw new Error('Invalid OTP');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('nurture_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('nurture_user', JSON.stringify(updatedUser));
    }
  };

  const completeOnboarding = () => {
    updateUser({ onboardingCompleted: true });
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    updateUser,
    completeOnboarding
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};