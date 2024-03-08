import { style } from '@vanilla-extract/css';
import theme from "./theme/theme"

export const container = style({
    // Mobile width
    width: '100%',


    // Default width
    '@media': {
        'screen and (min-width: 768px)': {
            width: '40%'
        },
    },
    backgroundColor: `${theme.layout}`
});


