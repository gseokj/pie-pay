import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import theme from "@/styles/theme/theme";


export const participantContainer = style({
    position: 'sticky',
    overflowY: 'auto',
    paddingBottom: '100px',
    backgroundColor: theme.layout,

})
export const container = style({
    display: 'flex',
    marginBottom: '8px',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "white",
    borderRadius: '10px',
    overflow: 'auto',
    width: '100%',
    paddingRight: '3%'
})
export const button = style({

})

export const participantList = style({
    display: 'flex',

    width: '100%',
    alignItems: 'center',

})

export const backgroundSkyBlue = style({
    backgroundColor: theme.skyblue,
})

export const backgroundLightRed = style({
    backgroundColor: theme.lightred,
})

export const image = style({
    borderRadius: '15px',
    width: '3.2rem',
    height: '3.2rem',
    margin: '7px'
})

export const boxRight = style({
    width: '40%'
})



const baseStyle = { display: 'flex', justifyContent: 'end', alignItems: 'center' };

export const paymentStatus = styleVariants({
    agree: [{ ...baseStyle, color: theme.blue }],
    deny: [{ ...baseStyle, color: theme.red }],
    await: [{ ...baseStyle, color: theme.gray }],
});

globalStyle(`${paymentStatus.agree} > p, ${paymentStatus.deny} > p, ${paymentStatus.await} > p`, {
    marginRight: '0.4rem',
});

export const helpImage = style({
    transitionDuration: '300ms',
    ':hover':{
        scale:'125%'
    }
})


