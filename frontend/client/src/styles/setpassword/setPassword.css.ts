import { style } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const textBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '15vh',
});

export const title = style({
  fontSize: '40px',
  fontWeight: 'bold',
});

export const description = style({
  paddingTop: '1vh',
  fontSize: '25px',
});

export const passwordScreen = style({
  display: 'flex',
  paddingTop: '7vh',
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
