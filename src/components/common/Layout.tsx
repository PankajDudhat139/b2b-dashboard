import React from 'react';
import styled from 'styled-components';
import { Navigation } from './Navigation';
import { theme } from '../../styles/theme';

interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main<{ hasNavigation: boolean }>`
  flex: 1;
  padding-top: ${props => props.hasNavigation ? '80px' : '0'};
`;

const Footer = styled.footer`
  background: ${theme.colors.gray800};
  color: white;
  padding: ${theme.spacing.xl} 0;
  text-align: center;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing.sm};
  }
`;

const FooterLink = styled.a`
  color: ${theme.colors.gray300};
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
`;

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showNavigation = true 
}) => {
  return (
    <LayoutContainer>
      {showNavigation && <Navigation />}
      <MainContent hasNavigation={showNavigation}>
        {children}
      </MainContent>
      <Footer>
        <FooterContent>
          <FooterLinks>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterLinks>
            <p>&copy; {new Date().getFullYear()} BizMatch. All rights reserved.</p>
        </FooterContent>
      </Footer>
    </LayoutContainer>
  );
};
