import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { Layout } from './components/common/Layout';
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
  const { completeOnboarding } = useAuth();

  const handleComplete = (profile: any) => {
    console.log('Profile completed:', profile);
    completeOnboarding(profile);
    // Redirect to dashboard
    window.location.href = '/dashboard';
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
            <Button onClick={() => setUserType('buyer')} fullWidth>
              I'm a Buyer 💼
            </Button>
            <Button variant="secondary" onClick={() => setUserType('seller')} fullWidth>
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

const AppContent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />
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
        <Route path="/" element={<Navigate to="/onboarding" />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyles theme={theme} />
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
