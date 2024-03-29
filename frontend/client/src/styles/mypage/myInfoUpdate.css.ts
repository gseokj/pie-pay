import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import theme from "@/styles/theme/theme";

export const container = style({
  display:'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: 'white',
  zIndex: 5,
  padding: 4,
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft: '1,5rem',
  marginBottom: '1.5rem'
})

globalStyle(`${header} > p`,{fontWeight: 'bold', fontSize: '1.3rem'})
export const imageBox = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '0.7rem',
})

export const image = style({
  width: "22%",
  borderRadius: '10px'
})

export const imageUpdate = style({
  width: '15%',
  position: 'relative',
  bottom: '1.2rem',
  left: '1.9rem',
  cursor: 'pointer'
})

export const textLineSection = style({
  height: '30%',
})




export const phoneContent = style({
  height: '40%',
  display: 'flex',
  marginTop: '7px'
})
globalStyle(`${phoneContent} > p`,{
  width: '17%',
  marginRight: '5px',
  color: theme.gray,
  fontSize: '0.7rem'
});
export const phoneBox = style({
  height: '30%',
  display: 'flex',
  marginTop: '15px',
  marginBottom: '15px',

})


const contentDefault = style({
  height: '20%',
  display: 'flex',
  marginTop: '7px'
})


const boxDefault = style({
  width: '90%',
  display: 'flex',
  justifyContent: 'space-between'
})



export const content = styleVariants({
  nickname: [contentDefault,{}],
  email: [contentDefault,{}],
  phoneNumber: [contentDefault,{}],
})
globalStyle(`${content.nickname} > p, ${content.email} > p, ${content.phoneNumber} > p`,{
  width: '17%',
  marginRight: '10px',
  color: theme.gray,
  fontSize: '0.7rem'
});


export const box = styleVariants({
  nickname: [boxDefault,{}],
  email: [boxDefault,{}],
  phoneNumber: [boxDefault,{}],
})
globalStyle(`${box.nickname} > p`,{
  display: 'flex',
  alignItems: 'center'
})


export const p = styleVariants({
  nickname: [{fontWeight:'bold'}],
  email: [{marginTop:'15px',paddingBottom:'15px'}],
  phoneNumber: [{marginTop:'15px',paddingBottom:'15px'}],
})


export const settingSection = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

export const settingDropDownButton = style({
  display: 'flex',
  justifyContent: 'space-between',

})

globalStyle(`${settingDropDownButton} > div`,{
  display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px',marginBottom:'10px',cursor:'pointer'
})

globalStyle(`${settingSection} > .btn`,{
  padding:'10px',marginBottom:'10px',backgroundColor:theme.lightgray,borderRadius:'10px'
})

