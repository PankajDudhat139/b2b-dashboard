import React from 'react';
import styled from 'styled-components';
import { BuyerProfile } from '../../types';
import { Button } from '../common/Button';
import { theme } from '../../styles/theme';

const CardContainer = styled.div`
  background: white;
  border-radius: ${theme.borderRadius['2xl']};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const Avatar = styled.div<{ src?: string }>`
  width: 60px;
  height: 60px;
  border-radius: ${theme.borderRadius.full};
  background: ${props => props.src ? `url(${props.src})` : `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryLight} 100%)`};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: ${theme.fontSizes.xl};
  margin-right: ${theme.spacing.md};
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Name = styled.h3`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.xl};
  font-weight: 600;
  margin-bottom: ${theme.spacing.xs};
`;

const Location = styled.p`
  color: ${theme.colors.gray500};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.sm};
`;

const ExperienceBadge = styled.span<{ experience: string }>`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius['2xl']};
  font-size: ${theme.fontSizes.xs};
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

const InvestmentRange = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;

const InvestmentLabel = styled.span`
  color: ${theme.colors.gray500};
  font-size: ${theme.fontSizes.sm};
  margin-right: ${theme.spacing.sm};
`;

const InvestmentAmount = styled.span`
  color: ${theme.colors.secondary};
  font-weight: 600;
  font-size: ${theme.fontSizes.base};
`;

const KeyMetrics = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const Metric = styled.div`
  text-align: center;
  padding: ${theme.spacing.sm};
  background: ${theme.colors.gray100};
  border-radius: ${theme.borderRadius.lg};
`;

const MetricLabel = styled.div`
  color: ${theme.colors.gray500};
  font-size: ${theme.fontSizes.xs};
  margin-bottom: ${theme.spacing.xs};
`;

const MetricValue = styled.div`
  color: ${theme.colors.gray700};
  font-weight: 600;
  font-size: ${theme.fontSizes.sm};
`;

const Bio = styled.p`
  color: ${theme.colors.gray500};
  font-size: ${theme.fontSizes.sm};
  line-height: 1.5;
  margin-bottom: ${theme.spacing.lg};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

interface BuyerProfileCardProps {
  profile: BuyerProfile;
  onAccept: () => void;
  onReject: () => void;
  onViewDetails: () => void;
}

export const BuyerProfileCard: React.FC<BuyerProfileCardProps> = ({
  profile,
  onAccept,
  onReject,
  onViewDetails
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
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
      'small': 'Small Business',
      'medium': 'Medium Business',
      'large': 'Large Business'
    };
    return mapping[size] || size;
  };

  return (
    <CardContainer>
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

      <InvestmentRange>
        <InvestmentLabel>Investment Budget:</InvestmentLabel>
        <InvestmentAmount>
          {formatCurrency(profile.investmentRange.min)} - {formatCurrency(profile.investmentRange.max)}
        </InvestmentAmount>
      </InvestmentRange>

      <KeyMetrics>
        <Metric>
          <MetricLabel>Industry Focus</MetricLabel>
          <MetricValue>{profile.industry}</MetricValue>
        </Metric>
        <Metric>
          <MetricLabel>Timeline</MetricLabel>
          <MetricValue>{profile.timeline}</MetricValue>
        </Metric>
        <Metric>
          <MetricLabel>Funding</MetricLabel>
          <MetricValue>{formatFundingSource(profile.fundingSource)}</MetricValue>
        </Metric>
        <Metric>
          <MetricLabel>Business Size</MetricLabel>
          <MetricValue>{formatBusinessSize(profile.preferredBusinessSize)}</MetricValue>
        </Metric>
      </KeyMetrics>

      <Bio>{profile.bio}</Bio>

      <ActionButtons>
        <Button variant="danger" size="sm" onClick={onReject}>
          Pass
        </Button>
        <Button variant="ghost" size="sm" onClick={onViewDetails}>
          View Details
        </Button>
        <Button size="sm" onClick={onAccept}>
          Connect
        </Button>
      </ActionButtons>
    </CardContainer>
  );
};
