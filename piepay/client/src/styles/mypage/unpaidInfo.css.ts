import { style } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

export const sectionStyle = style({
  display: 'flex',
  flexDirection: 'column',
  height: '90%',
  justifyContent: 'center',
  // paddingTop: '1rem',
  //   backgroundColor: theme.layout
  borderRadius: '1rem',
  //   boxShadow:'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
});

export const sectionContent = style({
  display: 'flex',
  flexDirection: 'column',
  height: '65%',
  justifyContent: 'space-around',
  padding: '1rem',
  backgroundColor: 'white',
  borderRadius: '1rem',
  boxShadow:
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
});

export const headerStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '0.5rem',
});

export const textStyle = style({
  marginRight: '0.75rem',
  fontSize: '0.875rem',
  color: '#4B5563',
});

export const buttonStyle = style({
  color: 'gray',
  fontSize: '0.75rem',
});

export const detailStyle = style({
  display: 'flex',
  alignItems: 'center',
});

export const imageStyle = style({
  width: '10%',
  borderRadius: '9999px',
  marginRight: '0.75rem',
});

export const actionButtonStyle = style({
  backgroundColor: 'skyblue',
  borderRadius: '1rem',
  width: '30%',
  padding: '0.25rem',
});

export const text = style({
  display: 'flex',
  flexDirection: 'row',
});

export const title = style({
  fontWeight: 'bold',
});
