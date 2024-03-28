// TelecomListModal.css.ts
import { style, keyframes } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

const slideUp = keyframes({
  from: {
    transform: 'translateY(100%)',
  },
  to: {
    transform: 'translateY(0)',
  },
});

const slideDownExit = keyframes({
  '0%': {
    transform: 'translateY(0)',
    // opacity: 1,
  },
  '100%': {
    transform: 'translateY(100%)',
    // opacity: 0,
  },
});

export const modalAnimation = style({
  padding: '24px',
  paddingTop: '40px',
  animation: `${slideUp} 0.5s ease-out forwards`,
});

export const modalContainerExit = style({
  padding: '24px',
  paddingTop: '40px',
  animation: `${slideDownExit} 0.5s ease-out forwards`,
});

export const modalContainer = style({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '50%',
  backgroundColor: 'white', // 배경색은 필요에 따라 조정
  borderTopLeftRadius: '16px', // 모달의 상단 모서리를 둥글게
  borderTopRightRadius: '16px', // 모달의 상단 모서리를 둥글게
  boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)', // 모달 상단에 그림자 효과 추가
  zIndex: '100' /* 모달이 다른 콘텐츠 위에 오도록 z-index 설정 */,
  animation: `${slideUp} 0.5s ease-out forwards`,
});

export const dragHandleWrapper = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});
export const dragHandle = style({
  height: '4px',
  width: '30%',
  backgroundColor: '#ccc',
  borderRadius: '2px',
  position: 'relative',
  top: '10px',
  marginBottom: '20px',
});

export const ulStyle = style({
  width: '100%',
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '100%',
});

export const liStyle = style({
  fontSize: '1.5rem',
  marginTop: '1rem',
  ':hover': {
    backgroundColor: '#f0f0f0', // 커서를 올렸을 때 배경색을 회색으로 변경
  },
});

export const title = style({
  fontSize: '1.7em',
  fontWeight: 'bold',
});

export const content = style({
  marginTop: '2rem',
});
