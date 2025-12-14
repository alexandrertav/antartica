import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  transpilePackages: ['leaflet', 'react-leaflet'],
};

export default nextConfig;
