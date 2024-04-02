import {globalStyle, style} from "@vanilla-extract/css";
import theme from "@/styles/theme/theme";


// -------------------------- 리스트 타입 ------------------------------

export const listCardLayout = style({
    position: "relative",
    display: "inline-block",
    verticalAlign: "top",
    flexDirection: "column",
    marginBottom: "2.2%",
    padding: "4%",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 8px 12px" + theme.shadow,
    marginRight: "2.5%",
    width: "75%",
});

export const listIconHeader = style({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.4rem",
    marginBottom: "0.8rem"
});

export const listBody = style({
    height: "4rem",
    display: "flex",
    alignItems: "center",
    gap: "0.8rem"
});

export const listBodyOne = style({
    height: "4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    fontSize: "1.4rem"
});

export const listInfo = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
});

export const listInfoAdd = style({
    fontSize: "0.9rem"
})

globalStyle(`${listInfo} > p`, {
    fontSize: "1.2rem",
    lineHeight: "1.8rem"
});

globalStyle(`${listInfo} > h2`, {
    fontSize: "1.2rem",
    lineHeight: "1.2rem"
});