import {globalStyle, style} from "@vanilla-extract/css";
import theme from "@/styles/theme/theme";

export const timeStandardLayout = style({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "2.2%",
});

globalStyle(`${timeStandardLayout} > h2`, {
    fontSize: "1.4rem",
});

export const indexCard = style({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    marginBottom: "2.2%",
    padding: "4% 6%",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 8px 12px" + theme.shadow,
    gap: "1.2rem"
});

export const doughnutInner = style({
    display: "flex",
    alignItems: "center",
    gap: "1rem"
});

export const doughnutBox = style({
    width: "50%"
});

export const amountBox = style({
    width: "100%",
    textAlign: "center"
});

globalStyle(`${amountBox} > p`, {
    fontSize: "1.2rem",
    color: theme.gray
})

export const amountFontSet = style({
    color: "black"
})
