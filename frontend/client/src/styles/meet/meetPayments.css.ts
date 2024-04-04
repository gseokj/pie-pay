import {globalStyle, style, styleVariants} from "@vanilla-extract/css";
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

export const legend = style({
    display: "flex",
    gap: "0.3rem"
})

export const legendLayout = style({
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem"
})

export const paymentsLayout = style({
    marginBottom: "5rem"
})


// ------------------ modal --------------------
export const dropDownHeader = style({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0.5rem 0"
});

globalStyle(`${dropDownHeader} > h3`, {
    fontSize: "1.1rem",
})

export const paymentModalMain = style({
    position: "relative",
    maxHeight: "18rem",
    overflowY: "auto",
});

export const marginBottomLine = style({
    marginBottom: "2rem"
})

export const paymentTable = styleVariants({
    table: [{
        width: "100%",
        overflow: "scroll",
        tableLayout: "auto",
    }],
    left: [{textAlign: "left"}],
    right: [{textAlign: "right"}],
    leftHeader: [{
        textAlign: "left",
        fontSize: "1rem",
        color: theme.blueGray,
        marginBottom: "0.4rem"
    }],
    rightHeader: [{
        textAlign: "right",
        fontSize: "1rem",
        color: theme.blueGray,
        marginBottom: "0.4rem"
    }],
});

export const tableColumns = style({
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem"
})

export const tableItems = style({
    marginBottom: "0.5rem"
})

export const scrollInner = style({
    maxHeight: "8rem",
    overflowY: "auto",
})
