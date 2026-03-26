export const COLORS = {
  // Primary palette
  background: '#0A0E21',
  surface: '#141830',
  surfaceLight: '#1C2140',
  card: '#1E2448',
  cardHover: '#252B55',

  // Accent colors
  primary: '#6C63FF',
  primaryLight: '#8B85FF',
  primaryDark: '#4F46E5',
  secondary: '#00D9FF',
  secondaryDark: '#00B8D9',
  accent: '#FF6B9D',

  // Semantic colors
  success: '#00E676',
  successDark: '#00C853',
  warning: '#FFD740',
  danger: '#FF5252',
  info: '#40C4FF',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#A0AEC0',
  textMuted: '#636E8A',
  textAccent: '#6C63FF',

  // Gradients
  gradientStart: '#6C63FF',
  gradientEnd: '#00D9FF',
  emergencyGradientStart: '#FF416C',
  emergencyGradientEnd: '#FF4B2B',
  calmGradientStart: '#0F2027',
  calmGradientMiddle: '#203A43',
  calmGradientEnd: '#2C5364',

  // Moods
  moodGreat: '#00E676',
  moodGood: '#69F0AE',
  moodNeutral: '#FFD740',
  moodBad: '#FF9100',
  moodTerrible: '#FF5252',

  // Tab bar
  tabBarBg: '#0D1127',
  tabBarBorder: '#1C2140',
  tabActive: '#6C63FF',
  tabInactive: '#636E8A',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const FONTS = {
  regular: { fontWeight: '400' },
  medium: { fontWeight: '500' },
  semibold: { fontWeight: '600' },
  bold: { fontWeight: '700' },
  extrabold: { fontWeight: '800' },
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  large: {
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  glow: {
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
};
