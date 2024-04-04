import { globalStyle, style } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

export const userInfoSection = style({
  width: '100%',
  height: '13%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.5rem',
  backgroundColor: 'white',
  borderRadius: '10px',
});

export const userInfoContent = style({
  display: 'flex',
  alignItems: 'center',
});

export const userImage = style({
  height: '3.5rem',
  width: '3.5rem',
  marginRight: '10px',
  borderRadius: '7px',
});

export const userInfoBox = style({
  height: '100%',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
});

export const cursorPointer = style({
  display: 'flex',
  height: '100%',
  alignContent: 'center',
});

globalStyle(`${userInfoBox} > p`, {
  fontWeight: 'bold',
});
