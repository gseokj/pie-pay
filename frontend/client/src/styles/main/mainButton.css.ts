import {style, styleVariants} from "@vanilla-extract/css";
import theme from "@/styles/theme/theme";

const buttonLayout = style({
    padding: "1.3rem 0",
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

const blueActive = style({
    transition: "all 0.25%",
    selectors: {
        '&:active': {
            backgroundColor: theme.blueActive
        }
    }
});

const skyBlueActive = style({
    transition: "all 0.25%",
    selectors: {
        '&:active': {
            backgroundColor: theme.skyblueActive
        }
    }
});



export const mainButton = styleVariants({
    defaultButton: [buttonLayout, buttonShadow],
    bottomButton: [buttonLayout, skyBlueActive, {
        marginBottom: "50%",
        backgroundColor: theme.skyblue,
        color: theme.blue
    }],
    fixedButton: [buttonLayout, buttonShadow, blueActive, {
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
    }],

    modalButton: [buttonLayout, blueActive],
    modalButtonDisabled: [buttonLayout, {
        cursor: "default",
        backgroundColor: theme.lightGray,
        color: "white"
    }],
    settingButton: [buttonLayout, {
        marginBottom: "0.75rem",
        backgroundColor: theme.skyblue,
        fontSize: "1rem",
        color: "black",
    }]
});

export const buttonFeatures = styleVariants({
    withIcon: [{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.4rem"
    }]
});

export const smallButton = style({
    padding: "0.4rem 1.6rem",
    borderRadius: "0.5rem",
    backgroundColor: theme.blue
})

export const cardButton = style({
    padding: "0.75rem 1.8rem",
    borderRadius: "30px",
    backgroundColor: theme.skyblue,
    selectors: {
        "&:active": {
            backgroundColor: theme.skyblueActive
        }
    }
})

export const paymentCardButton = style({
    fontSize: "0.9rem",
    padding: "0.6rem 1.5rem",
    borderRadius: "30px",
    backgroundColor: theme.skyblue,
    selectors: {
        "&:active": {
            backgroundColor: theme.skyblueActive
        }
    }
})