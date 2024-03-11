import {style} from "@vanilla-extract/css";
import theme from "@/styles/theme/theme";

export const memberContent = style({
    display: 'flex',
    marginBottom: '8px',
    justifyContent: 'space-between',
    backgroundColor: "white",
    borderRadius: "10px"
})


export const memberList = style({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    // backgroundColor: theme.skyblue,
})

export const image = style({
    borderRadius: '15px',
    margin: '7px'
})


export const memberName = style({
    fontSize: '10px',
    fontWeight: 'bold'
})

export const checkbox = style({
    marginRight: '10px'
})

