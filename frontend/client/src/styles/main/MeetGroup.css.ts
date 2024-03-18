import {style} from "@vanilla-extract/css";
import theme from "@/styles/theme/theme";

export const meetContainer = style({
    backgroundColor: "white",
    borderRadius: "16px",
    marginBottom: "2%",
    padding: "5% 4%",
    boxShadow: "0 8px 12px" + theme.shadow
})

export const lineOne = style({
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2rem"
})

export const lineTwo = style({
    display: "flex",
    justifyContent: "space-between"
})

export const meetInfo = style({
    display: "flex"
})

export const meetInfoString = style({
    whiteSpace: "nowrap",
    wordBreak: "break-all",
    marginLeft: "0.8rem"
})

export const meetName = style({
    textOverflow: "ellipsis"
})

export const meetImageContainer = style({
    display: "flex",
    alignItems: "center"
})

export const meetImage = style({
    borderRadius: "12px",
})

export const meetMemberImage = style({
    borderRadius: "50%",
    marginRight: "0.25rem"
})

export const profileImageContainer = style({
    display: "flex",
    alignItems: "center"
})

export const paymentButton = style({
    padding: "2.5% 6%",
    borderRadius: "24px",
    backgroundColor: theme.skyblue,
    color: theme.blue,
    fontWeight: "600",
    fontSize: "0.8rem"
})
