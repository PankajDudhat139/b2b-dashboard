import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, BuyerProfile, SellerProfile } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, type: 'buyer' | 'seller') => Promise<void>;
  updateProfile: (profile: BuyerProfile | SellerProfile) => void;
  completeOnboarding: (profile: BuyerProfile | SellerProfile) => void;
  createTemporaryUser: (type: 'buyer' | 'seller') => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Save user to localStorage
  const saveUserToStorage = (userData: User) => {
    try {
      localStorage.setItem('bizMatch_user', JSON.stringify(userData));
      localStorage.setItem('bizMatch_authToken', 'temp-token-' + userData.id);
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  };

  // Load user from localStorage
  const loadUserFromStorage = (): User | null => {
    try {
      const userData = localStorage.getItem('bizMatch_user');
      const token = localStorage.getItem('bizMatch_authToken');
      
      if (userData && token) {
        return JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
    }
    return null;
  };

  // Clear user from localStorage
  const clearUserFromStorage = () => {
    localStorage.removeItem('bizMatch_user');
    localStorage.removeItem('bizMatch_authToken');
  };

  useEffect(() => {
    // Initialize auth state from localStorage
    const initializeAuth = () => {
      try {
        const storedUser = loadUserFromStorage();
        if (storedUser) {
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

  const createTemporaryUser = (type: 'buyer' | 'seller') => {
    const tempUser: User = {
      id: 'temp-' + Date.now().toString(),
      email: `temp-${type}@example.com`, // This would be set during actual signup
      type,
      profile: {} as any,
      createdAt: new Date(),
      isOnboardingComplete: false
    };
    
    setUser(tempUser);
    saveUserToStorage(tempUser);
  };

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
      
      setUser(mockUser);
      saveUserToStorage(mockUser);
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    clearUserFromStorage();
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
      
      setUser(mockUser);
      saveUserToStorage(mockUser);
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
      
      setUser(updatedUser);
      saveUserToStorage(updatedUser);
    }
  };

  const completeOnboarding = (profile: BuyerProfile | SellerProfile): void => {
    if (user) {
      const updatedUser = {
        ...user,
        profile,
        isOnboardingComplete: true
      };
      
      console.log('Completing onboarding with profile:', profile);
      console.log('Updated user:', updatedUser);
      
      setUser(updatedUser);
      saveUserToStorage(updatedUser);
    }
  };

  const contextValue: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    signup,
    updateProfile,
    completeOnboarding,
    createTemporaryUser
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
