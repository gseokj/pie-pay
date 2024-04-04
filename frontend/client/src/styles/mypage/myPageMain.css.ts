import { globalStyle, style } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

export const container = style({
  width: '100%',
  height: '80%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
});
