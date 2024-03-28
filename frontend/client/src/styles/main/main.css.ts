import {globalStyle, style, styleVariants} from "@vanilla-extract/css";
import theme from "@/styles/theme/theme";

export const mainContainer = style({
    padding: "4% 6% 0 6%",
    '::-webkit-scrollbar': {
        width: '3px'
    },
    '::-webkit-scrollbar-thumb': {
        backgroundColor: '#D3D3D3'
    },
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: '100%',
    overflowY: 'auto',
})

globalStyle(`${mainContainer} > *:first-child`, {
    marginTop: "24%",
})

const categoryLayout = style({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    fontSize: "1rem",
    marginTop: "10%",
    marginBottom: "3%"
})

export const categoryContainer = styleVariants({
    default: [categoryLayout],
    smallMargin: [categoryLayout, {
        marginTop: "6.5%"
    }]
})

globalStyle(`${categoryContainer.default} > h3, ${categoryContainer.smallMargin} > h3`, {
    fontSize: "1.25rem"
});

globalStyle(`${categoryContainer.default} > h5, ${categoryContainer.smallMargin} > h5`, {
    color: theme.blueGray
});

globalStyle(`${categoryContainer.default} > button, ${categoryContainer.smallMargin} > button`, {
    textDecoration: "underline",
    textUnderlineOffset: "0.2rem",
    color: theme.blueGray
})

export const category = style({
    display: "flex",
    fontSize: "1.25rem"
})

globalStyle(`${category} > p`, {
    marginLeft: "0.4rem"
});

const imageContainer = style({
    display: "flex",
    flexWrap: "nowrap",
    width: "50%",
    gap: "0.5rem",
    marginRight: "1rem"
});

export const imageLayout = style({
    borderRadius: "12px"
});

const profileContainer = style({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
});

export const containers = styleVariants({
    imageContainer: [imageContainer],
    profileContainer: [profileContainer]
});

export const visibility = styleVariants({
    visible: [{
        visibility: "visible"
    }],
    invisible: [{
        visibility: "hidden"
    }]
});
