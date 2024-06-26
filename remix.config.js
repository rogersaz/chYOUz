// remix.config.js

import { config as netlifyConfig } from "@netlify/remix-adapter";

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ...(process.env.NODE_ENV === "production" ? netlifyConfig : undefined),
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: 'raw-loader', // You can use any appropriate loader for HTML files here
    });
    return config;
  },
};
