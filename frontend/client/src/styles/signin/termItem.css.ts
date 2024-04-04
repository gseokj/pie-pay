// styles.css.ts
import { style } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

export const termsItem = style({
  marginBottom: '16px',
});

export const originalCheckbox = style({
  opacity: 0,
  position: 'absolute',
});

export const customCheckbox = style({
  position: 'relative',
  paddingLeft: '30px',
  cursor: 'pointer',
  display: 'inline-block',
});

export const checkboxDesign = style({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '30px',
  width: '30px',
  backgroundColor: '#ccc',
  borderRadius: '50%',
  selectors: {
    [`${originalCheckbox}:checked + &`]: {
      backgroundColor: theme.blue,
    },
    [`${originalCheckbox}:checked + &:after`]: {
      content: '',
      position: 'absolute',
      display: 'block',
      left: '6px',
      top: '2px',
      width: '17px',
      height: '17px',
      border: 'solid white',
      borderWidth: '0 3px 3px 0',
      transform: 'rotate(45deg)',
    },
  },
});

export const dropdownButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  color: theme.gray,
});

export const termsContent = style({
  marginTop: '8px',
});

export const titleBox = style({
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid #ccc', // 아래 테두리 추가
  marginTop: '2rem',
  fontSize: '1.2rem',
});
