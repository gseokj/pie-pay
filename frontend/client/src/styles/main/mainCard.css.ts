import {globalStyle, style, styleVariants} from "@vanilla-extract/css";
import theme from "@/styles/theme/theme";

const cardContainer = style({
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: "16px",
    marginBottom: "2.2%",
    padding: "4%",
    boxShadow: "0 8px 12px" + theme.shadow
});

export const cardLayout = styleVariants({
    default: [cardContainer],
    furtherPadding: [cardContainer, {
        padding: "8%",
        gap: "1rem"
    }],
});

const cardInner = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
});

globalStyle(`${cardInner} > h3`, {
    fontSize: "1.5rem",
    lineHeight: "1.8rem",
    marginBottom: "0.5rem"
});

globalStyle(`${cardInner} > p`, {
    color: theme.gray,
    fontSize: "1rem",
    lineHeight: "1.4rem"
});

export const cardInnerLayout = styleVariants({
    defaultHeader: [cardInner],
    inviteInner: [cardContainer, cardInner, {
        alignItems: "center",
        padding: "1rem",
        boxShadow: "none",
        backgroundColor: theme.skyblue
    }]
});

globalStyle(`${cardInnerLayout.inviteInner} > p`, {
    marginBottom: "0.8rem",
    color: "black",
    fontSize: "1.4rem",
    lineHeight: "1.4rem"
});

globalStyle(`${cardInnerLayout.inviteInner} > h1`, {
    fontSize: "2rem",
    lineHeight: "2rem"
});