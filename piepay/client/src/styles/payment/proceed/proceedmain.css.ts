import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import theme from '@/styles/theme/theme';


export const paragraph = styleVariants({
    title:[{
        fontSize: '25px',
        fontWeight: 'bold',
        marginBottom: '10px',}],
    total:[{fontSize: '0.9rem', marginTop: '30px',color: theme.gray, marginBottom: '10px'}]

})



