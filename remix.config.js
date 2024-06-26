// remix.config.js

const { config } = require("@netlify/remix-adapter");

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ...(process.env.NODE_ENV === "production" ? config : undefined),
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: 'raw-loader', // You can use any appropriate loader for HTML files here
    });
    return config;
  },
};
