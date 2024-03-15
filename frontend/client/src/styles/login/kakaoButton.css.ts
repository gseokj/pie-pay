import {style} from "@vanilla-extract/css";
import theme from "@/styles/theme/theme";

export const kakaoButton = style({
    backgroundColor: theme.kakao,
    display: "flex",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "12px",
    padding: "8px"
})

export const kakaoTitle = style({
    fontSize: "1rem",
    marginLeft: "2%"
})