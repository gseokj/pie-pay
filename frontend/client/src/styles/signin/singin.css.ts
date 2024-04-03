import { globalStyle, style } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  height: '100%',
});

export const barContainer = style({
  display: 'flex',
  width: '100%',
  height: '10%',
  justifyContent: 'center',
});

export const contentContainer = style({
  height: '90%',
  display: 'flex',
  flexDirection: 'column',
});

export const title = style({
  height: '20%',

  fontWeight: 'bold',
  fontSize: '1.3rem',
});
export const subTitle = style({
  paddingLeft: '15px',
  fontSize: '1.2rem',
});

export const formContainer = style({
  height: '70%',

  display: 'flex',
  flexDirection: 'column',
});

export const itemWrapper = style({
  height: '25%',
});

export const itemName = style({
  height: '30%',
  color: '#494949',
});

export const inputBox = style({
  ':focus': {
    boxShadow: 'none !important',
    borderBottom: '2px solid #1892EB',
  },
  border: 'none',
  outline: 'none',
  borderBottom: '2px solid #ccc',
  width: '100%',
  height: '40%',
});

export const boxWrapper = style({
  display: 'flex',
});

export const numInputBox1 = style({
  ':focus': {
    boxShadow: 'none !important',
    borderBottom: '2px solid #1892EB',
  },
  border: 'none',
  outline: 'none',
  borderBottom: '2px solid #ccc',
  width: '40%',
  height: '40%',
  marginRight: '1.1rem',
});

export const numInputBox2Wrapper = style({
  width: '50%',
  height: '40%',
  display: 'flex',
  justifyContent: 'space-around',
});

export const numInputBox2 = style({
  ':focus': {
    boxShadow: 'none !important',
    borderBottom: '2px solid #1892EB',
  },
  paddingRight: '0',
  border: 'none',
  outline: 'none',
  borderBottom: '2px solid #ccc',
  width: '20%',
  height: '40%',
});

export const dot = style({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'black',
  borderRadius: '100px',
  width: '9px',
  height: '9px',
  marginTop: '10px',
});

export const minusBox = style({
  width: '11px',
  height: '1px',
  backgroundColor: 'black',
  marginTop: '20px',
  marginRight: '10px',
});

export const submitButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '10%',
  marginBottom: '2rem',
  borderRadius: '20px',
  backgroundColor: theme.blue,
  color: 'white',
  fontSize: '1.5rem',
});

export const timerContainer = style({
  height: '10%',
});

export const numberContainer = style({
  display: 'flex',
});

export const hiddenInput = style({
  opacity: 0,
  position: 'absolute',
  // width: 0,
  height: 0,
  border: 'none',
  padding: 0,
  margin: 0,
});

export const retryMent = style({
  display: 'flex',
  flexDirection: 'column',
  height: '10%',
  alignItems: 'flex-start',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  color: theme.gray,
  textDecoration: 'underline',
  textDecorationColor: theme.gray,
});

export const termsBox = style({
  height: '40%',
});

export const dropdownButton = style({
  marginLeft: 'auto', // 버튼을 오른쪽 끝으로 이동시킴
  color: theme.lightGray,
});

export const inputError = style({
  // 입력되지 않았을 때의 스타일
  border: '2px solid red',
  borderColor: 'red',
});

export const errorMent = style({
  // 입력되지 않았을 때의 스타일
  color: 'red',
  textDecoration: 'underline',
  textDecorationColor: 'red',
});
