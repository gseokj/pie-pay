import { style } from '@vanilla-extract/css';
import theme from "@/styles/theme/theme";


export const container = style({
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '7%',
    marginRight: '7%',
    height: '9%',
    backgroundColor: theme.layout,
});

export const navigation = style({
    display: 'flex',
    justifyContent: 'space-around',
})

export const headerLogo = style({
    height: "40%",
    width: "100%",
    textAlign: "start"
})

export const buttonContainer = style({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.8rem",
    marginLeft: "1.5rem"
})
