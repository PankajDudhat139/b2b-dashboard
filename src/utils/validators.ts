/**
 * Email validation
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password validation
 */
export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Phone number validation
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$|^\d{10}$/;
  const cleaned = phone.replace(/\D/g, '');
  return phoneRegex.test(phone) || cleaned.length === 10;
};

/**
 * URL validation
 */
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Number validation with min/max
 */
export const isValidNumber = (
  value: number,
  options: { min?: number; max?: number } = {}
): boolean => {
  if (isNaN(value)) return false;
  if (options.min !== undefined && value < options.min) return false;
  if (options.max !== undefined && value > options.max) return false;
  return true;
};

/**
 * Business name validation
 */
export const isValidBusinessName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 100;
};

/**
 * Investment range validation
 */
export const validateInvestmentRange = (min: number, max: number): string | null => {
  if (min <= 0) return 'Minimum investment must be greater than 0';
  if (max <= 0) return 'Maximum investment must be greater than 0';
  if (min >= max) return 'Maximum investment must be greater than minimum';
  if (max > 100000000) return 'Maximum investment seems unrealistic';
  return null;
};

/**
 * Revenue validation
 */
export const validateRevenue = (revenue: number): string | null => {
  if (revenue < 0) return 'Revenue cannot be negative';
  if (revenue === 0) return 'Revenue must be greater than 0';
  if (revenue > 1000000000) return 'Revenue seems unrealistic';
  return null;
};

/**
 * Asking price validation
 */
export const validateAskingPrice = (askingPrice: number, revenue: number): string | null => {
  if (askingPrice <= 0) return 'Asking price must be greater than 0';
  if (askingPrice > 1000000000) return 'Asking price seems unrealistic';
  
  const multiple = askingPrice / revenue;
  if (multiple > 10) return 'Asking price seems high relative to revenue';
  if (multiple < 0.5) return 'Asking price seems low relative to revenue';
  
  return null;
};

/**
 * Profit margin validation
 */
export const validateProfitMargin = (margin: number): string | null => {
  if (margin < -100) return 'Profit margin cannot be less than -100%';
  if (margin > 100) return 'Profit margin cannot exceed 100%';
  return null;
};

/**
 * Years in business validation
 */
export const validateYearsInBusiness = (years: number): string | null => {
  if (years < 0) return 'Years in business cannot be negative';
  if (years > 150) return 'Years in business seems unrealistic';
  return null;
};

/**
 * Employee count validation
 */
export const validateEmployeeCount = (count: number): string | null => {
  if (count < 0) return 'Employee count cannot be negative';
  if (count > 1000000) return 'Employee count seems unrealistic';
  return null;
};

/**
 * File validation
 */
export const validateFile = (
  file: File,
  options: {
    maxSize?: number; // in bytes
    allowedTypes?: string[];
  } = {}
): string | null => {
  const { maxSize = 10 * 1024 * 1024, allowedTypes = [] } = options; // 10MB default
  
  if (file.size > maxSize) {
    return `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`;
  }
  
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`;
  }
  
  return null;
};

/**
 * Required field validation
 */
export const isRequired = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return !isNaN(value);
  if (Array.isArray(value)) return value.length > 0;
  return Boolean(value);
};

/**
 * Bio/description validation
 */
export const validateBio = (bio: string, options: { minLength?: number; maxLength?: number } = {}): string | null => {
  const { minLength = 50, maxLength = 2000 } = options;
  
  if (bio.trim().length < minLength) {
    return `Bio must be at least ${minLength} characters long`;
  }
  
  if (bio.trim().length > maxLength) {
    return `Bio must be less than ${maxLength} characters long`;
  }
  
  return null;
};

/**
 * Comprehensive form validation
 */
export const validateForm = <T extends Record<string, any>>(
  data: T,
  rules: Record<keyof T, (value: any) => string | null>
): { isValid: boolean; errors: Partial<Record<keyof T, string>> } => {
  const errors: Partial<Record<keyof T, string>> = {};
  
  for (const [field, validator] of Object.entries(rules)) {
    const error = validator(data[field as keyof T]);
    if (error) {
      errors[field as keyof T] = error;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
