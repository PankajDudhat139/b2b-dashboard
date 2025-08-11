import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { AcquisitionStep } from '../../types';
import { DocumentAnalyzer } from './DocumentAnalyzer';
import { StepCard } from './StepCard';
import { theme } from '../../styles/theme';

const WorkflowContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

const WorkflowHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
`;

const WorkflowTitle = styled.h1`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes['4xl']};
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
`;

const WorkflowSubtitle = styled.p`
  color: ${theme.colors.gray500};
  font-size: ${theme.fontSizes.lg};
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['2xl']};
`;

const ProgressIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  gap: ${theme.spacing.md};
`;

const ProgressStep = styled.div<{ active: boolean; completed: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${theme.fontSizes.sm};
  background: ${props => 
    props.completed ? theme.colors.secondary :
    props.active ? theme.colors.primary : theme.colors.gray200
  };
  color: ${props => props.active || props.completed ? 'white' : theme.colors.gray500};
  transition: all 0.3s ease;
`;

const ProgressLine = styled.div<{ completed: boolean }>`
  width: 60px;
  height: 2px;
  background: ${props => props.completed ? theme.colors.secondary : theme.colors.gray200};
  transition: background 0.3s ease;
  
  &:last-child {
    display: none;
  }
`;

const workflowSteps: AcquisitionStep[] = [
  {
    id: 1,
    title: "Initial Interest",
    description: "Both parties express mutual interest and begin the formal acquisition process.",
    status: 'completed',
    aiFeature: {
      title: "Smart Matching Algorithm",
      description: "AI analyzes compatibility based on business metrics, investor preferences, and historical success patterns."
    },
    estimatedDuration: '1-2 days'
  },
  {
    id: 2,
    title: "Document Exchange",
    description: "Share essential business documents and financial statements for preliminary review.",
    status: 'active',
    aiFeature: {
      title: "Document Intelligence",
      description: "Automatically extracts key metrics from financial documents and flags potential concerns for human review."
    },
    requiredDocuments: [
      'Financial Statements (3 years)',
      'Tax Returns (3 years)', 
      'Business License',
      'Operating Agreements',
      'Customer Contracts (major ones)'
    ],
    estimatedDuration: '3-5 days'
  },
  {
    id: 3,
    title: "Valuation & Terms",
    description: "Negotiate price and deal structure with AI-powered insights and market comparables.",
    status: 'pending',
    aiFeature: {
      title: "Valuation Assistant",
      description: "Provides market-based valuation ranges and suggests optimal deal structures based on similar transactions."
    },
    estimatedDuration: '1-2 weeks'
  },
  {
    id: 4,
    title: "Due Diligence",
    description: "Comprehensive business review with guided checklists and automated analysis.",
    status: 'pending',
    aiFeature: {
      title: "Risk Assessment Engine",
      description: "Scans documents for red flags, verifies claims, and provides risk scoring across multiple categories."
    },
    requiredDocuments: [
      'Detailed Financial Records',
      'Employee Records',
      'Legal Documents',
      'Intellectual Property Documents',
      'Operational Procedures'
    ],
    estimatedDuration: '2-4 weeks'
  },
  {
    id: 5,
    title: "Legal & Closing",
    description: "Finalize legal documents and complete the transaction with guided workflows.",
    status: 'pending',
    aiFeature: {
      title: "Contract Intelligence",
      description: "Reviews legal documents for standard clauses, potential issues, and ensures all requirements are met."
    },
    requiredDocuments: [
      'Purchase Agreement',
      'Asset Purchase Agreement',
      'Employment Agreements',
      'Non-Compete Agreements'
    ],
    estimatedDuration: '1-3 weeks'
  }
];

export const AcquisitionWorkflow: React.FC = () => {
  const [steps, setSteps] = useState(workflowSteps);

  const handleStepAction = useCallback((stepId: number) => {
    setSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === stepId && step.status !== 'completed' 
          ? { ...step, status: 'active' as const }
          : step
      )
    );
  }, []);

  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const totalSteps = steps.length;

  return (
    <WorkflowContainer>
      <WorkflowHeader>
        <WorkflowTitle>Acquisition Process</WorkflowTitle>
        <WorkflowSubtitle>
          Guided by AI to maximize deal success and minimize friction
        </WorkflowSubtitle>
      </WorkflowHeader>

      <ProgressIndicator>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <ProgressStep 
              active={step.status === 'active'} 
              completed={step.status === 'completed'}
            >
              {step.status === 'completed' ? '✓' : step.id}
            </ProgressStep>
            {index < steps.length - 1 && (
              <ProgressLine completed={step.status === 'completed'} />
            )}
          </React.Fragment>
        ))}
      </ProgressIndicator>

      <div style={{ 
        textAlign: 'center', 
        marginBottom: theme.spacing.xl,
        color: theme.colors.gray600 
      }}>
        Progress: {completedSteps} of {totalSteps} steps completed
      </div>

      <StepsContainer>
        {steps.map((step) => (
          <StepCard
            key={step.id}
            step={step}
            onStepAction={handleStepAction}
          />
        ))}
      </StepsContainer>

      <DocumentAnalyzer 
        onAnalysisComplete={(results) => {
          console.log('Document analysis completed:', results);
        }}
      />
    </WorkflowContainer>
  );
};
