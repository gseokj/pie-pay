import theme from "@/styles/theme/theme";
import {style} from "@vanilla-extract/css";

export const categoryLayout = style({
    padding: "0.5rem 0.5rem",
    borderRadius: "16px",
    backgroundColor: "white",
    textAlign: "center",
    color: theme.blueGray,
    fontSize: "1rem",
    boxShadow: "0 8px 12px" + theme.shadow,
    position: "fixed",
    bottom: "1.5rem",
    left: "2%",
    width: "96%",
    '@media': {
        'screen and (min-width: 768px)': {
            width: '38%',
            left: '31%'
        },
    },
    display: "flex",
    justifyContent: "space-between",
    gap: "0.5rem"
});

export const categoryButton = style({
    padding: "1rem 0",
    borderRadius: "16px",
    textAlign: "center",
    width: "100%",
    transition: "all 0.25s ease-in-out"
})

export const categoryButtonActive = style({
    backgroundColor: theme.blue,
    color: "white"
})