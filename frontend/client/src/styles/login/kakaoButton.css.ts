import {fontFace, style} from "@vanilla-extract/css";
import theme from "@/styles/theme/theme";

export const kakaoButton = style({
    backgroundColor: theme.kakao,
    display: "flex",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "12px",
    padding: "8px",
    marginBottom: "40%"
})

export const kakaoTitle = style({
    fontSize: "1.2rem",
    marginLeft: "2%",
    fontWeight: 600
})