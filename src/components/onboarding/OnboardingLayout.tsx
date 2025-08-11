import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  gradientColors?: [string, string];
}

const OnboardingContainer = styled.div<{ gradientColors: [string, string] }>`
  background: linear-gradient(135deg, ${props => props.gradientColors[0]} 0%, ${props => props.gradientColors[1]} 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg};
`;

const FormCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius['2xl']};
  box-shadow: ${theme.shadows.xl};
  padding: ${theme.spacing['2xl']};
  max-width: 600px;
  width: 100%;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary});
  }
`;

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ 
  children, 
  gradientColors = ['#667eea', '#764ba2'] 
}) => {
  return (
    <OnboardingContainer gradientColors={gradientColors}>
      <FormCard>
        {children}
      </FormCard>
    </OnboardingContainer>
  );
};
