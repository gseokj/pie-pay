
const {
    createVanillaExtractPlugin
} = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();
const path = require('path');



/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    // SVG 사용 관련 모듈
    webpack: (config) => {
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            '@': path.resolve(__dirname, 'src/')
        };

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: { not: /components/ },
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: /components/,
                use: ['@svgr/webpack'],
            }
        );
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'k.kakaocdn.net',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 't1.kakaocdn.net',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'piepay.s3.ap-southeast-2.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};


module.exports = withVanillaExtract(nextConfig);

