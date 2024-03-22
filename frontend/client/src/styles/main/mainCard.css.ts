import {globalStyle, style, styleVariants} from "@vanilla-extract/css";
import theme from "@/styles/theme/theme";

const cardContainer = style({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    marginBottom: "2.2%",
    padding: "4%",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 8px 12px" + theme.shadow
});

export const cardLayout = styleVariants({
    default: [cardContainer],
    defaultHorizontal: [cardContainer, {
        flexDirection: "row",
        justifyContent: "space-between"
    }],
    furtherPadding: [cardContainer, {
        marginBottom: "4%",
        padding: "10%",
        gap: "1.2rem"
    }],
});

const cardInner = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
});

const cardInnerHorizontal = style({
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
})


// special Inners

const inviteInnerLayout = style({
    alignItems: "center",
    padding: "1rem",
    boxShadow: "none",
    backgroundColor: theme.skyblue
});

const imageInputInnerLayout = style({
    position: "absolute",
    top: "0",
    left: "0",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "48%",
    backgroundColor: theme.skyblue,
    borderRadius: "1rem 1rem 0 0"
});

export const cardInnerLayout = styleVariants({
    defaultHeader: [cardInner],
    marginTopHeader: [cardInner, {
        marginTop: "8rem"
    }],
    defaultHorizontal: [cardInnerHorizontal],
    inviteInner: [cardContainer, cardInner, inviteInnerLayout],
    imageInputInner: [cardInner, imageInputInnerLayout]
});


// defaultHeader Child style

globalStyle(`${cardInnerLayout.defaultHeader} > h3, ${cardInnerLayout.marginTopHeader} > h3`, {
    fontSize: "1.5rem",
    lineHeight: "1.8rem",
    marginBottom: "0.5rem"
});

globalStyle(`${cardInnerLayout.defaultHeader} > p, ${cardInnerLayout.marginTopHeader} > p`, {
    color: theme.gray,
    fontSize: "1rem",
    lineHeight: "1.4rem"
});


// inviteInner Child style

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