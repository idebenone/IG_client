/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "avatars.githubusercontent.com",
            "cloudflare-ipfs.com",
            "localhost"
        ],
    },
}

module.exports = nextConfig
