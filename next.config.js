const removeImports = require("next-remove-imports");
const withRemoveImports = removeImports();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withRemoveImports(nextConfig);
