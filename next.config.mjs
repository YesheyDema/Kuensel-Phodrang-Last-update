/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    formats: ["image/webp", "image/avif"],
    qualities: [60, 70, 75],
  },
}

export default nextConfig
