/** @type {import("next").NextConfig} */
const nextConfig = {
  // Keeps Turbopack sane when multiple lockfiles exist. Dev uses webpack by default
  // (`npm run dev`) because Turbopack can mis-resolve `@import "tailwindcss"` when the IDE
  // workspace root is the parent folder (`s-webteam/`).
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "vumbnail.com" },
      { protocol: "https", hostname: "i.vimeocdn.com" },
    ],
  },
};

module.exports = nextConfig;
