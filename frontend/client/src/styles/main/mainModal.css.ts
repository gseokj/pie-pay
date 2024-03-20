import {style} from "@vanilla-extract/css";
import theme from "@/styles/theme/theme";

export const modalLayout = style({
    position: "fixed",
    bottom: "0",
    left: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "44%",
    backgroundColor: "white",
    borderRadius: "2rem 2rem 0 0",
    boxShadow: "0 -8px 12px" + theme.shadow,
    width: "100%",
    '@media': {
        'screen and (min-width: 768px)': {
            width: '40%',
            left: '30%'
        },
    },
});

export const modalHandle = style({
    height: "0.4rem",
    width: "5rem",
    marginTop: "1rem",
    borderRadius: "0.2rem",
    backgroundColor: theme.blueGray,
    cursor: "pointer"
})