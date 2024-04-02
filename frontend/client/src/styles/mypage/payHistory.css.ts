import { style } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  height: '90%',
  justifyContent: 'flex-start',
  //   paddingTop: '1rem',
  //   backgroundColor: 'white',
  borderRadius: '1rem',
  //   boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  height: '60%',
  justifyContent: 'space-around',
  padding: '1rem',
  backgroundColor: 'white',
  borderRadius: '1rem',
  boxShadow:
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '0.5rem',
});

export const headerText = style({
  fontWeight: 'bold',
  fontSize: '1.125rem',
});

export const moreButton = style({
  color: '#6B7280',
  fontSize: '0.75rem',
});

export const detail = style({
  display: 'flex',
});

export const detailText = style({
  marginRight: '0.75rem',
  fontSize: '0.875rem',
  color: '#4B5563',
});

export const statusText = style({
  fontSize: '0.875rem',
  color: '#10B981',
});

export const mainText = style({
  fontWeight: 'bold',
  fontSize: '0.875rem',
});

export const storeName = style({
  fontWeight: 'bold',
  fontSize: '1.125rem',
});

export const amountText = style({
  display: 'flex',
  paddingRight: '10px',
  justifyContent: 'end',
  width: '100%',
  fontWeight: 'bold',
  fontSize: '1.125rem',
});
