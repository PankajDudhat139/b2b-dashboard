import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface Match {
  id: string;
  buyerName?: string;
  businessName?: string;
  status: 'pending' | 'matched' | 'in-negotiation' | 'completed' | 'rejected';
  lastActivity: string;
  matchDate: string;
}

const MatchesContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const MatchItem = styled.div`
  padding: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.gray200};
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${theme.colors.gray100};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const MatchHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.sm};
`;

const MatchInfo = styled.div`
  flex: 1;
`;

const MatchName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.xs};
`;

const BusinessName = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.gray500};
  margin-bottom: ${theme.spacing.xs};
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: 500;
  ${props => {
    switch (props.status) {
      case 'pending':
        return `background: ${theme.colors.warning}20; color: #B45309;`;
      case 'matched':
        return `background: ${theme.colors.secondary}20; color: ${theme.colors.secondary};`;
      case 'in-negotiation':
        return `background: ${theme.colors.primary}20; color: ${theme.colors.primary};`;
      case 'completed':
        return `background: ${theme.colors.secondary}30; color: #166534;`;
      case 'rejected':
        return `background: ${theme.colors.danger}20; color: ${theme.colors.danger};`;
      default:
        return `background: ${theme.colors.gray100}; color: ${theme.colors.gray600};`;
    }
  }}
`;

const MatchFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.gray400};
`;

const EmptyState = styled.div`
  padding: ${theme.spacing['2xl']};
  text-align: center;
  color: ${theme.colors.gray500};
`;

const EmptyIcon = styled.div`
  font-size: 32px;
  margin-bottom: ${theme.spacing.md};
`;

interface MatchesListProps {
  matches: Match[];
}

export const MatchesList: React.FC<MatchesListProps> = ({ matches }) => {
  const formatStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'matched':
        return 'Matched';
      case 'in-negotiation':
        return 'In Negotiation';
      case 'completed':
        return 'Completed';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (matches.length === 0) {
    return (
      <EmptyState>
        <EmptyIcon>🤝</EmptyIcon>
        <div>No matches yet</div>
        <div style={{ fontSize: theme.fontSizes.xs, marginTop: theme.spacing.xs }}>
          Complete your profile to start receiving matches
        </div>
      </EmptyState>
    );
  }

  return (
    <MatchesContainer>
      {matches.map((match) => (
        <MatchItem key={match.id}>
          <MatchHeader>
            <MatchInfo>
              <MatchName>
                {match.buyerName || match.businessName}
              </MatchName>
              {match.businessName && match.buyerName && (
                <BusinessName>{match.businessName}</BusinessName>
              )}
              <StatusBadge status={match.status}>
                {formatStatus(match.status)}
              </StatusBadge>
            </MatchInfo>
          </MatchHeader>
          <MatchFooter>
            <span>Last activity: {match.lastActivity}</span>
            <span>Matched: {formatDate(match.matchDate)}</span>
          </MatchFooter>
        </MatchItem>
      ))}
    </MatchesContainer>
  );
};
