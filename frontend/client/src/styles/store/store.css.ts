import {createVar, globalStyle, style, styleVariants} from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between'
})
export const baseContainer = style({
  width: '100%',
  height: '100%',
  position: 'fixed',
  justifyContent: 'center',

  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 50,

})
export const container = styleVariants({

  invisible: [baseContainer, {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  }],
  visible: [baseContainer, {
    pointerEvents: 'none',
    overflow: 'hidden',

  }]
})

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '60%',
  marginLeft: "5%",
})

export const paragraph = style({
  fontWeight: 'bold',
  fontSize: "25px"
})

export const ul = styleVariants({
  store: [{marginBottom: '10px', }],
  menu: [{display: 'flex', justifyContent: 'space-around',}]
})

globalStyle(`${ul.store} > li`, {
  paddingTop: '5px',
  paddingBottom: '5px',

});




