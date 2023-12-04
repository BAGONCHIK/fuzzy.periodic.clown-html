/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@use "styles/mixins.scss" as *;`,
  },
};

module.exports = nextConfig;
