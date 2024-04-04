import { globalStyle, keyframes, style, styleVariants } from '@vanilla-extract/css';
import theme from "@/styles/theme/theme";

export const container = style({
    display: 'flex',
    justifyContent: 'center'
})
export const tip = style({
    fontSize: '15px',
    color: theme.gray
})
export const content = style({
    width: '92%',

    // Default width
    '@media': {
        'screen and (min-width: 768px)': {
            width: '35%'
        },
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    position: 'fixed',
    bottom: '50px',
})

export const waitSection = style({
    width: '95%',
    display: 'flex',
    justifyContent: 'space-between'

})
const beforeBase = style({
    width: '48%',
    padding: '3%',
    borderRadius: '10px',
    fontWeight: 'bold',
});
const afterBase = style({
    width: '100%',
    padding: '3%',
    borderRadius: '10px',
    fontWeight: 'bold',
});
export const button = styleVariants({
    beforeinstead: [beforeBase, {
        background: theme.skyblue, color:theme.blue, ':hover':{ transform: 'translatey(-8px)',
            backgroundColor: theme.red, color:'white', transitionDuration: '400ms', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px'
        }}],
    beforeAgree: [beforeBase, {background: theme.blue, color:"white",':hover':{transform: 'translatey(-8px)',
            backgroundColor: 'white', color: theme.blue, transitionDuration: '400ms',boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px'}} ],
    afterinstead: [afterBase, {background: theme.skyblue, color:theme.blue,display:'flex' , justifyContent:'center',alignItems:'center',':hover':{transform: 'translatey(-5px)',
            backgroundColor: theme.blue, color: 'white', transitionDuration: '400ms',boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px'},    ':active': {
            transform: 'translateY(-1px)',
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
        },} ],
    afterAgree: [afterBase, {background: theme.lightgray, color:theme.lightbrown} ],

})


const waveAnimation = keyframes({
    '0%, 100%': { transform: 'rotate(0deg)' },
    '10%': { transform: 'rotate(-10deg)' },
    '20%, 40%, 60%': { transform: 'rotate(10deg)' },
    '30%, 50%, 70%': { transform: 'rotate(-10deg)' },
    '80%': { transform: 'rotate(8deg)' },
    '90%': { transform: 'rotate(-8deg)' },
});



export const hand = style({
    animation: `${waveAnimation} 4s ease-in-out infinite`,
    fontSize:'20px',


})

export const agreeSection = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
})

globalStyle(`${agreeSection} > p`,{marginBottom: '1.5rem'})
