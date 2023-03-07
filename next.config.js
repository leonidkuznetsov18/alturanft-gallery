/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['nft-cdn.alchemy.com', 'res.cloudinary.com'],
  },
}
