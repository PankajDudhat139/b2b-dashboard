// src/types/index.ts
export interface User {
  id: string;
  email: string;
  type: 'buyer' | 'seller';
  profile: BuyerProfile | SellerProfile;
  createdAt: Date;
  isOnboardingComplete: boolean;
}

export interface BuyerProfile {
  id: string;
  name: string;
  industry: string;
  investmentRange: {
    min: number;
    max: number;
  };
  experience: 'first-time' | 'experienced' | 'serial';
  location: string;
  timeline: string;
  fundingSource: 'personal-savings' | 'bank-loan' | 'investors' | 'combination';
  avatar?: string;
  bio: string;
  interestedIndustries: string[];
  preferredBusinessSize: 'small' | 'medium' | 'large' | 'any';
}

export interface SellerProfile {
  id: string;
  businessName: string;
  industry: string;
  revenue: number;
  askingPrice: number;
  location: string;
  yearsInBusiness: number;
  employees: number;
  description: string;
  profitMargin: number;
  reasonForSelling: string;
  assets: string[];
  businessModel: string;
}

export interface Match {
  id: string;
  buyerId: string;
  sellerId: string;
  status: 'pending' | 'matched' | 'in-negotiation' | 'completed' | 'rejected';
  createdAt: Date;
  messages: Message[];
  currentStep: number;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'document' | 'system';
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  fields: FormField[];
}

export interface FormField {
  name: string;
  type: 'text' | 'number' | 'select' | 'range' | 'textarea' | 'multiselect';
  label: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
}

export interface AcquisitionStep {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  aiFeature: {
    title: string;
    description: string;
  };
  requiredDocuments?: string[];
  estimatedDuration?: string;
}
export interface DocumentAnalysis { 
    revenue: string;
    profitMargin: string;
    riskScore: string;
    revenueGrowth: string;
    keyInsights: string[];
}
