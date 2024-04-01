import { createVar, globalStyle, style, styleVariants } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
});
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

});
export const container = styleVariants({

  invisible: [baseContainer, {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  }],
  visible: [baseContainer, {
    pointerEvents: 'none',
    overflow: 'hidden',

  }],
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '60%',
  marginLeft: '5%',
  marginTop: '10%',
});

export const paragraph = style({
  fontWeight: 'bold',
  fontSize: '1.8rem',

});

export const ul = styleVariants({
  store: [{ marginBottom: '10px' }],
  menu: [{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }],
});

globalStyle(`${ul.store} > li`, {
  paddingTop: '5px',
  paddingBottom: '5px',


});


globalStyle(`${ul.menu} > li`, {
  fontSize: '0.8rem',
  width: '25%',

});


export const button = style({
  width: '100%',
  height: '8%',
  borderRadius: '8px',
  marginTop: '20px',
  color: 'white',
  backgroundColor: theme.blue,
});
