import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { useAuth } from '../../hooks/useAuth';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: ${theme.shadows.md};
  z-index: 1000;
  padding: 0 ${theme.spacing.lg};
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

const Logo = styled(Link)`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    color: ${theme.colors.primaryLight};
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.xl};
  padding: ${theme.spacing.sm};
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  box-shadow: ${theme.shadows.lg};
  padding: ${theme.spacing.lg};
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  gap: ${theme.spacing.md};
  
  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ active?: boolean }>`
  color: ${props => props.active ? theme.colors.primary : theme.colors.gray600};
  font-weight: ${props => props.active ? '600' : '400'};
  text-decoration: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${theme.colors.primary};
    background: ${theme.colors.gray100};
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: ${theme.colors.primaryLight};
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.gray600};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${theme.colors.primary};
    background: ${theme.colors.gray100};
  }
`;

export const Navigation: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    if (user.type === 'buyer') {
      return (user.profile as any).name || 'Buyer';
    }
    return (user.profile as any).businessName || 'Seller';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <NavContainer>
      <NavContent>
        <Logo to="/">BizMatch</Logo>
        
        {user && (
          <>
            <NavLinks>
              <NavLink 
                to="/dashboard" 
                active={location.pathname === '/dashboard'}
              >
                Dashboard
              </NavLink>
              {user.type === 'seller' && (
                <NavLink 
                  to="/buyers" 
                  active={location.pathname === '/buyers'}
                >
                  Browse Buyers
                </NavLink>
              )}
              {user.type === 'buyer' && (
                <NavLink 
                  to="/businesses" 
                  active={location.pathname === '/businesses'}
                >
                  Browse Businesses
                </NavLink>
              )}
              <NavLink 
                to="/matches" 
                active={location.pathname === '/matches'}
              >
                Matches
              </NavLink>
              <NavLink 
                to="/workflow" 
                active={location.pathname === '/workflow'}
              >
                Workflow
              </NavLink>
              <NavLink 
              to="/settings" 
              active={location.pathname === '/settings'}
            >
              Settings
            </NavLink>
            </NavLinks>
            
            <MobileMenuButton onClick={toggleMobileMenu}>
              ☰
            </MobileMenuButton>
          </>
        )}

        <UserMenu>
          {user ? (
            <>
              <Avatar title={getUserDisplayName()}>
                {getInitials(getUserDisplayName())}
              </Avatar>
              <LogoutButton onClick={logout}>Logout</LogoutButton>
            </>
          ) : (
            <NavLinks>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </NavLinks>
          )}
        </UserMenu>
      </NavContent>
      
      {user && (
        <MobileMenu isOpen={isMobileMenuOpen}>
          <NavLink 
            to="/dashboard" 
            active={location.pathname === '/dashboard'}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </NavLink>
          {user.type === 'seller' && (
            <NavLink 
              to="/buyers" 
              active={location.pathname === '/buyers'}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Browse Buyers
            </NavLink>
          )}
          {user.type === 'buyer' && (
            <NavLink 
              to="/businesses" 
              active={location.pathname === '/businesses'}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Browse Businesses
            </NavLink>
          )}
          <NavLink 
            to="/matches" 
            active={location.pathname === '/matches'}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Matches
          </NavLink>
          <NavLink 
            to="/workflow" 
            active={location.pathname === '/workflow'}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Workflow
          </NavLink>
        </MobileMenu>
      )}
    </NavContainer>
  );
};
