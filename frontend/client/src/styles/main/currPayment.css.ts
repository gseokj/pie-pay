import {globalStyle, style, styleVariants} from "@vanilla-extract/css";
import theme from "@/styles/theme/theme";

export const container = style({
  width: '100%',
  height: '15%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '1rem',
  marginBottom: '1rem',
  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  backgroundColor: 'wthie',
  borderRadius: '10px',
  cursor:'pointer'
});


export const letters = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
})

const defaultP = style({
  fontWeight: 'bold',
  marginBottom: '0.3rem'
})

export const p = styleVariants({
  meet:[defaultP,{fontSize:'0.9rem'}],
  notice:[defaultP,{fontSize:'1.2rem'}]
})

export const image = style({
  position:'relative',
  top: '6%',
})

export const progress = style({
  position: 'relative',
  bottom: '22%',
})

export const time = style({
  fontSize:'0.8rem',
  color: theme.gray,
  marginLeft: '90%'
})