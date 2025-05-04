/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/core"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cwmkyrrvtewmrirrudnt.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
