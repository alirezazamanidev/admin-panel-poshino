import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c517675.parspack.net",
        pathname: "/c517675/**", 
      },
    ],
  },
};

export default nextConfig;