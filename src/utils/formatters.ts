/**
 * Format currency amounts
 */
export const formatCurrency = (
  amount: number,
  options: {
    currency?: string;
    notation?: 'standard' | 'compact';
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {}
): string => {
  const {
    currency = 'USD',
    notation = 'standard',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2
  } = options;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    minimumFractionDigits,
    maximumFractionDigits
  }).format(amount);
};

/**
 * Format compact currency (e.g., $1.2M, $500K)
 */
export const formatCompactCurrency = (amount: number): string => {
  return formatCurrency(amount, { notation: 'compact', maximumFractionDigits: 1 });
};

/**
 * Format numbers with thousands separators
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Format percentages
 */
export const formatPercentage = (
  value: number,
  options: { minimumFractionDigits?: number; maximumFractionDigits?: number } = {}
): string => {
  const { minimumFractionDigits = 0, maximumFractionDigits = 1 } = options;
  
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits
  }).format(value / 100);
};

/**
 * Format dates
 */
export const formatDate = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(dateObj);
};

/**
 * Format relative time (e.g., "2 hours ago", "3 days ago")
 */
export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return formatDate(dateObj);
  }
};

/**
 * Format file sizes
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format business size based on revenue
 */
export const formatBusinessSize = (revenue: number): string => {
  if (revenue < 1000000) return 'Small Business';
  if (revenue < 10000000) return 'Medium Business';
  return 'Large Enterprise';
};

/**
 * Format experience level
 */
export const formatExperience = (experience: string): string => {
  const mapping: Record<string, string> = {
    'first-time': 'First-Time Buyer',
    'experienced': 'Experienced Buyer',
    'serial': 'Serial Entrepreneur'
  };
  return mapping[experience] || experience;
};

/**
 * Format funding source
 */
export const formatFundingSource = (source: string): string => {
  const mapping: Record<string, string> = {
    'personal-savings': 'Personal Savings',
    'bank-loan': 'Bank Loan',
    'investors': 'Investor Funding',
    'combination': 'Multiple Sources'
  };
  return mapping[source] || source;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength - 3) + '...';
};

/**
 * Format phone numbers
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

/**
 * Format business valuation multiple
 */
export const formatValuationMultiple = (askingPrice: number, revenue: number): string => {
  if (revenue === 0) return 'N/A';
  const multiple = askingPrice / revenue;
  return `${multiple.toFixed(1)}x revenue`;
};

/**
 * Format time duration
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};
