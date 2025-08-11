import { useState, useEffect } from 'react';
import { BuyerProfile, SellerProfile } from '../types';

interface UseMatchingReturn {
  potentialMatches: (BuyerProfile | SellerProfile)[];
  isLoading: boolean;
  error: string | null;
  refreshMatches: () => void;
}

export const useMatching = (userType: 'buyer' | 'seller'): UseMatchingReturn => {
  const [potentialMatches, setPotentialMatches] = useState<(BuyerProfile | SellerProfile)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data based on user type
      if (userType === 'seller') {
        // Return buyer profiles for sellers
        const mockBuyers: BuyerProfile[] = [
          {
            id: '1',
            name: 'John Smith',
            industry: 'Technology',
            investmentRange: { min: 500000, max: 2000000 },
            experience: 'experienced',
            location: 'San Francisco, CA',
            timeline: 'Within 6 months',
            fundingSource: 'combination',
            bio: 'Experienced technology executive with 15+ years in the industry.',
            interestedIndustries: ['Technology', 'SaaS'],
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
            bio: 'Healthcare professional looking to acquire a medical practice.',
            interestedIndustries: ['Healthcare', 'Medical Services'],
            preferredBusinessSize: 'small'
          }
        ];
        setPotentialMatches(mockBuyers);
      } else {
        // Return seller profiles for buyers
        const mockSellers: SellerProfile[] = [
          {
            id: '1',
            businessName: 'TechCorp Solutions',
            industry: 'Technology',
            revenue: 1500000,
            askingPrice: 3000000,
            location: 'San Francisco, CA',
            yearsInBusiness: 8,
            employees: 25,
            description: 'Established SaaS company with strong recurring revenue.',
            profitMargin: 22,
            reasonForSelling: 'Retirement',
            assets: ['Software IP', 'Customer Database', 'Office Equipment'],
            businessModel: 'SaaS'
          }
        ];
        setPotentialMatches(mockSellers);
      }
    } catch (err) {
      setError('Failed to fetch matches');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshMatches = () => {
    fetchMatches();
  };

  useEffect(() => {
    fetchMatches();
  }, [userType]);

  return {
    potentialMatches,
    isLoading,
    error,
    refreshMatches
  };
};
