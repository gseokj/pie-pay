import {style} from '@vanilla-extract/css'
import theme from '@/styles/theme/theme';


export const member = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '10px',

})

export const image = style({
    borderRadius: '15px',
    margin: '7px'
})


export const memberName = style({
    fontSize: '10px',
    fontWeight: 'bold'
})