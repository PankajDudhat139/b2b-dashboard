import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, BuyerProfile, SellerProfile } from '../types';
import { authService } from '../services/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, type: 'buyer' | 'seller') => Promise<void>;
  updateProfile: (profile: BuyerProfile | SellerProfile) => void;
  completeOnboarding: (profile: BuyerProfile | SellerProfile) => void;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state from localStorage
    const initializeAuth = async () => {
      try {
        const storedUser = authService.getUser();
        if (storedUser && authService.isAuthenticated()) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock login - in real app, call your API
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        type: 'seller', // This would come from the API
        profile: {} as any,
        createdAt: new Date(),
        isOnboardingComplete: false
      };
      
      const mockToken = 'mock-jwt-token';
      
      authService.setAuth(mockToken, mockUser);
      setUser(mockUser);
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    authService.clearAuth();
    setUser(null);
    // Redirect to home page
    window.location.href = '/';
  };

  const signup = async (email: string, password: string, type: 'buyer' | 'seller'): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock signup - in real app, call your API
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        type,
        profile: {} as any,
        createdAt: new Date(),
        isOnboardingComplete: false
      };
      
      const mockToken = 'mock-jwt-token';
      
      authService.setAuth(mockToken, mockUser);
      setUser(mockUser);
    } catch (error) {
      throw new Error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = (profile: BuyerProfile | SellerProfile): void => {
    if (user) {
      const updatedUser = {
        ...user,
        profile
      };
      
      authService.updateUser(updatedUser);
      setUser(updatedUser);
    }
  };

  const completeOnboarding = (profile: BuyerProfile | SellerProfile): void => {
    if (user) {
      const updatedUser = {
        ...user,
        profile,
        isOnboardingComplete: true
      };
      
      authService.updateUser(updatedUser);
      setUser(updatedUser);
    }
  };

  const contextValue: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    signup,
    updateProfile,
    completeOnboarding
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
