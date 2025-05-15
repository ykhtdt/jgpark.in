/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/core"],
  serverExternalPackages: ["shiki"],
}

export default nextConfig
