/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp', 'image/jpeg', 'image/png', "image/jpg"],
    domains: ['nft-cdn.alchemy.com', 'res.cloudinary.com'],
  },
}
