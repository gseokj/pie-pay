import {globalStyle, style} from "@vanilla-extract/css";
import theme from "@/styles/theme/theme";

export const marginBottom = style({
    marginBottom: "5rem"
})

export const blackFont = style({
    color: "black",
    fontSize: "1.4rem"
})

export const blackLargeFont = style({
    color: "black",
    fontSize: "1.6rem"
});

export const profileContainer = style({
    width: "100%",
    whiteSpace: "nowrap",
    overflowX: "auto"
});

export const inlineBlock = style({
    display: "inline-block",
    marginLeft: "0.25rem"
});
export const divider = style({
    height: "100%",
    width: "2px",
    backgroundColor: theme.gray
});

export const totalDebtsItem = style({
    width: "49.5%",
    maxWidth: "49.5%",
    height: "100%"
});

globalStyle(`${totalDebtsItem} > p`, {
    fontSize: "0.9rem",
    color: theme.gray
});

globalStyle(`${totalDebtsItem} > h3`, {
    fontSize: "1.2rem",
    marginBottom: "0.6rem"
});

export const totalDebtsContainer = style({
    position: "relative",
    display: "flex",
    marginBottom: "4%",
    padding: "4%",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 8px 12px" + theme.shadow,
    flexDirection: "row"
});