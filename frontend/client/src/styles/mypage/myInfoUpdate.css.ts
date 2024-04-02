import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: '80%',
  // top: 0,
  // right: 0,
  // bottom: 0,
  // left: 0,
  backgroundColor: 'white',
  zIndex: 5,
  padding: 4,
  alignItems: 'center',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft: '1,5rem',
  marginBottom: '1.5rem',
  width: '100%',
});

globalStyle(`${header} > p`, { fontWeight: 'bold', fontSize: '1.3rem' });
export const imageBox = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '0.7rem',
  height: '7rem',
  width: '7rem',
  position: 'relative',
  marginBottom: '2rem',
});

export const image = style({
  width: '100%',
  height: '100%',
  borderRadius: '10px',
});

export const imageUpdate = style({
  width: '50%',
  position: 'absolute',
  bottom: '-1.5rem',
  right: '-1.2rem',
  cursor: 'pointer',
});

export const textLineSection = style({
  width: '90%',
  height: '30%',
});

export const phoneContent = style({
  height: '40%',
  display: 'flex',
  marginTop: '7px',
});
globalStyle(`${phoneContent} > p`, {
  width: '17%',
  marginRight: '5px',
  color: theme.gray,
  fontSize: '0.7rem',
});
export const phoneBox = style({
  height: '30%',
  display: 'flex',
  marginTop: '15px',
  marginBottom: '15px',
});

const contentDefault = style({
  height: '20%',
  display: 'flex',
  marginTop: '7px',
});

const boxDefault = style({
  width: '90%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const content = styleVariants({
  nickname: [contentDefault, {}],
  email: [contentDefault, {}],
  phoneNumber: [contentDefault, {}],
});
globalStyle(
  `${content.nickname} > p, ${content.email} > p, ${content.phoneNumber} > p`,
  {
    width: '17%',
    marginRight: '10px',
    color: theme.gray,
    fontSize: '0.7rem',
    marginBottom: '20px',
  },
);

export const box = styleVariants({
  nickname: [boxDefault, {}],
  email: [boxDefault, {}],
  phoneNumber: [boxDefault, {}],
});
globalStyle(`${box.nickname} > p`, {
  display: 'flex',
  alignItems: 'center',
});

export const p = styleVariants({
  nickname: [{ fontWeight: 'bold' }],
  email: [{ marginTop: '15px', paddingBottom: '15px' }],
  phoneNumber: [{ marginTop: '15px', paddingBottom: '15px' }],
});

export const settingSection = style({
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const settingDropDownButton = style({
  display: 'flex',
  justifyContent: 'space-between',
});

globalStyle(`${settingDropDownButton} > div`, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '10px',
  marginBottom: '10px',
  cursor: 'pointer',
});

globalStyle(`${settingSection} > .btn`, {
  padding: '10px',
  marginBottom: '10px',
  backgroundColor: theme.lightgray,
  borderRadius: '10px',
});

export const menuList = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const menu = style({
  width: '100%',
  height: '3rem',
  marginTop: '1rem',
  borderRadius: '10px',
  backgroundColor: theme.lightGray,
});

export const inputStyle = style({
  border: 'none', // 테두리 제거
  outline: 'none', // 포커스 시 나타나는 아웃라인 제거
});
