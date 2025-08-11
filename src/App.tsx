import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { Layout } from './components/common/Layout';
import { NotFound } from './components/common/NotFound';
import { NotFoundWithLayout } from './components/common/NotFoundWithLayout';
import { SellerOnboarding } from './components/onboarding/SellerOnboarding';
import { BuyerOnboarding } from './components/onboarding/BuyerOnboarding';
import { AcquisitionWorkflow } from './components/acquisition/AcquisitionWorkflow';
import { Dashboard } from './components/dashboard/Dashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import styled from 'styled-components';
import { Button } from './components/common/Button';

const OnboardingContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const WelcomeCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
`;

const WelcomeTitle = styled.h1`
  color: ${theme.colors.primary};
  margin-bottom: 20px;
  font-size: ${theme.fontSizes['3xl']};
  font-weight: 600;
`;

const WelcomeSubtitle = styled.p`
  color: ${theme.colors.gray500};
  margin-bottom: 40px;
  font-size: ${theme.fontSizes.base};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const OnboardingPage: React.FC = () => {
  const [userType, setUserType] = React.useState<'buyer' | 'seller' | null>(null);
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();

  // If user already exists but hasn't completed onboarding, set their type
  React.useEffect(() => {
    if (user && !user.isOnboardingComplete && !userType) {
      setUserType(user.type);
    }
  }, [user, userType]);

  const handleComplete = (profile: any) => {
    console.log('Profile completed:', profile);
    completeOnboarding(profile);
    // Use React Router navigation instead of window.location
    navigate('/dashboard', { replace: true });
  };

  const handleUserTypeSelect = (type: 'buyer' | 'seller') => {
    setUserType(type);
    // You might want to create a temporary user here or pass the type to onboarding
  };

  if (!userType) {
    return (
      <OnboardingContainer>
        <WelcomeCard>
          <WelcomeTitle>Welcome to BizMatch</WelcomeTitle>
          <WelcomeSubtitle>
            The modern platform for business acquisitions. Are you looking to buy or sell a business?
          </WelcomeSubtitle>
          <ButtonGroup>
            <Button onClick={() => handleUserTypeSelect('buyer')} fullWidth>
              I'm a Buyer 💼
            </Button>
            <Button variant="secondary" onClick={() => handleUserTypeSelect('seller')} fullWidth>
              I'm a Seller 🏢
            </Button>
          </ButtonGroup>
        </WelcomeCard>
      </OnboardingContainer>
    );
  }

  if (userType === 'seller') {
    return <SellerOnboarding onComplete={handleComplete} />;
  }

  return <BuyerOnboarding onComplete={handleComplete} />;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/onboarding" replace />;
  }

  if (!user.isOnboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

// Component to determine which 404 page to show
const NotFoundHandler: React.FC = () => {
  const { user } = useAuth();
  
  // If user is authenticated and onboarded, show layout version
  if (user && user.isOnboardingComplete) {
    return <NotFoundWithLayout />;
  }
  
  // Otherwise show standalone version
  return <NotFound />;
};

const AppContent: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/onboarding" element={<OnboardingPage />} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/workflow" element={
        <ProtectedRoute>
          <Layout>
            <AcquisitionWorkflow />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/buyers" element={
        <ProtectedRoute>
          <Layout>
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <h1>Browse Buyers Page</h1>
              <p>This page is under construction.</p>
            </div>
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/businesses" element={
        <ProtectedRoute>
          <Layout>
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <h1>Browse Businesses Page</h1>
              <p>This page is under construction.</p>
            </div>
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/matches" element={
        <ProtectedRoute>
          <Layout>
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <h1>Matches Page</h1>
              <p>This page is under construction.</p>
            </div>
          </Layout>
        </ProtectedRoute>
      } />
      
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/onboarding" />} />
      
      {/* 404 - Catch all other routes */}
      <Route path="*" element={<NotFoundHandler />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <GlobalStyles theme={theme} />
          <AppContent />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
