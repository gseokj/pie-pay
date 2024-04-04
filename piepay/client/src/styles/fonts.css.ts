import {globalFontFace, globalStyle, style} from "@vanilla-extract/css";

const pretendardSemibold = 'Pretendard-Semibold';

globalFontFace(pretendardSemibold, {
    src: "url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-SemiBold.woff') format('woff')",
    fontWeight: 600,
    fontStyle: 'normal',
    fontDisplay: 'swap'
});

export const semibold = style({
    fontFamily: pretendardSemibold
});

const pretendardBold = 'Pretendard-Bold';

globalFontFace(pretendardBold, {
    src: "url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff')",
    fontWeight: 700,
    fontStyle: 'normal',
    fontDisplay: 'swap'
});

export const bold = style({
    fontFamily: pretendardBold
});

const pretendardMedium = 'Pretendard-Medium';

globalFontFace(pretendardMedium, {
    src: "url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Medium.woff') format('woff')",
    fontWeight: 500,
    fontStyle: 'normal',
    fontDisplay: 'swap'
});

export const medium = style({
    fontFamily: pretendardMedium
});

const pretendardRegular = 'Pretendard-Regular';

globalFontFace(pretendardRegular, {
    src: "url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff')",
    fontWeight: 400,
    fontStyle: 'normal',
    fontDisplay: 'swap'
});

export const reqular = style({
    fontFamily: pretendardRegular
});