import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { Layout } from './Layout';
import { theme } from '../../styles/theme';

const NotFoundContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: ${theme.spacing.lg};
`;

const NotFoundCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  text-align: center;
  max-width: 500px;
  width: 100%;
  box-shadow: ${theme.shadows.lg};
`;

const ErrorCode = styled.h1`
  font-size: 80px;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1;
`;

const ErrorTitle = styled.h2`
  color: ${theme.colors.gray700};
  font-size: ${theme.fontSizes.xl};
  font-weight: 600;
  margin-bottom: ${theme.spacing.md};
`;

const ErrorDescription = styled.p`
  color: ${theme.colors.gray500};
  font-size: ${theme.fontSizes.base};
  margin-bottom: ${theme.spacing.xl};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

export const NotFoundWithLayout: React.FC = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <Layout>
      <NotFoundContent>
        <NotFoundCard>
          <div style={{ fontSize: '40px', marginBottom: theme.spacing.lg }}>🤔</div>
          <ErrorCode>404</ErrorCode>
          <ErrorTitle>Page Not Found</ErrorTitle>
          <ErrorDescription>
            The page you're looking for doesn't exist.
          </ErrorDescription>
          
          <ActionButtons>
            <Button onClick={goBack} variant="ghost">
              Go Back
            </Button>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </ActionButtons>
        </NotFoundCard>
      </NotFoundContent>
    </Layout>
  );
};
