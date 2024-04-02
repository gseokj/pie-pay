import { style, keyframes, globalStyle } from '@vanilla-extract/css';
import theme from "@/styles/theme/theme";

// keyframes 정의
const pulse = keyframes({
  '0%': { transform: 'scale(0.6)', opacity: 1 },
  '50%': { transform: 'scale(1.2)', opacity: 0 },
  '100%': { transform: 'scale(0.6)', opacity: 1 },
});

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

// 스타일 정의
export const loaderContainer = style({
  position: 'absolute',
  backgroundColor:theme.layout,

  width: '100%',
  // Default width
  '@media': {
    'screen and (min-width: 768px)': {
      width: '100%',

    },
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  zIndex: 100,

});

export const loader = style({
  width: '70px',
  height: '70px',
  position: 'relative',
  '::before': {
    content: '',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    border: '6px solid #007bff',
    position: 'absolute',
    top: 0,
    left: 0,
    animation: `${pulse} 1s ease-in-out infinite`,
  },
  '::after': {
    content: '',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    border: '6px solid transparent',
    borderTopColor: '#007bff',
    position: 'absolute',
    top: 0,
    left: 0,
    animation: `${spin} 2s linear infinite`,
  },
});

export const loaderText = style({
  fontSize: '15px',
  marginTop: '20px',
  color: theme.blue,
  textAlign: 'center',
  fontWeight: 'bold',
  textTransform: 'uppercase',
});

// 추가적인 글로벌 스타일이나 조건부 스타일링은 다음과 같이 정의할 수 있습니다.
globalStyle('.loaded .loader-container', {
  display: 'none',
});

globalStyle('.loaded .content', {
  display: 'block',
});
