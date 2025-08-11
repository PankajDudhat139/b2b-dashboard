import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import { theme } from '../../styles/theme';

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const StatCard = styled.div`
  background: white;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const StatIcon = styled.div`
  font-size: 32px;
  margin-bottom: ${theme.spacing.md};
`;

const StatValue = styled.div`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: 600;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  color: ${theme.colors.gray500};
  font-size: ${theme.fontSizes.sm};
`;

const StatChange = styled.div<{ positive?: boolean }>`
  font-size: ${theme.fontSizes.xs};
  color: ${props => props.positive ? theme.colors.secondary : theme.colors.danger};
  margin-top: ${theme.spacing.xs};
`;

export const Stats: React.FC = () => {
  const { user } = useAuth();

  const sellerStats = [
    {
      icon: '👥',
      value: '12',
      label: 'Interested Buyers',
      change: '+3 this week',
      positive: true
    },
    {
      icon: '💬',
      value: '4',
      label: 'Active Conversations',
      change: '+1 today',
      positive: true
    },
    {
      icon: '📄',
      value: '2',
      label: 'Offers Received',
      change: 'New offer pending',
      positive: true
    },
    {
      icon: '⏱️',
      value: '18',
      label: 'Days on Market',
      change: 'Average is 24 days',
      positive: true
    }
  ];

  const buyerStats = [
    {
      icon: '🏢',
      value: '8',
      label: 'Businesses Viewed',
      change: '+2 this week',
      positive: true
    },
    {
      icon: '❤️',
      value: '3',
      label: 'Saved Favorites',
      change: '1 new match',
      positive: true
    },
    {
      icon: '📊',
      value: '5',
      label: 'Offers Made',
      change: '2 pending responses',
      positive: true
    },
    {
      icon: '🎯',
      value: '85%',
      label: 'Match Score Avg',
      change: 'Above average',
      positive: true
    }
  ];

  const statsToShow = user?.type === 'seller' ? sellerStats : buyerStats;

  return (
    <StatsContainer>
      {statsToShow.map((stat, index) => (
        <StatCard key={index}>
          <StatIcon>{stat.icon}</StatIcon>
          <StatValue>{stat.value}</StatValue>
          <StatLabel>{stat.label}</StatLabel>
          <StatChange positive={stat.positive}>{stat.change}</StatChange>
        </StatCard>
      ))}
    </StatsContainer>
  );
};
