import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface InputProps {
  label?: string;
  error?: string;
  required?: boolean;
  fullWidth?: boolean;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
}

const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  ${props => props.fullWidth && css`width: 100%;`}
`;

const Label = styled.label`
  color: ${theme.colors.gray700};
  font-weight: 500;
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.sm};
  
  &::after {
    content: ${props => props.about?.includes('required') ? '" *"' : '""'};
    color: ${theme.colors.danger};
  }
`;

const InputField = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${props => props.hasError ? theme.colors.danger : theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSizes.base};
  transition: all 0.3s ease;
  background: white;
  font-family: ${theme.fonts.primary};
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 
      `${theme.colors.danger}20` : 
      `${theme.colors.primary}20`
    };
  }
  
  &:disabled {
    background: ${theme.colors.gray100};
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  &::placeholder {
    color: ${theme.colors.gray400};
  }
`;

const ErrorText = styled.span`
  color: ${theme.colors.danger};
  font-size: ${theme.fontSizes.sm};
  margin-top: ${theme.spacing.xs};
`;

export const Input: React.FC<InputProps> = ({
  label,
  error,
  required,
  fullWidth = true,
  ...inputProps
}) => {
  return (
    <InputContainer fullWidth={fullWidth}>
      {label && (
        <Label about={required ? 'required' : ''}>
          {label}
        </Label>
      )}
      <InputField hasError={!!error} {...inputProps} />
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};
