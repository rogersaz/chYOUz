import { config } from "@netlify/remix-adapter";

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ...(process.env.NODE_ENV === "production" ? config : undefined),
  // This works out of the box with the Netlify adapter, but you can
  // add your own custom config here if you want to.
  //
  // See https://remix.run/file-conventions/remix-config
};
// remix.config.js

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: 'raw-loader', // You can use any appropriate loader for HTML files here
    });
    return config;
  },
};