import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental:{
    globalNotFound:true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c517675.parspack.net",
        pathname: "/c517675/**", 
      },
      
    ],
    unoptimized:true,
    minimumCacheTTL:60*60*24
  },
};

export default nextConfig;