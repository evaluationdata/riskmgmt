/**
 * Application Configuration
 * Centralized configuration for the Healthcare Claims Management System
 */

export const CONFIG = {
  // API Configuration
  GOOGLE_SHEETS_API_KEY: process.env.VITE_GOOGLE_SHEETS_API_KEY || '',
  SHEET_ID: process.env.VITE_SHEET_ID || '',
  
  // Application Settings
  APP_NAME: 'Gestione Sinistri Sanitari',
  APP_VERSION: '2.0.0',
  REGULATION: 'D.M. 232/2023',
  
  // Sync Configuration
  SYNC_INTERVAL: 5 * 60 * 1000, // 5 minutes
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
  
  // UI Configuration
  ITEMS_PER_PAGE: 20,
  MODAL_ANIMATION_DURATION: 300,
  NOTIFICATION_DURATION: 3000,
  
  // Legal Configuration
  NOTIFICATION_DAYS: 45, // Art. 13 L. 24/2017 notification requirement
  MAX_CLAIM_AMOUNT: 10000000, // 10 million euros
  
  // Debugging
  DEBUG: process.env.NODE_ENV === 'development',
  LOG_LEVEL: 'info', // 'debug', 'info', 'warn', 'error'
  
  // Feature Flags
  FEATURES: {
    OFFLINE_MODE: true,
    EXPORT_CSV: true,
    EXPORT_PDF: true,
    PRINT_SUPPORT: true,
    ADVANCED_STATISTICS: true,
    CVS_MANAGEMENT: true,
    CALENDAR_INTEGRATION: true,
  },
};

/**
 * Get environment-specific configuration
 */
export function getConfig(key, defaultValue = null) {
  const keys = key.split('.');
  let value = CONFIG;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return defaultValue;
    }
  }
  
  return value;
}
