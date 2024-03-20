import { style } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
});

export const textBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'end',
  height: '25%',
});

export const title = style({
  fontSize: '40px',
  fontWeight: 'bold',
});

export const description = style({
  paddingTop: '1vh',
  fontSize: '25px',
});

export const passwordWrapper = style({
  height: '20%',
  justifyContent: 'center',
  alignContent: 'center',
});

export const passwordScreen = style({
  display: 'flex',
});

export const dotWrapper = style({
  paddingRight: '15px',
});

export const dotBeforeInput = style({
  width: '27px',
  height: '27px',
  backgroundColor: theme.gray,
  borderRadius: '100px',
});

export const dotAfterInput = style({
  width: '27px',
  height: '27px',
  backgroundColor: theme.blue,
  borderRadius: '100px',
});
