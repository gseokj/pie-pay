import {globalStyle, style, styleVariants} from "@vanilla-extract/css";
import theme from "@/styles/theme/theme";


export const container = style({
    height: '100%',
})

export const box = style({
    height: '15%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',
    marginBottom: '1.5rem',
    justifyContent: 'space-around',
    ':hover':{
        scale: '105%'
    },

    transitionDuration: '300ms'
})

export const content = style({
  display: 'flex',
  justifyContent: 'space-between',

})

export const title = style({
    display:'flex',
    marginBottom: '1.0rem'
})

export const paragraph = style({
    color:theme.gray,fontSize: '0.8rem'
})

globalStyle(`${title} > p`, {
    display:'flex',fontWeight:'bold', marginLeft:'0.5rem'
});
