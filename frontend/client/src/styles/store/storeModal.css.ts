import { createVar, globalStyle, style, styleVariants } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

export const background = style({
  position: "absolute",
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  backgroundColor: 'black',
  opacity: 0.3,

});
export const container = style({
// Mobile width
  position: "absolute",
  width: '60%',
  top: '30%',
  left: '18%',


  // Default width
  '@media': {
    'screen and (min-width: 768px)': {
      width: '80%',
      left: '10%'
    },
  },


});
