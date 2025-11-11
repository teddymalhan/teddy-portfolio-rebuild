/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: These should be enabled after fixing any existing errors
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
