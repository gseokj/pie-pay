import {style} from "@vanilla-extract/css";
import theme from "@/styles/theme/theme";

export const MainButton = style({
    position: "fixed",
    bottom: "3rem",
    left: "2%",
    width: "96%",
    padding: "1.1rem 0",
    borderRadius: "16px",
    backgroundColor: theme.blue,
    textAlign: "center",
    color: "white",
    fontSize: "1.25rem",
    boxShadow: "0 8px 12px" + theme.shadow,
    '@media': {
        'screen and (min-width: 768px)': {
            width: '38%',
            left: '31%'
        },
    },
})