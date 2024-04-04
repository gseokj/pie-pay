import { style } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

export const termContent = style({
  height: '100%',
});

export const scrollContent = style({
  maxHeight: '60%',
  overflowY: 'auto', // 세로 스크롤바가 필요할 때만 나타나도록 설정
});

export const termHeader = style({
  display: 'flex', // Flexbox 사용
  alignItems: 'center', // 항목들을 세로 중앙에 위치시킴
  height: '100%',
  width: '100%',
});

export const termTitle = style({
  fontWeight: 'bold',
  fontSize: '1.3rem',
});

export const originalCheckbox = style({
  opacity: 0,
  position: 'absolute',
});

export const customCheckbox = style({
  position: 'relative',
  cursor: 'pointer',
  display: 'inline-block',
  width: '10%',
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
export const styleLi = style({
  // 필요한 스타일 추가
});

export const dropdownButton = style({
  marginLeft: 'auto', // 버튼을 오른쪽 끝으로 이동시킴
  color: theme.lightGray,
});

export const titleBox = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '10px',
  paddingBottom: '10px',
  borderBottom: '1px solid #ccc', // 아래 테두리 추가
  fontSize: '1rem',
});

export const allTitleBox = style({
  width: '100%',
  marginTop: '1rem',
  fontSize: '1.1rem',
  display: 'flex',
});
