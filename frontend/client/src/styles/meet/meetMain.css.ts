import {globalStyle, style, styleVariants} from "@vanilla-extract/css";
import theme from "@/styles/theme/theme";


export const setCenterContainer = style({
    display: "flex",
    justifyContent: "center",
    marginBottom: "3rem",
});

export const setImageContainer = style({
    position: "relative"
});

globalStyle(`${setImageContainer} > button`, {
    position: "absolute",
    bottom: "-12%",
    right: "-16%",
});

export const setTableContainer = style({
    position: "relative",
})

globalStyle(`${setTableContainer} > button`, {
    position: "absolute",
    top: "30%",
    right: "2%"
})

export const setTableInner = style({
    display: "flex"
})

globalStyle(`${setTableInner} > p`, {
    whiteSpace: "nowrap",
    margin: "5% 2%"
})

globalStyle(`${setTableInner} > input`, {
    whiteSpace: "nowrap",
    margin: "5% 2%"
})

globalStyle(`${setTableInner} > h5`, {
    marginTop: "1%",
    width: "3rem",
    whiteSpace: "nowrap",
    color: theme.blueGray,
    fontSize: "0.8rem"
})

export const setTableAccordion = style({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
})

globalStyle(`${setTableAccordion} > h3`, {
    whiteSpace: "nowrap",
    margin: "5% 2%"
})

globalStyle(`${setTableAccordion} > .dropDownButton`, {
    position: "absolute",
    top: "16%",
    right: "1%"
})

export const setAccordionButtonContainer = style({
    transition: "all 1s"
})

export const opacity = styleVariants({
    none: [{
        transition: "all 0.4s",
        opacity: 0
    }],
    full: [{
        transition: "all 0.4s",
        opacity: 100
    }],
})

export const setInput = style({
    padding: "0",
    outline: "none",
    border: "none",
    selectors: {
        "&:focus": {
            outline: "none",
            border: "none",
            backgroundColor: theme.skyblue,
        }
    }
})
