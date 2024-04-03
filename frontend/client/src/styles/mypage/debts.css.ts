// styles.css.ts
import { style } from '@vanilla-extract/css';
import theme from '../theme/theme';

export const container = style({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: 'white',
  padding: '1rem',
  zIndex: 50,
});

export const articleStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '1.25rem',
});

export const sectionStyle = style({
  height: '18%',
});

export const flexColumn = style({
  display: 'flex',
  flexDirection: 'column',
});

export const title = style({
  fontWeight: 'bold',
});

export const totalBox = style({
  display: 'flex',
  padding: '1.25rem',
  backgroundColor: '#ffffff',
  boxShadow:
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // Tailwind의 shadow-2xl과 대응
  borderRadius: '0.75rem',
  marginBottom: '1.25rem',
});

export const totalContent = style({
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
});

export const totalFont = style({
  color: theme.gray,
});

export const totalAmount = style({
  fontWeight: 'bold',
  fontSize: '1.25rem',
});

export const historySection = style({
  display: 'flex',
  flexWrap: 'nowrap',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginBottom: '0.5rem',
});

export const sortSection = style({
  display: 'flex',
  color: theme.gray,
  justifyContent: 'end',
});

export const sortContent = style({
  marginLeft: '0.75rem',
});

export const historyLists = style({
  display: 'flex',
  flexWrap: 'nowrap',
  flexDirection: 'column',
});
