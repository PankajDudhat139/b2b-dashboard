// src/components/common/Button.tsx
import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const ButtonBase = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border: none;
  border-radius: ${theme.borderRadius.lg};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  text-align: center;
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  ${props => props.disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  `}
  
  /* Size variants */
  ${props => {
    switch (props.size) {
      case 'sm':
        return css`
          padding: 8px 16px;
          font-size: ${theme.fontSizes.sm};
        `;
      case 'lg':
        return css`
          padding: 16px 32px;
          font-size: ${theme.fontSizes.lg};
        `;
      default:
        return css`
          padding: 12px 24px;
          font-size: ${theme.fontSizes.base};
        `;
    }
  }}
  
  /* Color variants */
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return css`
          background: ${theme.colors.secondary};
          color: white;
          &:hover:not(:disabled) {
            background: ${theme.colors.secondaryLight};
            transform: translateY(-2px);
          }
        `;
      case 'danger':
        return css`
          background: ${theme.colors.danger};
          color: white;
          &:hover:not(:disabled) {
            background: ${theme.colors.dangerLight};
            transform: translateY(-2px);
          }
        `;
      case 'ghost':
        return css`
          background: transparent;
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};
          &:hover:not(:disabled) {
            background: ${theme.colors.primary};
            color: white;
          }
        `;
      default:
        return css`
          background: ${theme.colors.primary};
          color: white;
          &:hover:not(:disabled) {
            background: ${theme.colors.primaryDark};
            transform: translateY(-2px);
          }
        `;
    }
  }}
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  ...props
}) => {
  return (
    <ButtonBase {...props}>
      {loading && <LoadingSpinner />}
      {children}
    </ButtonBase>
  );
};
