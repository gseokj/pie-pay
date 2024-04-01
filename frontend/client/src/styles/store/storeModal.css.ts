import { createVar, globalStyle, style, styleVariants } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

export const background = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor:'black',
  opacity: 0.3
});

export const container = style({
  position: 'absolute',
  top: '40%',
  left: '25%',
  width: '50%',
  // Default width
  '@media': {
    'screen and (min-width: 768px)': {
      width: '40%',
      left: '30%',
    },
  },
})

