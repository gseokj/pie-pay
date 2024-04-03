import {globalStyle, style} from "@vanilla-extract/css";
import theme from "@/styles/theme/theme";

// -------------------------- 페이지 레이아웃 ----------------

export const rowTwoLayout = style({
    display: "flex",
    justifyContent: "space-between",
    gap: "2.2%"
})


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

// ------------------ 카드 타입 ----------------------

export const cardLayout = style({
    flexDirection: "column",
    marginBottom: "2.2%",
    padding: "4%",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 8px 12px" + theme.shadow,
    width: "100%",
});

export const oneLineInner = style({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

})

export const iconHeader = style({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.3rem",
    marginBottom: "0.7rem"
});

export const iconHeaderNoMargin = style({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.3rem",
})

export const oneLineBody = style({
    display: "flex",
    alignItems: "center",
    fontSize: "1.15rem"
});

// ------------ row two ----------------

export const spaceBetween = style({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: '80px'
})

export const alcoholBox = style({
    display: "flex",
    flexWrap: "wrap"
})

export const lastCard = style({
    marginBottom: '3rem'
})

export const leftBox = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%"
})

export const centerInner = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.8rem"
})

export const avgPayLayout = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: "2.2%",
    padding: "4%",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 8px 12px" + theme.shadow,
    width: "100%",
});

export const avgPayFont = style({
    fontSize: "1.2rem",
    textAlign: "end"
})