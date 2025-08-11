import { BuyerProfile, SellerProfile } from '../types';

export class MatchingService {
  /**
   * Calculate compatibility score between buyer and seller
   * Returns a score between 0 and 100
   */
  public static calculateCompatibility(buyer: BuyerProfile, seller: SellerProfile): number {
    let score = 0;
    let maxScore = 0;

    // Industry match (30% weight)
    maxScore += 30;
    if (buyer.industry === seller.industry || 
        buyer.interestedIndustries.includes(seller.industry) ||
        buyer.industry === 'Any') {
      score += 30;
    }

    // Investment range vs asking price (25% weight)
    maxScore += 25;
    if (seller.askingPrice >= buyer.investmentRange.min && 
        seller.askingPrice <= buyer.investmentRange.max) {
      score += 25;
    } else if (seller.askingPrice < buyer.investmentRange.max * 1.2) {
      // Slight flexibility
      score += 15;
    }

    // Business size preference (15% weight)
    maxScore += 15;
    const businessSize = this.categorizeBusinessSize(seller.revenue);
    if (buyer.preferredBusinessSize === businessSize || 
        buyer.preferredBusinessSize === 'any') {
      score += 15;
    }

    // Location proximity (10% weight)
    maxScore += 10;
    const locationScore = this.calculateLocationScore(buyer.location, seller.location);
    score += locationScore * 0.1;

    // Financial health (20% weight)
    maxScore += 20;
    const financialScore = this.assessFinancialHealth(seller);
    score += financialScore * 0.2;

    return Math.round((score / maxScore) * 100);
  }

  private static categorizeBusinessSize(revenue: number): 'small' | 'medium' | 'large' {
    if (revenue < 1000000) return 'small';
    if (revenue < 10000000) return 'medium';
    return 'large';
  }

  private static calculateLocationScore(buyerLocation: string, sellerLocation: string): number {
    // Simplified location scoring
    // In a real app, you'd use geolocation APIs
    const buyerState = buyerLocation.split(',').pop()?.trim();
    const sellerState = sellerLocation.split(',').pop()?.trim();
    
    if (buyerLocation === sellerLocation) return 10; // Same city
    if (buyerState === sellerState) return 7; // Same state
    return 5; // Different state
  }

  private static assessFinancialHealth(seller: SellerProfile): number {
    let healthScore = 0;

    // Profit margin assessment
    if (seller.profitMargin > 20) healthScore += 30;
    else if (seller.profitMargin > 10) healthScore += 20;
    else if (seller.profitMargin > 5) healthScore += 10;

    // Years in business
    if (seller.yearsInBusiness > 10) healthScore += 25;
    else if (seller.yearsInBusiness > 5) healthScore += 15;
    else if (seller.yearsInBusiness > 2) healthScore += 10;

    // Revenue to asking price ratio
    const revenueMultiple = seller.askingPrice / seller.revenue;
    if (revenueMultiple < 2) healthScore += 25; // Very reasonable
    else if (revenueMultiple < 3) healthScore += 15; // Reasonable
    else if (revenueMultiple < 5) healthScore += 10; // High but acceptable

    // Employee count relative to revenue
    const revenuePerEmployee = seller.revenue / Math.max(seller.employees, 1);
    if (revenuePerEmployee > 100000) healthScore += 20; // Efficient
    else if (revenuePerEmployee > 50000) healthScore += 15;
    else if (revenuePerEmployee > 25000) healthScore += 10;

    return Math.min(healthScore, 100);
  }

  /**
   * Filter potential matches based on user preferences
   */
  public static filterMatches<T extends BuyerProfile | SellerProfile>(
    profiles: T[],
    userProfile: BuyerProfile | SellerProfile,
    userType: 'buyer' | 'seller'
  ): T[] {
    if (userType === 'buyer') {
      const buyer = userProfile as BuyerProfile;
      return profiles.filter(profile => {
        const seller = profile as unknown as SellerProfile;
        
        // Basic filters
        if (seller.askingPrice > buyer.investmentRange.max * 1.2) return false;
        if (buyer.industry !== 'Any' && 
            !buyer.interestedIndustries.includes(seller.industry)) return false;
        
        return true;
      });
    } else {
      const seller = userProfile as SellerProfile;
      return profiles.filter(profile => {
        const buyer = profile as unknown as BuyerProfile;
        
        // Basic filters
        if (buyer.investmentRange.max < seller.askingPrice * 0.8) return false;
        if (buyer.industry !== 'Any' && 
            buyer.industry !== seller.industry &&
            !buyer.interestedIndustries.includes(seller.industry)) return false;
        
        return true;
      });
    }
  }

  /**
   * Sort matches by compatibility score
   */
  public static sortByCompatibility(
    matches: { profile: BuyerProfile | SellerProfile; score: number }[]
  ): { profile: BuyerProfile | SellerProfile; score: number }[] {
    return matches.sort((a, b) => b.score - a.score);
  }

  /**
   * Generate match insights
   */
  public static generateMatchInsights(
    buyer: BuyerProfile,
    seller: SellerProfile
  ): string[] {
    const insights: string[] = [];

    // Industry alignment
    if (buyer.industry === seller.industry) {
      insights.push(`Perfect industry match in ${seller.industry}`);
    } else if (buyer.interestedIndustries.includes(seller.industry)) {
      insights.push(`Good industry alignment with ${seller.industry}`);
    }

    // Investment alignment
    const askingPrice = seller.askingPrice;
    const midpoint = (buyer.investmentRange.min + buyer.investmentRange.max) / 2;
    
    if (askingPrice <= midpoint) {
      insights.push('Asking price is within comfortable budget range');
    } else if (askingPrice <= buyer.investmentRange.max) {
      insights.push('Asking price is at the upper end of budget');
    }

    // Financial health
    if (seller.profitMargin > 15) {
      insights.push(`Strong profit margin of ${seller.profitMargin}%`);
    }
    
    if (seller.yearsInBusiness > 8) {
      insights.push(`Established business with ${seller.yearsInBusiness} years of operation`);
    }

    // Experience match
    if (buyer.experience === 'first-time' && seller.yearsInBusiness > 5) {
      insights.push('Stable business suitable for first-time buyer');
    } else if (buyer.experience === 'serial' && seller.revenue > 1000000) {
      insights.push('Significant opportunity for experienced investor');
    }

    return insights;
  }
}

export const matchingService = MatchingService;
