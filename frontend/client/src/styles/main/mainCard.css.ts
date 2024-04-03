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


export const highlightCardContainer = style({
    position: "absolute",
    width: "100%",
    left: 0,
    padding: "0 5%",
    paddingBottom: "5%",
    overflowX: "scroll",
    whiteSpace: "nowrap",
    '::-webkit-scrollbar': {
        display: "none"
    },
    '@media': {
        'screen and (min-width: 768px)': {
            '::-webkit-scrollbar': {
                display: 'block',
                height: '8px',
            },
            '::-webkit-scrollbar-thumb': {
                backgroundColor: '#D3D3D3'
            },
        },
    },
})

export const cardLayout = styleVariants({
    default: [cardContainer],
    defaultHorizontal: [cardContainer, {
        flexDirection: "row",
        justifyContent: "space-between"
    }],
    default80: [cardContainer, {
        display: "inline-block",
        marginRight: "2.5%",
        width: "75%",
    }],
    furtherPadding: [cardContainer, {
        marginBottom: "4%",
        padding: "10%",
        gap: "1.2rem"
    }],
    memberCard: [cardContainer, {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "2.5%",
        alignItems: "center",
    }]
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
    smallHeader: [cardInner, {
        marginLeft: "0.75rem"
    }],
    defaultHorizontal: [cardInnerHorizontal],
    iconHeader: [cardInnerHorizontal],
    paymentHorizontalInner: [cardInnerHorizontal],
    paymentVerticalInner: [cardInner, {
        marginTop: "0.8rem"
    }],
    paymentSpaceBetweenInner: [cardInnerHorizontal, {
        marginTop: "0.5rem",
        justifyContent: "space-between"
    }],
    inviteInner: [cardContainer, cardInner, inviteInnerLayout],
    inviteModalInner: [cardContainer, cardInner, inviteInnerLayout, {
        width: "100%"
    }],
    imageInputInner: [cardInner, imageInputInnerLayout],
    memberCardLeftInner: [cardInnerHorizontal, {
        gap: "0.8rem",
        fontSize: "1.1rem"
    }],
    memberCardRightInner: [cardInnerHorizontal, {
        marginRight: "2%",
        fontSize: "1.1rem"
    }]
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


// smallHeader Child style

globalStyle(`${cardInnerLayout.smallHeader} > h5`, {
    fontSize: "1rem"
});

globalStyle(`${cardInnerLayout.smallHeader} > p`, {
    color: theme.gray,
    fontSize: "0.8rem",
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

// paymentHorizontalInner Child style

globalStyle(`${cardInnerLayout.paymentHorizontalInner} > p`, {
    marginRight: "0.5rem",
    fontSize: "0.8rem",
    color: theme.gray
})

globalStyle(`${cardInnerLayout.paymentHorizontalInner} > h5`, {
    fontSize: "0.8rem",
})

// paymentVerticalInner Child style

globalStyle(`${cardInnerLayout.paymentVerticalInner} > h5`, {
    marginBottom: "0.1rem",
    fontSize: "0.9rem",
    color: theme.gray
})

globalStyle(`${cardInnerLayout.paymentVerticalInner} > h3`, {
    fontSize: "1.15rem"
})

globalStyle(`${cardInnerLayout.paymentSpaceBetweenInner} > h3`, {
    fontSize: "1.35rem"
})

globalStyle(`${cardInnerLayout.iconHeader} > h3`, {
    marginLeft: "0.5rem",
    fontSize: "1.25rem"
})

// font colors

export const completed = style({
    color: theme.completed
})

export const unpaid = style({
    color: theme.unpaid
})



//---------------------------payment-----------------------

export const paymentMemberLayout = style({
    position: "relative",
    display: "flex",
    marginBottom: "2.2%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
});

export const paymentTagLayout = style({
    display: "flex",
    gap: "0.2rem"
});

export const participantInfoLayout = style({
    display: "flex",
    gap: "0.4rem"
})