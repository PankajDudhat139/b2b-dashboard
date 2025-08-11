import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import { Stats } from './Stats';
import { MatchesList } from './MatchesList';
import { BuyerProfileCard } from '../profiles/BuyerProfileCard';
import { BuyerProfileDetail } from '../profiles/BuyerProfileDetail';
import { BuyerProfile } from '../../types';
import { theme } from '../../styles/theme';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryLight} 100%);
  color: white;
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.xl};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
`;

const WelcomeTitle = styled.h1`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
`;

const WelcomeSubtitle = styled.p`
  font-size: ${theme.fontSizes.lg};
  opacity: 0.9;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
`;

const SectionTitle = styled.h2`
  color: ${theme.colors.gray700};
  font-size: ${theme.fontSizes.xl};
  font-weight: 600;
  margin-bottom: ${theme.spacing.lg};
`;

const DetailViewContainer = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

// Mock data for demonstration
const mockBuyerProfiles: BuyerProfile[] = [
  {
    id: '1',
    name: 'John Smith',
    industry: 'Technology',
    investmentRange: { min: 500000, max: 2000000 },
    experience: 'experienced',
    location: 'San Francisco, CA',
    timeline: 'Within 6 months',
    fundingSource: 'combination',
    bio: 'Experienced technology executive with 15+ years in the industry. Looking to acquire a profitable SaaS business with strong recurring revenue and growth potential. I bring operational expertise, strategic vision, and capital to help scale the right opportunity. My background includes leading engineering teams at Fortune 500 companies and successfully scaling multiple startups from Series A to IPO.',
    interestedIndustries: ['Technology', 'SaaS', 'E-commerce'],
    preferredBusinessSize: 'medium'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    industry: 'Healthcare',
    investmentRange: { min: 300000, max: 1000000 },
    experience: 'first-time',
    location: 'Austin, TX',
    timeline: 'Within 3 months',
    fundingSource: 'personal-savings',
    bio: 'Healthcare professional with 12 years of experience in medical practice management. Looking to acquire a medical practice or healthcare services business. I have deep industry knowledge, strong relationships with healthcare providers, and a proven track record of improving operational efficiency in medical settings.',
    interestedIndustries: ['Healthcare', 'Medical Services', 'Healthcare Technology'],
    preferredBusinessSize: 'small'
  },
  {
    id: '3',
    name: 'Michael Chen',
    industry: 'Manufacturing',
    investmentRange: { min: 1000000, max: 5000000 },
    experience: 'serial',
    location: 'Chicago, IL',
    timeline: 'Within 1 year',
    fundingSource: 'investors',
    bio: 'Serial entrepreneur with 20+ years of experience in manufacturing and operations. Successfully acquired and scaled 3 manufacturing businesses in the past decade. Looking for established manufacturing companies with strong fundamentals that can benefit from operational improvements and strategic growth initiatives.',
    interestedIndustries: ['Manufacturing', 'Industrial', 'Automotive'],
    preferredBusinessSize: 'large'
  }
];

const mockMatches = [
  {
    id: '1',
    buyerName: 'John Smith',
    businessName: 'TechCorp Solutions',
    status: 'in-negotiation' as const,
    lastActivity: '2 hours ago',
    matchDate: '2024-01-15'
  },
  {
    id: '2',
    buyerName: 'Sarah Johnson',
    businessName: 'Digital Marketing Pro',
    status: 'matched' as const,
    lastActivity: '1 day ago',
    matchDate: '2024-01-14'
  }
];

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedBuyerProfile, setSelectedBuyerProfile] = useState<BuyerProfile | null>(null);

  const getUserDisplayName = () => {
    if (!user) return 'User';
    if (user.type === 'buyer') {
      return (user.profile as any).name || 'Buyer';
    }
    return (user.profile as any).businessName || 'Seller';
  };

  const handleAccept = (profileId: string) => {
    const profile = mockBuyerProfiles.find(p => p.id === profileId);
    alert(`Connected with buyer ${profile?.name}! You can now start the acquisition process.`);
  };

  const handleReject = (profileId: string) => {
    const profile = mockBuyerProfiles.find(p => p.id === profileId);
    alert(`Buyer ${profile?.name} rejected. Looking for more matches...`);
  };

  const handleViewDetails = (profileId: string) => {
    const profile = mockBuyerProfiles.find(p => p.id === profileId);
    if (profile) {
      setSelectedBuyerProfile(profile);
    }
  };

  const handleBackToList = () => {
    setSelectedBuyerProfile(null);
  };

  const handleAcceptFromDetail = () => {
    if (selectedBuyerProfile) {
      alert(`Connected with buyer ${selectedBuyerProfile.name}! You can now start the acquisition process.`);
      setSelectedBuyerProfile(null);
    }
  };

  const handleRejectFromDetail = () => {
    if (selectedBuyerProfile) {
      alert(`Buyer ${selectedBuyerProfile.name} rejected. Looking for more matches...`);
      setSelectedBuyerProfile(null);
    }
  };

  // If viewing buyer details, show the detail component
  if (selectedBuyerProfile) {
    return (
      <DashboardContainer>
        <DetailViewContainer>
          <BuyerProfileDetail
            profile={selectedBuyerProfile}
            onAccept={handleAcceptFromDetail}
            onReject={handleRejectFromDetail}
            onBack={handleBackToList}
          />
        </DetailViewContainer>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <WelcomeSection>
        <WelcomeTitle>Welcome back, {getUserDisplayName()}!</WelcomeTitle>
        <WelcomeSubtitle>
          {user?.type === 'seller' 
            ? 'Find the perfect buyer for your business' 
            : 'Discover your next business opportunity'
          }
        </WelcomeSubtitle>
      </WelcomeSection>

      <Stats />

      <DashboardGrid>
        <Section>
          {user?.type === 'seller' ? (
            <>
              <SectionTitle>Potential Buyers</SectionTitle>
              {mockBuyerProfiles.map((profile) => (
                <BuyerProfileCard
                  key={profile.id}
                  profile={profile}
                  onAccept={() => handleAccept(profile.id)}
                  onReject={() => handleReject(profile.id)}
                  onViewDetails={() => handleViewDetails(profile.id)}
                />
              ))}
            </>
          ) : (
            <>
              <SectionTitle>Available Businesses</SectionTitle>
              <div style={{ 
                padding: theme.spacing.xl, 
                textAlign: 'center', 
                color: theme.colors.gray500 
              }}>
                <div style={{ fontSize: '48px', marginBottom: theme.spacing.md }}>🏢</div>
                <h3 style={{ marginBottom: theme.spacing.sm }}>No businesses available</h3>
                <p>Check back later for new business listings.</p>
              </div>
            </>
          )}
        </Section>

        <Section>
          <SectionTitle>Recent Activity</SectionTitle>
          <MatchesList matches={mockMatches} />
        </Section>
      </DashboardGrid>
    </DashboardContainer>
  );
};
