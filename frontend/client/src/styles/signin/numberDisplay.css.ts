import { globalStyle, style } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

export const numberContainer = style({
  display: 'flex',
  width: '100%',
});

export const numberUl = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-around',
});

export const numberLi = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '15%',
});

export const number = style({
  display: 'flex',
  justifyContent: 'center',
  fontSize: '3rem',
  height: '4.5rem',
});

export const underLine = style({
  width: '100%',
  height: '4px',
  backgroundColor: theme.lightGray, // 기본 밑줄 색상
});

export const filledUnderLine = style({
  backgroundColor: theme.blue, // 값이 있을 때의 밑줄 색상
});
