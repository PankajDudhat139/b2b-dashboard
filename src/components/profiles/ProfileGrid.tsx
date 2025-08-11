import React from 'react';
import styled from 'styled-components';
import { BuyerProfile } from '../../types';
import { BuyerProfileCard } from './BuyerProfileCard';
import { theme } from '../../styles/theme';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  color: ${theme.colors.gray500};
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: ${theme.spacing.lg};
`;

const EmptyTitle = styled.h3`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.xl};
`;

const EmptyDescription = styled.p`
  font-size: ${theme.fontSizes.base};
  max-width: 400px;
  margin: 0 auto;
`;

interface ProfileGridProps {
  profiles: BuyerProfile[];
  onAccept: (profileId: string) => void;
  onReject: (profileId: string) => void;
  onViewDetails: (profileId: string) => void;
}

export const ProfileGrid: React.FC<ProfileGridProps> = ({
  profiles,
  onAccept,
  onReject,
  onViewDetails
}) => {
  if (profiles.length === 0) {
    return (
      <GridContainer>
        <EmptyState>
          <EmptyIcon>👥</EmptyIcon>
          <EmptyTitle>No buyers found</EmptyTitle>
          <EmptyDescription>
            There are currently no buyers that match your criteria. 
            Check back later or adjust your preferences.
          </EmptyDescription>
        </EmptyState>
      </GridContainer>
    );
  }

  return (
    <GridContainer>
      {profiles.map((profile) => (
        <BuyerProfileCard
          key={profile.id}
          profile={profile}
          onAccept={() => onAccept(profile.id)}
          onReject={() => onReject(profile.id)}
          onViewDetails={() => onViewDetails(profile.id)}
        />
      ))}
    </GridContainer>
  );
};
