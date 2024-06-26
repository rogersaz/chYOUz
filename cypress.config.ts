import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "dyxe34",

  e2e: {
    baseUrl: "http://localhost:3000",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
