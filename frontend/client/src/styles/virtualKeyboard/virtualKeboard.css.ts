import { globalStyle, style } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

export const keyboardContainer = style({
  display: 'flex',
  width: '100%',
  height: '50%',
  flexWrap: 'wrap',
  alignContent: 'end',
});

export const number = style({
  display: 'flex',
  ':active': {
    backgroundColor: 'lightgray',
  },
  justifyContent: 'center',
  alignItems: 'center',
  width: '33.33%',
  height: '25%',
  fontWeight: 'bold',
  fontSize: '40px',
});

export const text = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ':active': {
    backgroundColor: 'lightgray',
  },
  width: '33.33%',
  height: '25%',
  textAlign: 'center',
  fontWeight: 'bold',
  verticalAlign: 'bottom',
  fontSize: '40px',
  color: theme.blueGray,
});
