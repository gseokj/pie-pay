import { globalStyle, style } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

export const accountSection = style({
  height: '25%',
});

export const title = style({
  fontWeight: 'bold',
});

globalStyle(`${accountSection} > p`, {
  fontWeight: 'bold',
  marginBottom: '10px',
});

export const accountContent = style({
  display: 'flex',
  height: '80%',
  justifyContent: 'space-between',
});

export const accountCurrBox = style({
  flex: 1,
});
export const accountAddBox = style({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '0.75rem',
  backgroundColor: theme.skyblue,
  borderRadius: '1rem',
  padding: '0.5rem',
  justifyContent: 'center',
  alignItems: 'center',
});

globalStyle(`${accountAddBox} > p`, {
  marginTop: '0.25rem',
  color: theme.blue,
  fontSize: '0.75rem',
});
