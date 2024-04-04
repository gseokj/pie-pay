import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '1rem',
  backgroundColor: 'white',
  borderRadius: '1rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginBottom: '0.75rem',
});

export const topRow = style({
  display: 'flex',
});

export const createdAtStyle = style({
  marginRight: '0.75rem',
  fontSize: '0.875rem',
  color: '#6B7280',
});

export const status = style({
  color: '#EF4444',
  fontWeight: 'bold',
  fontSize: '0.875rem',
});

export const profileSection = style({
  display: 'flex',
  alignItems: 'center',
});

export const profileImage = style({
  width: '10%',
  borderRadius: '9999px',
  marginRight: '0.75rem',
});

export const nameStyle = style({
  fontWeight: 'bold',
});

export const bottomRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const amountStyle = style({
  fontWeight: 'bold',
});

export const settleButton = style({
  backgroundColor: '#7DD3FC',
  borderRadius: '1.25rem',
  padding: '0.25rem',
  width: '30%',
});
