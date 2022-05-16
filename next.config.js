module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["img.icons8.com"],
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: false,
      };
    }

    return config;
  },
};
