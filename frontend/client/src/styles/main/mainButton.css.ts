import {style, styleVariants} from "@vanilla-extract/css";
import theme from "@/styles/theme/theme";

const buttonLayout = style({
    padding: "1.1rem 0",
    borderRadius: "16px",
    backgroundColor: theme.blue,
    textAlign: "center",
    color: "white",
    fontSize: "1.25rem",
    width: "100%"
});

const buttonShadow = style({
    boxShadow: "0 8px 12px" + theme.shadow
});

export const mainButton = styleVariants({
    defaultButton: [buttonLayout, buttonShadow],
    bottomButton: [buttonLayout, {
        marginBottom: "50%",
        backgroundColor: theme.skyblue,
        color: theme.blue
    }],
    fixedButton: [buttonLayout, buttonShadow, {
        position: "fixed",
        bottom: "3rem",
        left: "2%",
        width: "96%",
        '@media': {
            'screen and (min-width: 768px)': {
                width: '38%',
                left: '31%'
            },
        },
    }],
});