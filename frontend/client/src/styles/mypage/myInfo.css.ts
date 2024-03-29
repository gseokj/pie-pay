import { globalStyle, style } from '@vanilla-extract/css';
import theme from "@/styles/theme/theme";

export const userInfoSection = style({
  width: '100%',
  height: '13%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.5rem',
  backgroundColor: 'white',
  borderRadius: '10px'
})

export const userInfoContent = style({
  display: 'flex',
  alignItems: 'center',

})

export const userImage = style({
  height: '3rem',
  marginRight: '10px',
  borderRadius: '7px',
})

export const userInfoBox = style({
  display: 'flex',
  flexDirection: 'column'
})

globalStyle(`${userInfoBox} > p`,{
  fontWeight:'bold'
});
