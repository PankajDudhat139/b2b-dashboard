import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { SellerProfile, OnboardingStep } from '../../types';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { OnboardingLayout } from './OnboardingLayout';
import { theme } from '../../styles/theme';

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.sm};
  margin-bottom: ${theme.spacing.xl};
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, ${theme.colors.secondary}, ${theme.colors.secondaryLight});
  border-radius: ${theme.borderRadius.sm};
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const StepHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
  
  h2 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.sm};
    font-size: ${theme.fontSizes['3xl']};
    font-weight: 600;
  }
  
  p {
    color: ${theme.colors.gray500};
    font-size: ${theme.fontSizes.base};
  }
`;

const FormGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['2xl']};
`;

const Select = styled.select<{ hasError?: boolean }>`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${props => props.hasError ? theme.colors.danger : theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSizes.base};
  background: white;
  transition: all 0.3s ease;
  font-family: ${theme.fonts.primary};
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 
      `${theme.colors.danger}20` : 
      `${theme.colors.primary}20`
    };
  }
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${props => props.hasError ? theme.colors.danger : theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSizes.base};
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: ${theme.fonts.primary};
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 
      `${theme.colors.danger}20` : 
      `${theme.colors.primary}20`
    };
  }
  
  &::placeholder {
    color: ${theme.colors.gray400};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  color: ${theme.colors.gray700};
  font-weight: 500;
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.base};
`;

const ErrorText = styled.span`
  color: ${theme.colors.danger};
  font-size: ${theme.fontSizes.sm};
  margin-top: ${theme.spacing.xs};
  display: block;
`;

const sellerOnboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: "Tell us about your business",
    description: "Let's start with the basics of what you're selling",
    fields: [
      { name: 'businessName', type: 'text', label: 'Business Name', required: true, placeholder: 'Enter your business name' },
      { name: 'industry', type: 'select', label: 'Industry', required: true, options: ['Technology', 'Healthcare', 'Retail', 'Manufacturing', 'Food & Beverage', 'Professional Services', 'Construction', 'Other'] },
      { name: 'yearsInBusiness', type: 'number', label: 'Years in Business', required: true, placeholder: '5' },
      { name: 'employees', type: 'number', label: 'Number of Employees', required: true, placeholder: '10' }
    ]
  },
  {
    id: 2,
    title: "Financial Information",
    description: "Help buyers understand your business value",
    fields: [
      { name: 'revenue', type: 'number', label: 'Annual Revenue ($)', required: true, placeholder: '500000' },
      { name: 'askingPrice', type: 'number', label: 'Asking Price ($)', required: true, placeholder: '1000000' },
      { name: 'profitMargin', type: 'number', label: 'Profit Margin (%)', required: true, placeholder: '15' },
      { name: 'location', type: 'text', label: 'Business Location', required: true, placeholder: 'City, State' }
    ]
  },
  {
    id: 3,
    title: "Business Details",
    description: "Share what makes your business special",
    fields: [
      { name: 'businessModel', type: 'select', label: 'Business Model', required: true, options: ['B2B', 'B2C', 'B2B2C', 'Marketplace', 'SaaS', 'E-commerce', 'Service-based', 'Product-based'] },
      { name: 'reasonForSelling', type: 'select', label: 'Reason for Selling', required: true, options: ['Retirement', 'New Opportunity', 'Relocation', 'Health Issues', 'Financial Reasons', 'Partnership Dissolution', 'Other'] },
      { name: 'description', type: 'textarea', label: 'Business Description', required: true, placeholder: 'Describe your business, its unique value proposition, key assets, and why someone should buy it...' }
    ]
  }
];

interface SellerOnboardingProps {
  onComplete: (profile: SellerProfile) => void;
}

export const SellerOnboarding: React.FC<SellerOnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<SellerProfile>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = useCallback((field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  }, [errors]);

  const validateStep = () => {
    const currentStepData = sellerOnboardingSteps[currentStep];
    const newErrors: Record<string, string> = {};
    
    currentStepData.fields.forEach(field => {
      if (field.required) {
        const value = formData[field.name as keyof SellerProfile];
        if (!value || value === '') {
          newErrors[field.name] = `${field.label} is required`;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = useCallback(() => {
    if (!validateStep()) return;
    
    if (currentStep < sellerOnboardingSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete({
        ...formData,
        id: Date.now().toString(),
        assets: [] // Will be filled later
      } as SellerProfile);
    }
  }, [currentStep, formData, onComplete]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const currentStepData = sellerOnboardingSteps[currentStep];
  const progress = ((currentStep + 1) / sellerOnboardingSteps.length) * 100;

  const renderField = (field: any) => {
    const value = formData[field.name as keyof SellerProfile] || '';
    const error = errors[field.name];

    switch (field.type) {
      case 'select':
        return (
          <div key={field.name}>
            <Label>{field.label} {field.required && '*'}</Label>
            <Select
              value={value as string}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              hasError={!!error}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option: string) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
            {error && <ErrorText>{error}</ErrorText>}
          </div>
        );
      case 'textarea':
        return (
          <div key={field.name}>
            <Label>{field.label} {field.required && '*'}</Label>
            <TextArea
              value={value as string}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              hasError={!!error}
            />
            {error && <ErrorText>{error}</ErrorText>}
          </div>
        );
      default:
        return (
          <Input
            key={field.name}
            type={field.type}
            label={field.label}
            value={value as string | number}
            onChange={(e) => handleInputChange(field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            error={error}
          />
        );
    }
  };

  return (
    <OnboardingLayout gradientColors={['#667eea', '#764ba2']}>
      <ProgressBar>
        <ProgressFill progress={progress} />
      </ProgressBar>
      
      <StepHeader>
        <h2>{currentStepData.title}</h2>
        <p>{currentStepData.description}</p>
      </StepHeader>

      <FormGrid>
        {currentStepData.fields.map(renderField)}
      </FormGrid>

      <ButtonGroup>
        {currentStep > 0 && (
          <Button variant="ghost" onClick={handleBack}>
            Back
          </Button>
        )}
        <Button onClick={handleNext} fullWidth={currentStep === 0}>
          {currentStep === sellerOnboardingSteps.length - 1 ? 'Complete Profile' : 'Continue'}
        </Button>
      </ButtonGroup>
    </OnboardingLayout>
  );
};
