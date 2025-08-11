import React, { useState } from 'react';
import styled from 'styled-components';
import { BuyerProfile } from '../../types';
import { BuyerProfileCard } from './BuyerProfileCard';
import { BuyerProfileDetail } from './BuyerProfileDetail';
import { theme } from '../../styles/theme';

const BrowseContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
`;

const Title = styled.h1`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes['3xl']};
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
`;

const Subtitle = styled.p`
  color: ${theme.colors.gray500};
  font-size: ${theme.fontSizes.lg};
`;

const FilterBar = styled.div`
  background: white;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  margin-bottom: ${theme.spacing.xl};
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  align-items: center;
`;

const FilterSelect = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  background: white;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const ResultsCount = styled.div`
  color: ${theme.colors.gray600};
  font-size: ${theme.fontSizes.sm};
  margin-left: auto;
`;

const ProfilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: ${theme.spacing.lg};
`;

// Mock data - same as in Dashboard
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
    bio: 'Experienced technology executive with 15+ years in the industry. Looking to acquire a profitable SaaS business with strong recurring revenue and growth potential.',
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
    bio: 'Healthcare professional with 12 years of experience in medical practice management. Looking to acquire a medical practice or healthcare services business.',
    interestedIndustries: ['Healthcare', 'Medical Services'],
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
    bio: 'Serial entrepreneur with 20+ years of experience in manufacturing and operations. Successfully acquired and scaled 3 manufacturing businesses.',
    interestedIndustries: ['Manufacturing', 'Industrial'],
    preferredBusinessSize: 'large'
  }
];

export const BrowseBuyers: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<BuyerProfile | null>(null);
  const [industryFilter, setIndustryFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');

  const filteredProfiles = mockBuyerProfiles.filter(profile => {
    if (industryFilter && profile.industry !== industryFilter) return false;
    if (experienceFilter && profile.experience !== experienceFilter) return false;
    return true;
  });

  const handleViewDetails = (profileId: string) => {
    const profile = mockBuyerProfiles.find(p => p.id === profileId);
    if (profile) {
      setSelectedProfile(profile);
    }
  };

  const handleBackToList = () => {
    setSelectedProfile(null);
  };

  const handleAccept = (profileId?: string) => {
    const profile = selectedProfile || mockBuyerProfiles.find(p => p.id === profileId);
    alert(`Connected with buyer ${profile?.name}! You can now start the acquisition process.`);
    if (selectedProfile) setSelectedProfile(null);
  };

  const handleReject = (profileId?: string) => {
    const profile = selectedProfile || mockBuyerProfiles.find(p => p.id === profileId);
    alert(`Buyer ${profile?.name} rejected. Looking for more matches...`);
    if (selectedProfile) setSelectedProfile(null);
  };

  if (selectedProfile) {
    return (
      <BrowseContainer>
        <BuyerProfileDetail
          profile={selectedProfile}
          onAccept={() => handleAccept()}
          onReject={() => handleReject()}
          onBack={handleBackToList}
        />
      </BrowseContainer>
    );
  }

  return (
    <BrowseContainer>
      <Header>
        <Title>Browse Potential Buyers</Title>
        <Subtitle>Find the perfect buyer for your business</Subtitle>
      </Header>

      <FilterBar>
        <FilterSelect 
          value={industryFilter} 
          onChange={(e) => setIndustryFilter(e.target.value)}
        >
          <option value="">All Industries</option>
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Retail">Retail</option>
        </FilterSelect>

        <FilterSelect 
          value={experienceFilter} 
          onChange={(e) => setExperienceFilter(e.target.value)}
        >
          <option value="">All Experience Levels</option>
          <option value="first-time">First-Time Buyer</option>
          <option value="experienced">Experienced</option>
          <option value="serial">Serial Entrepreneur</option>
        </FilterSelect>

        <ResultsCount>
          {filteredProfiles.length} buyer{filteredProfiles.length !== 1 ? 's' : ''} found
        </ResultsCount>
      </FilterBar>

      <ProfilesGrid>
        {filteredProfiles.map((profile) => (
          <BuyerProfileCard
            key={profile.id}
            profile={profile}
            onAccept={() => handleAccept(profile.id)}
            onReject={() => handleReject(profile.id)}
            onViewDetails={() => handleViewDetails(profile.id)}
          />
        ))}
      </ProfilesGrid>
    </BrowseContainer>
  );
};
