import React from 'react';
import styled from 'styled-components';
import { BuyerProfile } from '../../types';
import { Button } from '../common/Button';
import { theme } from '../../styles/theme';

const DetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: ${theme.borderRadius['2xl']};
  box-shadow: ${theme.shadows.lg};
  padding: ${theme.spacing['2xl']};
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing['2xl']};
  padding-bottom: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const Avatar = styled.div<{ src?: string }>`
  width: 80px;
  height: 80px;
  border-radius: ${theme.borderRadius.full};
  background: ${props => props.src ? `url(${props.src})` : `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryLight} 100%)`};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: ${theme.fontSizes['2xl']};
  margin-right: ${theme.spacing.lg};
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Name = styled.h1`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes['3xl']};
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
`;

const Location = styled.p`
  color: ${theme.colors.gray500};
  font-size: ${theme.fontSizes.base};
  margin-bottom: ${theme.spacing.md};
`;

const ExperienceBadge = styled.span<{ experience: string }>`
  display: inline-block;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius['2xl']};
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  ${props => {
    switch (props.experience) {
      case 'first-time':
        return `background: #E3F2FD; color: ${theme.colors.primary};`;
      case 'experienced':
        return `background: #E8F5E8; color: ${theme.colors.secondary};`;
      case 'serial':
        return `background: #FFF3E0; color: ${theme.colors.accent};`;
      default:
        return `background: ${theme.colors.gray100}; color: ${theme.colors.gray600};`;
    }
  }}
`;

const DetailSection = styled.div`
  margin-bottom: ${theme.spacing['2xl']};
`;

const SectionTitle = styled.h2`
  color: ${theme.colors.gray700};
  font-size: ${theme.fontSizes.xl};
  font-weight: 600;
  margin-bottom: ${theme.spacing.lg};
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
`;

const DetailItem = styled.div`
  background: ${theme.colors.gray100};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
`;

const DetailLabel = styled.div`
  color: ${theme.colors.gray500};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.xs};
`;

const DetailValue = styled.div`
  color: ${theme.colors.gray700};
  font-weight: 600;
  font-size: ${theme.fontSizes.base};
`;

const Bio = styled.div`
  background: ${theme.colors.gray100};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  line-height: 1.6;
  color: ${theme.colors.gray600};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  margin-top: ${theme.spacing['2xl']};
`;

interface BuyerProfileDetailProps {
  profile: BuyerProfile;
  onAccept: () => void;
  onReject: () => void;
  onBack: () => void;
}

export const BuyerProfileDetail: React.FC<BuyerProfileDetailProps> = ({
  profile,
  onAccept,
  onReject,
  onBack
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatExperience = (experience: string) => {
    return experience.replace('-', ' ') + ' buyer';
  };

  const formatFundingSource = (source: string) => {
    const mapping: Record<string, string> = {
      'personal-savings': 'Personal Savings',
      'bank-loan': 'Bank Loan',
      'investors': 'Investors',
      'combination': 'Multiple Sources'
    };
    return mapping[source] || source;
  };

  const formatBusinessSize = (size: string) => {
    const mapping: Record<string, string> = {
      'small': 'Small Business (< $1M revenue)',
      'medium': 'Medium Business ($1M - $10M revenue)',
      'large': 'Large Business (> $10M revenue)'
    };
    return mapping[size] || size;
  };

  return (
    <DetailContainer>
      <ProfileHeader>
        <Avatar src={profile.avatar}>
          {!profile.avatar && getInitials(profile.name)}
        </Avatar>
        <ProfileInfo>
          <Name>{profile.name}</Name>
          <Location>{profile.location}</Location>
          <ExperienceBadge experience={profile.experience}>
            {formatExperience(profile.experience)}
          </ExperienceBadge>
        </ProfileInfo>
      </ProfileHeader>

      <DetailSection>
        <SectionTitle>Investment Details</SectionTitle>
        <DetailGrid>
          <DetailItem>
            <DetailLabel>Investment Range</DetailLabel>
            <DetailValue>
              {formatCurrency(profile.investmentRange.min)} - {formatCurrency(profile.investmentRange.max)}
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Funding Source</DetailLabel>
            <DetailValue>{formatFundingSource(profile.fundingSource)}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Timeline</DetailLabel>
            <DetailValue>{profile.timeline}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Preferred Business Size</DetailLabel>
            <DetailValue>{formatBusinessSize(profile.preferredBusinessSize)}</DetailValue>
          </DetailItem>
        </DetailGrid>
      </DetailSection>

      <DetailSection>
        <SectionTitle>Industry Interests</SectionTitle>
        <DetailGrid>
          <DetailItem>
            <DetailLabel>Primary Industry</DetailLabel>
            <DetailValue>{profile.industry}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>All Interested Industries</DetailLabel>
            <DetailValue>{profile.interestedIndustries.join(', ')}</DetailValue>
          </DetailItem>
        </DetailGrid>
      </DetailSection>

      <DetailSection>
        <SectionTitle>About {profile.name}</SectionTitle>
        <Bio>{profile.bio}</Bio>
      </DetailSection>

      <ActionButtons>
        <Button variant="ghost" onClick={onBack}>
          Back to List
        </Button>
        <Button variant="danger" onClick={onReject}>
          Pass on This Buyer
        </Button>
        <Button onClick={onAccept}>
          Connect with {profile.name}
        </Button>
      </ActionButtons>
    </DetailContainer>
  );
};
