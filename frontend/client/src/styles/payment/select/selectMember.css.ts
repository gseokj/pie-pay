import { style } from '@vanilla-extract/css'
import theme from '@/styles/theme/theme';

export const container = style({
    width: "100%",
})
export const contentContainer = style({

})
export const progress = style({
    // Mobile width
    width: '100%',

    // Default width
    '@media': {
        'screen and (min-width: 768px)': {
            width: '40%',
            left: '30%',
        },
    },
    position: 'sticky',
    zIndex: 1,
    backgroundColor: theme.layout,
    top: 0,


})

export const headerContainer = style({
    width: '100%',
    position: 'sticky',
    backgroundColor: theme.layout,
    paddingLeft: '15px',
    paddingRight: '15px',


})

export const title = style({
    fontWeight: 'bold',
    fontSize: '25px'
})

export const image = style({
    borderRadius: '20px',
    margin: '7px'
})

export const hr = style({
    border: 0,
    height: '2px',
    background: theme.line,
    marginBottom: '20px',
})
export const listHeaderContainer = style({
    zIndex: 1,
    top: 32,
    position: 'sticky',
    backgroundColor: theme.layout,
    opacity: '80%'
})


export const submitButton = style({
    width: '90%',
    height: '10%',
    left: '5%',
    color: 'white',
    transitionDuration: '300ms',
    // Default width
    '@media': {
        'screen and (min-width: 768px)': {
            width: '30%',
            left: '35%'
        },
    },
    background: theme.blue,
    alignItems: 'center',
    borderRadius: '10px',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    bottom: '30px',

    fontWeight: 'bold',
    ':hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    },
    ':active': {
        transform: 'translateY(-1px)',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
    },
    selectors: {
        '&::after': {
            content: '""',

            height: '100%',
            width: '100%',
            borderRadius: '10px',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,
            transition: 'all .4s',
            backgroundColor: theme.blue,
        },
        '&:hover::after': {
            transform: 'scaleX(1.4) scaleY(1.6)',
            opacity: 0,
        },
    },
})
