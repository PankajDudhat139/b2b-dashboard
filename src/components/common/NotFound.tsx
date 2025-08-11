import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { theme } from '../../styles/theme';

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg};
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const NotFoundCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  text-align: center;
  max-width: 600px;
  width: 100%;
  box-shadow: ${theme.shadows.xl};
`;

const ErrorCode = styled.h1`
  font-size: 120px;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 80px;
  }
`;

const ErrorTitle = styled.h2`
  color: ${theme.colors.gray700};
  font-size: ${theme.fontSizes['2xl']};
  font-weight: 600;
  margin-bottom: ${theme.spacing.md};
`;

const ErrorDescription = styled.p`
  color: ${theme.colors.gray500};
  font-size: ${theme.fontSizes.base};
  margin-bottom: ${theme.spacing['2xl']};
  line-height: 1.6;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

const Illustration = styled.div`
  font-size: 60px;
  margin-bottom: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 40px;
  }
`;

const SuggestedLinks = styled.div`
  margin-top: ${theme.spacing['2xl']};
  padding-top: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.gray200};
`;

const SuggestedTitle = styled.h3`
  color: ${theme.colors.gray600};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SuggestedLinksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  align-items: center;
`;

const SuggestedLink = styled(Link)`
  color: ${theme.colors.primary};
  text-decoration: none;
  font-size: ${theme.fontSizes.sm};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${theme.colors.primaryLight};
    text-decoration: underline;
  }
`;

export const NotFound: React.FC = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <NotFoundContainer>
      <NotFoundCard>
        <Illustration>🔍</Illustration>
        <ErrorCode>404</ErrorCode>
        <ErrorTitle>Page Not Found</ErrorTitle>
        <ErrorDescription>
          Oops! The page you're looking for doesn't exist. It might have been moved, 
          deleted, or you entered the wrong URL.
        </ErrorDescription>
        
        <ActionButtons>
          <Button onClick={goBack} variant="ghost">
            Go Back
          </Button>
        </ActionButtons>

        <SuggestedLinks>
          <SuggestedTitle>Helpful Links</SuggestedTitle>
          <SuggestedLinksList>
            <SuggestedLink to="/dashboard">Dashboard</SuggestedLink>
            <SuggestedLink to="/onboarding">Complete Profile</SuggestedLink>
            <SuggestedLink to="/workflow">Acquisition Workflow</SuggestedLink>
          </SuggestedLinksList>
        </SuggestedLinks>
      </NotFoundCard>
    </NotFoundContainer>
  );
};
