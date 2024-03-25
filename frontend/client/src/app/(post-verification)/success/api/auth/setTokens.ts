// pages/api/auth/setTokens.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default (req: NextApiRequest, res: NextApiResponse) => {
    // 쿼리 파라미터에서 토큰 추출
    const { accessToken, refreshToken } = req.query;

    if (typeof accessToken === 'string' && typeof refreshToken === 'string') {
        // 쿠키에 accessToken과 refreshToken 저장
        console.log(accessToken, refreshToken, "!!!!!!!!!!!1");
        res.setHeader('Set-Cookie', [
            cookie.serialize('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7, // 1주일
                path: '/',
            }),
            cookie.serialize('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 30, // 1달
                path: '/',
            }),
        ]);

        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ error: 'Invalid tokens' });
    }
};
