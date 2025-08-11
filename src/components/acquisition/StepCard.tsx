import React from 'react';
import styled from 'styled-components';
import { AcquisitionStep } from '../../types';
import { Button } from '../common/Button';
import { theme } from '../../styles/theme';

const CardContainer = styled.div<{ status: 'pending' | 'active' | 'completed' }>`
  background: white;
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  border: 2px solid ${props => {
    switch (props.status) {
      case 'completed': return theme.colors.secondary;
      case 'active': return theme.colors.primary;
      default: return theme.colors.gray200;
    }
  }};
  transition: all 0.3s ease;
  
  ${props => props.status === 'active' && `
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  `}
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;

const StepNumber = styled.div<{ status: 'pending' | 'active' | 'completed' }>`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  background: ${props => {
    switch (props.status) {
      case 'completed': return theme.colors.secondary;
      case 'active': return theme.colors.primary;
      default: return theme.colors.gray200;
    }
  }};
  color: ${props => props.status === 'pending' ? theme.colors.gray500 : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: ${theme.spacing.md};
`;

const StepInfo = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  color: ${theme.colors.gray700};
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
`;

const EstimatedDuration = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.gray400};
  margin-top: ${theme.spacing.xs};
`;

const StepDescription = styled.p`
  color: ${theme.colors.gray500};
  font-size: ${theme.fontSizes.sm};
  line-height: 1.5;
  margin-bottom: ${theme.spacing.md};
`;

const AIFeature = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const AIFeatureTitle = styled.h4`
  color: white;
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  
  &:before {
    content: "🤖";
    margin-right: ${theme.spacing.sm};
  }
`;

const AIFeatureDescription = styled.p`
  color: rgba(255,255,255,0.9);
  font-size: ${theme.fontSizes.xs};
  line-height: 1.4;
`;

const RequiredDocuments = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const DocumentsTitle = styled.h5`
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.gray600};
`;

const DocumentsList = styled.ul`
  padding-left: ${theme.spacing.lg};
`;

const DocumentItem = styled.li`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.gray500};
  margin-bottom: ${theme.spacing.xs};
`;

interface StepCardProps {
  step: AcquisitionStep;
  onStepAction: (stepId: number) => void;
}

export const StepCard: React.FC<StepCardProps> = ({ step, onStepAction }) => {
  const getButtonText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed ✓';
      case 'active': return 'Continue';
      default: return 'Start Step';
    }
  };

  const getButtonVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'secondary' as const;
      case 'active': return 'primary' as const;
      default: return 'ghost' as const;
    }
  };

  return (
    <CardContainer status={step.status}>
      <StepHeader>
        <StepNumber status={step.status}>
          {step.status === 'completed' ? '✓' : step.id}
        </StepNumber>
        <StepInfo>
          <StepTitle>{step.title}</StepTitle>
          {step.estimatedDuration && (
            <EstimatedDuration>{step.estimatedDuration}</EstimatedDuration>
          )}
        </StepInfo>
      </StepHeader>
      
      <StepDescription>{step.description}</StepDescription>
      
      <AIFeature>
        <AIFeatureTitle>{step.aiFeature.title}</AIFeatureTitle>
        <AIFeatureDescription>{step.aiFeature.description}</AIFeatureDescription>
      </AIFeature>
      
      {step.requiredDocuments && step.requiredDocuments.length > 0 && (
        <RequiredDocuments>
          <DocumentsTitle>Required Documents:</DocumentsTitle>
          <DocumentsList>
            {step.requiredDocuments.map((doc, index) => (
              <DocumentItem key={index}>{doc}</DocumentItem>
            ))}
          </DocumentsList>
        </RequiredDocuments>
      )}
      
      <Button 
        variant={getButtonVariant(step.status)}
        fullWidth
        disabled={step.status === 'completed'}
        onClick={() => onStepAction(step.id)}
      >
        {getButtonText(step.status)}
      </Button>
    </CardContainer>
  );
};
