import { DefaultTheme } from '@emotion/react';

export const theme: DefaultTheme = {
  Typography: {
    Title: { fontSize: '64px', letterSpacing: '-2%', fontWeight: '700' },
    Header1: { fontSize: '40px', letterSpacing: '-2%', fontWeight: '700' },
    Header2: { fontSize: '24px', letterSpacing: '-2%', fontWeight: '700' },
    Header3: { fontSize: '20px', letterSpacing: '-2%', fontWeight: '700' },
    Body1: { fontSize: '20px', fontWeight: '400' },
    Body2: { fontSize: '16px', fontWeight: '400' },
    Small1: { fontSize: '14px', fontWeight: '400' },
    Small2: { fontSize: '12px', fontWeight: '400' },
    Small3: { fontSize: '10px', fontWeight: '400' },
    PreTitle: { fontSize: '12px', letterSpacing: '2%', fontWeight: '700' },
    ButtonText: { fontSize: '16px', letterSpacing: '3%', fontWeight: '700' },
  },
  Colors: { Primary: '#5CADFF' },
  Gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },
};

export default theme;
