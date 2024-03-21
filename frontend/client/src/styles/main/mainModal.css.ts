import {globalStyle, style} from "@vanilla-extract/css";
import theme from "@/styles/theme/theme";
import {cardLayout} from "@/styles/main/cardLayout.css";

export const modalLayout = style({
    zIndex: 101,
    position: "fixed",
    bottom: "-60%",
    left: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "52.5%",
    backgroundColor: "white",
    borderRadius: "2rem 2rem 0 0",
    boxShadow: "0 -8px 12px" + theme.modalShadow,
    width: "100%",
    '@media': {
        'screen and (min-width: 768px)': {
            width: '40%',
            left: '30%'
        },
    },
    transition: "all 0.4s"
});

export const modalOn = style({
    bottom: "0"
})

export const modalContentLayout = style({
    padding: "10% 6%"
});

globalStyle(`${modalContentLayout} > h3`, {
    fontSize: "1.5rem",
    lineHeight: "1.8rem",
    marginBottom: "0.4rem"
});

globalStyle(`${modalContentLayout} > p`, {
    fontSize: "1rem",
    color: theme.gray
});

export const modalHandle = style({
    height: "0.4rem",
    width: "5rem",
    marginTop: "1rem",
    borderRadius: "0.2rem",
    backgroundColor: theme.skyblue,
    cursor: "pointer"
});

export const modalBackground = style({
    visibility: "hidden",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 100,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0)",
    "@media": {
        "screen and (min-width: 768px)": {
            width: "40%",
            left: "30%"
        }
    },
    transition: "all 0.4s",
});

export const modalBackgroundOn = style({
    backgroundColor: "rgba(0,0,0,0.25)",
    visibility: "visible"
})