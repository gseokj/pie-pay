import { globalStyle, style } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  height: '100%',
});

export const barContainer = style({
  display: 'flex',
  width: '100%',
  height: '10%',
  justifyContent: 'center',
});
