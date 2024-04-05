import { style } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';

export const container = style({
    // Mobile width
    width: '100%',
    // Default width



    height: '100%',
    position: 'absolute',
    backgroundColor: theme.layout,
    padding: '0 20px 20px 20px',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex:10,


})