import {style} from '@vanilla-extract/css'
import theme from '@/styles/theme/theme';

export const container = style({
    width: "100%"
})
export const header = style({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
})

export const title = style({
    fontWeight: 'bold',
    fontSize: '25px'
})
export const selectedContainer = style({
    display: 'flex',
    marginTop: '15px',
    marginBottom: '15px'

})

export const image = style({
    borderRadius: '15px',
    margin: '7px'
})

export const hr = style({
    border: 0,
    height: '2px',
    background: theme.line,
    marginBottom: '20px',
})



