import '@emotion/react';

declare module '@emotion/react' {
  export interface DefaultTheme {
    Typography: {
      Title: { fontSize: '6.4rem'; letterSpacing: '-2%'; fontWeight: '700' };
      Header1: { fontSize: '4.0rem'; letterSpacing: '-2%'; fontWeight: '700' };
      Header2: { fontSize: '2.4rem'; letterSpacing: '-2%'; fontWeight: '700' };
      Header3: { fontSize: '2.0rem'; letterSpacing: '-2%'; fontWeight: '700' };
      Body1: { fontSize: '2.0rem'; letterSpacing: '-2%'; fontWeight: '400' };
      Body2: { fontSize: '1.8rem'; letterSpacing: '-2%'; fontWeight: '400' };
      SubTitle: { fontSize: '1.8rem'; letterSpacing: '-2%'; fontWeight: '700' };
      Small1: { fontSize: '1.6rem'; fontWeight: '400' };
      Small2: { fontSize: '1.4rem'; fontWeight: '400' };
      Small3: { fontSize: '1.2rem'; fontWeight: '400' };
      PreTitle: { fontSize: '1.4rem'; letterSpacing: '2%'; fontWeight: '700' };
      ButtonText: { fontSize: '1.6rem'; letterSpacing: '3%'; fontWeight: '700' };
    };
    Colors: { Primary: '#4622E7' };
    Gray: {
      50: '#F9FAFB';
      100: '#F3F4F6';
      200: '#E5E7EB';
      300: '#D1D5DB';
      400: '#9CA3AF';
      500: '#6B7280';
      600: '#4B5563';
      700: '#374151';
      800: '#1F2937';
      900: '#111827';
      950: '#030712';
    };
  }
}
